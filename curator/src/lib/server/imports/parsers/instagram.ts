import SparkMD5 from 'spark-md5';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { Resource } from '$lib/types';
import PocketBase from 'pocketbase';

import { uploadFileToPocketbase } from '$lib/server/pocketbase';
import { tryCatch } from '$lib/utils';
import { createThumbnail, makeResourceFromFile, mergeResources } from '$lib/server/utils';
import { notesCollection } from '$lib/server/const';
import * as cheerio from 'cheerio';
import { instatonote_URL } from '$lib/server/const';

dayjs.extend(customParseFormat);

export class InstagramImport {
	title: string;
	content: string;
	parsedHTML: cheerio.CheerioAPI;
	source: string | null;
	sourceURL: string | null;
	recordID: string;
	added: string;
	description: string | null;
	selectedNotebookdID: string;
	selectedTagIdArrays: string[];
	resources: Resource[];
	bodyResources: Resource[]; // this is for thumbnail generation
	pb: PocketBase;

	constructor(
		pb: PocketBase,
		url: string,
		selectedNotebookID: string,
		selectedTagIdArrays: string[]
	) {
		this.content = '';
		this.parsedHTML = this.parseHTML(this.content);
		this.title = '';
		this.description = '';
		this.source = 'instagram';
		this.sourceURL = url;
		this.added = new Date().toISOString();
		this.recordID = '';
		this.selectedNotebookdID = selectedNotebookID;
		this.selectedTagIdArrays = selectedTagIdArrays;
		this.resources = [];
		this.bodyResources = [];
		this.pb = pb;
	}

	parseHTML(fileContent: string) {
		return cheerio.load(fileContent);
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
		const bodyContent = this.parsedHTML('body')?.toString() || '';

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
			const fileURL = await uploadFileToPocketbase(this.pb, this.recordID, resourceFile);

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

	async downloadInstagramPost() {
		const response = await fetch(`${instatonote_URL}/render`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ url: this.sourceURL })
		});

		if (!response.ok) throw new Error(await response.text());
		const data = await response.json();
		return data;
	}

	async uploadToDB() {
		const instaData = await this.downloadInstagramPost();
		this.title = instaData.title;
		this.sourceURL = instaData.url;
		this.description = instaData.caption;
		this.content = instaData.html;
		this.parsedHTML = this.parseHTML(this.content);

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
			user: this.pb.authStore.record?.id
		};

		const { data: record, error } = await tryCatch(
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

		await this.replaceResources(this.content);
		this.stripCSP();
		const thumbResource = await createThumbnail(this.pb, this.recordID, this.bodyResources);
		const mergedResource = mergeResources(this.resources, thumbResource) || this.resources;

		const data = {
			content: this.content,
			original_content: this.content,
			resources: mergedResource
		};

		const { data: updatedRecord, error: updatedError } = await tryCatch(
			this.pb.collection(notesCollection).update(this.recordID, data)
		);

		if (updatedError) {
			console.error('Error updating record: ', updatedError.message, updatedError.data);
		}
	}
}
