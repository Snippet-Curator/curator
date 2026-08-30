import SparkMD5 from 'spark-md5';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PocketBase from 'pocketbase';

import type { EnNote, EnMedia, EnResource, Resource, PError, ImportRecord } from '$lib/types';
import { uploadFileToPocketbase } from '$lib/server/pocketbase';
import { tryCatch } from '$lib/utils';
import type { RecordModel } from 'pocketbase';
import {
	addMediaToContent,
	createDescription,
	createThumbnail,
	getMimeFromName,
	mergeResources,
	parser
} from '$lib/server/utils';
import { notesCollection } from '$lib/server/const';

dayjs.extend(customParseFormat);

export class ENEXImport {
	enNote: EnNote;
	enMedias: EnMedia[] | null;
	enResources: EnResource[] | null;

	title: string;
	content: string;
	added: string;
	updated: string;
	source: string;
	sourceURL: string;
	tags: string[] | null;
	recordID: string;
	description: string | null;
	selectedNotebookdID: string;
	selectedTagsID: string[];
	pb: PocketBase;

	constructor(
		pb: PocketBase,
		fileContent: string,
		selectedNotebookID: string,
		selectedTagIdArrays: string[]
	) {
		this.pb = pb;
		this.recordID = '';
		this.selectedNotebookdID = selectedNotebookID;
		this.selectedTagsID = selectedTagIdArrays;

		const { xmlNote, xmlMedia, xmlContent } = this.parseEnex(fileContent);

		this.enNote = xmlNote;
		this.content = xmlContent;
		this.enMedias = this.getEnMedias(xmlMedia);
		this.tags = this.getTags();

		this.enResources = this.getEnResources();
		this.title = this.enNote['en-export'].note.title;
		this.added = this.getAdded();
		this.updated = this.enNote['en-export'].note.updated;
		this.source = this.getSource();
		this.sourceURL = this.getSourceURL();
		this.description = createDescription(this.content);
	}

	parseEnex(fileContent: string) {
		const xmlNote: EnNote = parser.parse(fileContent);
		const xmlMedia: EnMedia = parser.parse(xmlNote['en-export']['note']['content'])['en-note'][
			'en-media'
		];
		const xmlContent = xmlNote['en-export']['note']['content'].match(
			/<en-note[\s\S]*<\/en-note>/
		)?.[0] as string;

		return {
			xmlNote,
			xmlMedia,
			xmlContent
		};
	}

	getEnMedias(xmlMedia: EnMedia | EnMedia[]) {
		if (!xmlMedia) return null;
		return Array.isArray(xmlMedia) ? xmlMedia : [xmlMedia];
	}

	getTags() {
		const tags = this.enNote['en-export'].note.tag;
		if (!tags) return null;
		return Array.isArray(tags) ? tags : [tags];
	}

	getEnResources() {
		const resources = this.enNote['en-export']['note']['resource'];
		if (!resources) return null;
		return Array.isArray(resources) ? resources : [resources];
	}

	getSource() {
		return this.enNote['en-export'].note['note-attributes'].source;
	}

	getSourceURL() {
		return this.enNote['en-export'].note['note-attributes']['source-url'];
	}

	getAdded() {
		const addedDate = this.enNote['en-export'].note.created;
		if (!addedDate) {
			return new Date().toISOString();
		}
		return dayjs(addedDate, 'YYYYMMDDTHHmmss[Z]').toISOString();
	}

	convertResourceToFile(resource: EnResource) {
		let binaryStr: string = '';
		let byteArray: Uint8Array<ArrayBuffer>;

		try {
			binaryStr = atob(resource.data['#text']);
			byteArray = new Uint8Array(binaryStr.length);
		} catch (err) {
			console.error('Error converting resource file');
			return;
		}

		for (let i = 0; i < binaryStr.length; i++) {
			byteArray[i] = binaryStr.charCodeAt(i);
		}

		const originalMime = resource.mime;
		const fileName = resource['resource-attributes']['file-name'] || 'unknown';
		const correctedMime = getMimeFromName(fileName, originalMime);

		const blob = new Blob([byteArray], { type: correctedMime });

		return new File([blob], fileName, { type: correctedMime });
	}

	async uploadResources() {
		// let files: File[] = []
		if (!this.enResources || this.enResources.length === 0) return;
		for (const resource of this.enResources) {
			if (!resource) continue;

			// converts to binary and adds hash
			const binaryStr = atob(resource.data['#text']);
			resource.hash = SparkMD5.hashBinary(binaryStr);

			// adds to file
			resource.file = this.convertResourceToFile(resource);

			if (!resource.file) return;

			resource.name = resource.file.name;
			resource.mime = resource.file.type;
			resource.fileURL = await uploadFileToPocketbase(this.pb, this.recordID, resource.file);
		}
	}

	replaceEnMedia() {
		// replaces en-media with regular html tags within content
		const mediaMatch = /<en-media[^>]+?hash="([a-zA-Z0-9]+)"[^>]*\/?>/g;

		if (!this.enResources || this.enResources.length === 0) return;

		const enResources = this.enResources;

		const replaceMedia = (match: string, hash: string) => {
			const resource = enResources.filter((resource) => {
				return resource.hash == hash;
			});

			if (!resource || resource.length === 0) return '';

			if (!resource[0].fileURL) return;

			const fileName = resource[0]['resource-attributes']['file-name'] || 'untitled';
			const originalMime = resource[0].mime;
			const correctedMime = getMimeFromName(fileName, originalMime);

			return addMediaToContent(correctedMime, resource[0].fileURL, fileName);
		};

		this.content = this.content.replace(mediaMatch, replaceMedia);
	}

	async addTags(pb: PocketBase) {
		if (!this.tags) return [''];
		if (this.tags.length == 1 && this.tags[0] == '') return [''];

		const tagList: string[] = [];

		const { data: existingTags, error } = await tryCatch<RecordModel[], PError>(
			this.pb.collection('tags').getFullList()
		);

		if (error) {
			console.error('Unable to get all tags: ', error.message);
			return [''];
		}

		if (!existingTags) return [''];

		const existingTagNames = new Set(existingTags.map((tag: { name: string }) => tag.name));

		for (const tag of this.tags) {
			if (existingTagNames.has(tag.toLowerCase())) {
				const record = existingTags.find(
					(record: { name: string }) => record.name === tag.toLowerCase()
				);
				tagList.push(record.id);
			} else {
				const { data: newTag, error: newTagError } = await tryCatch<RecordModel[], PError>(
					this.pb.collection('tags').create({ name: tag.toLowerCase() })
				);

				if (newTagError) {
					console.error('Unable to make new tags: ', newTagError.message, tag);
					return [''];
				}

				if (!newTag) return [''];

				tagList.push(newTag.id);
			}
		}
		return tagList;
	}

	makeResourceFromFiles(enResources: EnResource[] | null) {
		if (!enResources) return;
		if (enResources.length === 0) return;
		let resources: Resource[] = [];
		for (const enResource of enResources) {
			const resource: Resource = {
				name: enResource.name,
				size: enResource.file?.size,
				hash: enResource.hash,
				type: enResource.mime,
				fileURL: enResource.fileURL,
				lastUpdated: new Date().toISOString(),
				sourceURL: enResource['resource-attributes']['source-url'],
				width: enResource.width,
				height: enResource.height,
				latitude: enResource['resource-attributes'].latitude,
				longitude: enResource['resource-attributes'].longitude,
				timestamp: enResource['resource-attributes'].timestamp,
				cameraMake: enResource['resource-attributes']['camera-make']
			};
			resources.push(resource);
		}
		return resources;
	}

	async uploadToDB() {
		const oldTags = await this.addTags(pb);
		const newTags = this.selectedTagsID || [];
		const tags = [...oldTags, ...newTags];
		const sources = [
			{
				source: this.source,
				source_url: this.sourceURL
			}
		];
		const skeletonData = {
			title: this.title,
			added: this.added,
			tags: tags,
			weight: 5,
			notebook: this.selectedNotebookdID,
			last_score_updated: new Date().toISOString(),
			sources: JSON.stringify(sources),
			status: 'active',
			user: pb.authStore.record?.id
		};

		const { data: record, error } = await tryCatch<RecordModel, PError>(
			this.pb.collection(notesCollection).create(skeletonData)
		);

		if (error) {
			if (error.data.data.title.code == 'validation_not_unique') {
				throw new Error('Skipped duplicate note');
			}
			console.log('Error uploading file: ', error.message, error.data);
			throw error;
		}

		this.recordID = record.id;

		await this.uploadResources();
		this.replaceEnMedia();
		const resources = this.makeResourceFromFiles(this.enResources);
		const thumbResource = await createThumbnail(getPB(), this.recordID, resources);
		const mergedResource = mergeResources(resources, thumbResource) || resources;

		const data = {
			content: this.content,
			original_content: this.content,
			description: this.description,
			resources: mergedResource
		};

		const { data: updatedRecord, error: updatedError } = await tryCatch(
			this.pb.collection(notesCollection).update(this.recordID, data)
		);

		if (updatedError) {
			console.error('Error updating record: ', updatedError.message, error.data);
		}
	}
}
