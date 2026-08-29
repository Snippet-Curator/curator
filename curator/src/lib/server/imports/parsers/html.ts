import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { Resource } from '$lib/types';
import { getPB } from '$lib/server/pocketbase';
import PocketBase from 'pocketbase';

import { uploadFileToPocketbase } from '$lib/server/pocketbase';
import { tryCatch } from '$lib/utils';
import {
	createDescription,
	createThumbnail,
	makeResourceFromFile,
	mergeResources
} from '$lib/server/utils';
import { notesCollection } from '$lib/server/const';

dayjs.extend(customParseFormat);

export class htmlImport {
	title: string | 'Untitled';
	content: string;
	parsedHTML: Document;
	source: string | null;
	sourceURL: string | null;
	recordID: string;
	added: string;
	description: string | null;
	selectedNotebookdID: string;
	selectedTagIdArrays: string[];
	HTMLparser: DOMParser;
	resources: Resource[];
	bodyResources: Resource[]; // this is for thumbnail generation

	constructor(fileContent: string, selectedNotebookID: string, selectedTagIdArrays: string[]) {
		this.HTMLparser = new DOMParser();
		this.content = fileContent;
		this.parsedHTML = this.parseHTML(fileContent);
		this.title = this.getTitle();
		this.description = this.getDescription();
		this.source = this.getSource();
		this.sourceURL = this.getSourceURL();
		this.added = this.getAdded();
		this.recordID = '';
		this.selectedNotebookdID = selectedNotebookID;
		this.selectedTagIdArrays = selectedTagIdArrays;
		this.resources = [];
		this.bodyResources = [];
	}

	parseHTML(fileContent: string) {
		return this.HTMLparser.parseFromString(fileContent, 'text/html');
	}

	getTitle() {
		return this.parsedHTML.querySelector('title')?.textContent || 'Untitled';
	}

	getDescription() {
		// parse instagram saves with source meta property
		const description = this.parsedHTML.querySelector('meta[property="description"]');

		if (description) {
			return description.getAttribute('content');
		}

		const ogDescription = this.parsedHTML
			.querySelector('meta[property="og:description"]')
			?.getAttribute('content');

		if (!ogDescription) return null;

		return createDescription(ogDescription);
	}

	getSource() {
		// parse instagram saves with source meta property
		const source = this.parsedHTML.querySelector('meta[property="source"]');

		if (source) {
			return source.getAttribute('content');
		}

		// if not, use regex to match singleFile source
		const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

		if (match) {
			return 'SingleFile Save';
		}

		return null;
	}

	getSourceURL() {
		const sourceURL = this.parsedHTML.querySelector('meta[property="source-url"]');

		if (sourceURL) {
			return sourceURL.getAttribute('content');
		}

		const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

		if (!match || !match[1]) {
			return null;
		}

		return match[1];
	}

	getAdded() {
		const added = this.parsedHTML.querySelector('meta[property="added"]');

		if (added && added.textContent) {
			return added.getAttribute('content') || new Date().toISOString();
		}

		const match = this.content.match(/url:\s*(.+?)\s+saved date:\s*(.+?)\s*-->/s);

		if (match) {
			return new Date(match[2]).toISOString();
		}

		return new Date().toISOString();
	}

	base64ToFile(base64: string, mimeType: string) {
		let extension: string = '';
		let filename: string = '';
		let byteCharacters: string = '';
		let hash: string = '';

		try {
			extension = mimeType.split('/')[1];
			filename = `${uuidv4()}.${extension}`;
			byteCharacters = atob(base64);
			hash = SparkMD5.hashBinary(byteCharacters);
		} catch (err) {
			console.error('Error converting resource: ', err);
		}

		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);

		return {
			file: new File([byteArray], filename, { type: mimeType }),
			hash: hash
		};
	}

	async replaceResources(fileContent: string) {
		if (!fileContent) return;
		const bodyContent = this.parsedHTML.querySelector('body')?.outerHTML || '';

		// replaces src with image and font with db file links.
		const mediaMatch = /\b(data:(?:image|font|video)\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+)\1?/g;

		const matches = [...fileContent.matchAll(mediaMatch)].map((m) => m[1]);
		const bodyMatchSet = new Set([...bodyContent?.matchAll(mediaMatch)].map((m) => m[1]));

		let updatedContent = fileContent;
		for (const match of matches) {
			const mimeType = match.split(';')[0].split(':')[1] || undefined;
			const base64Data = match.split(',')[1];

			if (!base64Data || !mimeType) {
				console.error('Error: invalid data URL format');
				continue;
			}

			const { file: resourceFile, hash } = this.base64ToFile(base64Data, mimeType);

			if (!resourceFile) {
				console.error('Error converting resource file');
				continue;
			}

			// upload to database
			const fileURL = await uploadFileToPocketbase(getPB(), this.recordID, resourceFile);

			// add to list of resources
			const resource = makeResourceFromFile(resourceFile, hash, fileURL);
			this.resources.push(resource);

			// replace media with new URL
			if (fileURL) {
				updatedContent = updatedContent.replace(match, fileURL);
			}

			// add matches to bodyMatches
			if (bodyMatchSet.has(match)) {
				this.bodyResources.push(resource);
			}
		}

		this.content = updatedContent;
	}

	stripCSP() {
		const matchPattern = /<meta http-equiv=["]?Content-Security-Policy["]?[^>]*>/gi;
		this.content = this.content.replace(matchPattern, '');
	}

	async uploadToDB(pb: PocketBase) {
		const sources = [
			{
				source: this.source,
				source_url: this.sourceURL
			}
		];

		const skeletonData = {
			title: this.title,
			added: this.added,
			description: this.description,
			weight: 5,
			notebook: this.selectedNotebookdID,
			tags: this.selectedTagIdArrays,
			last_score_updated: new Date().toISOString(),
			sources: JSON.stringify(sources),
			status: 'active',
			user: pb.authStore.record?.id
		};

		const { data: record, error } = await tryCatch(
			pb.collection(notesCollection).create(skeletonData)
		);

		if (error) {
			if (error.data.data.title.code == 'validation_not_unique') {
				throw new Error('Skipped duplicate note');
			}
			throw error;
		}

		if (!record) return;

		this.recordID = record.id;

		await this.replaceResources(this.content);
		this.stripCSP();
		const thumbResource = await createThumbnail(getPB(), this.recordID, this.bodyResources);
		const mergedResource = mergeResources(this.resources, thumbResource) || this.resources;

		const data = {
			content: this.content,
			original_content: this.content,
			resources: mergedResource
		};

		const { data: updatedRecord, error: updatedError } = await tryCatch(
			pb.collection(notesCollection).update(this.recordID, data)
		);

		if (updatedError) {
			console.error('Error updating record: ', updatedError.message, updatedError.data);
		}
	}
}
