import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { PError } from '$lib/types';
import { uploadFileToPocketbase } from '$lib/server/pocketbase';
import PocketBase from 'pocketbase';

import { tryCatch } from '$lib/utils';
import type { RecordModel } from 'pocketbase';
import {
	addMediaToContent,
	createThumbnail,
	getFileHash,
	makeResourceFromFile,
	mergeResources
} from '$lib/server/utils';
import { notesCollection } from '$lib/server/const';

dayjs.extend(customParseFormat);

export class FileImport {
	title: string;
	file: File;
	mimeType: string;
	content: string;
	added: string;
	fileURL: string;
	recordID: string;
	selectedNotebookdID: string;
	selectedTagIdArrays: string[];
	pb: PocketBase;

	constructor(
		pb: PocketBase,
		file: File,
		selectedNotebookID: string,
		selectedTagIdArrays: string[]
	) {
		this.pb = pb;
		this.file = file;
		this.mimeType = file.type;
		this.recordID = '';
		this.fileURL = '';
		this.content = '';
		this.title = `${file.name} ${dayjs(Date()).format('MM-DD-YYYY')}`;
		this.selectedNotebookdID = selectedNotebookID;
		this.selectedTagIdArrays = selectedTagIdArrays;
		this.added = new Date().toISOString();
	}

	getSkeletonData() {
		const sources = [
			{
				source: 'Desktop',
				source_url: ''
			}
		];

		return {
			title: this.title,
			notebook: this.selectedNotebookdID,
			tags: this.selectedTagIdArrays,
			last_score_updated: new Date().toISOString(),
			weight: 5,
			added: this.added,
			status: 'active',
			sources: sources,
			user: this.pb.authStore.record?.id
		};
	}

	async uploadToDB() {
		const skeletonData = this.getSkeletonData();

		const { data: record, error } = await tryCatch<RecordModel, PError>(
			this.pb.collection(notesCollection).create(skeletonData)
		);

		if (error) {
			if (error.data.data.title.code == 'validation_not_unique') {
				throw new Error('Skipped duplicate note');
			}
			throw error;
		}

		if (!record) return;
		this.recordID = record.id;

		this.fileURL = await uploadFileToPocketbase(this.pb, this.recordID, this.file);
		this.content = addMediaToContent(this.mimeType, this.fileURL, this.file.name);
		const hash = await getFileHash(this.file);
		const resources = [makeResourceFromFile(this.file, hash, this.fileURL)];
		const thumbResource = await createThumbnail(this.pb, this.recordID, resources);
		const mergedResource = mergeResources(resources, thumbResource) || resources;

		const data = {
			content: this.content,
			original_content: this.content,
			resources: mergedResource
		};

		const { data: updatedRecord, error: updatedError } = await tryCatch(
			this.pb.collection(notesCollection).update(this.recordID, data)
		);

		if (updatedError) {
			console.error('Error updating record: ', updatedError.message);
		}
	}
}
