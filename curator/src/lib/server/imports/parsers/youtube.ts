import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import PocketBase from 'pocketbase';

import type { RecordModel } from 'pocketbase';
import type { Resource, PError } from '$lib/types';

import { tryCatch } from '$lib/utils';
import { getPB } from '$lib/server/pocketbase';
import {
	addAsOnlyFileToRecord,
	addThumbnailToRecord,
	createDescription,
	getFileHash,
	makeResourceFromFile,
	parseYouTubeDuration
} from '$lib/server/utils';
import { notesCollection } from '$lib/server/const';

dayjs.extend(customParseFormat);

export class youtubeImport {
	title: string | 'Untitled';
	channelTitle: string;
	channelID: string;
	source: string | null;
	recordID: string;
	description: string | null;
	content: string;
	resources: Resource[];
	youtubeFullURL: string;
	youtubeThumbURL: string;
	thumbURL: string;
	youtubeID: string | undefined;
	youtubeAPI: string;
	selectedNotebookID: string;
	selectedTagIdArrays: string[];
	viewCount: string;
	publishedDate: string;
	duration: string;

	constructor(
		youtubeFullURL: string,
		selectedNotebookID: string,
		selectedTagIdArrays: string[],
		youtubeAPI: string
	) {
		this.youtubeFullURL = youtubeFullURL;
		this.youtubeID = this.getYoutubeID(youtubeFullURL);
		this.selectedNotebookID = selectedNotebookID;
		this.selectedTagIdArrays = selectedTagIdArrays;
		this.youtubeAPI = youtubeAPI;
		this.youtubeThumbURL = '';
		this.thumbURL = '';
		this.title = '';
		this.channelTitle = '';
		this.description = '';
		this.content = '';
		this.source = 'Youtube';
		this.recordID = '';
		this.resources = [];
		this.channelID = '';
		this.viewCount = '';
		this.publishedDate = '';
		this.duration = '';
	}

	getYoutubeID(url: string) {
		if (!url) return;

		const patterns = [
			/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
			/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?&]+)/,
			/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^?&]+)/,
			/^(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?&]+)/
		];

		for (const pattern of patterns) {
			const match = url.match(pattern);
			if (match?.[1]) return match[1];
		}

		this.youtubeFullURL = `https://www.youtube.com/watch?v=${url}`;
		return url;
	}

	async fetchYoutubeMetadata(videoID: string, apiKey: string) {
		const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoID}&key=${apiKey}`;

		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Fetch Youtube error: ${response.status}`);
		}

		const data = await response.json();
		const video = data.items?.[0];

		if (!video) {
			await pb.collection(notesCollection).delete(this.recordID);
			throw new Error('Video not found');
		}

		this.title = video.snippet.title;
		this.content = video.snippet.description;
		this.description = createDescription(this.content);
		this.youtubeThumbURL =
			video.snippet.thumbnails.standard?.url ??
			video.snippet.thumbnails.high?.url ??
			video.snippet.thumbnails.medium?.url ??
			video.snippet.thumbnails.default?.url;
		this.channelTitle = video.snippet.channelTitle;
		this.channelID = `https://www.youtube.com/${video.snippet.channelID}`;
		this.viewCount = video.statistics.viewCount;
		this.publishedDate = video.snippet.publishedAt ?? '';
		this.duration = video.contentDetails.duration ?? '';
	}

	async addThumbnailandResource(youtubeThumbURL: string) {
		if (!youtubeThumbURL) {
			console.log('No youtube thumb');
			return;
		}
		// download from youtube
		const response = await fetch(youtubeThumbURL);
		if (!response.ok) {
			console.error(`Error fetching Youtube thumbnail: ${response.status}`);
			return;
		}
		const blob = await response.blob();
		const thumbFile = new File([blob], 'youtube-thumbnail.jpg', { type: blob.type });

		// upload file to db
		this.thumbURL = await addAsOnlyFileToRecord(getPB(), this.recordID, thumbFile);

		// add thumbnail to record
		await addThumbnailToRecord(getPB(), this.recordID, this.thumbURL);

		// get hash
		const hash = await getFileHash(thumbFile);

		// get and add resource
		const resource = makeResourceFromFile(thumbFile, hash, this.thumbURL);
		this.resources = [resource];
	}

	makeHTML() {
		return `
        <style>
            body {
            font-family: "Concourse4", "Segoe UI", sans-serif;
            font-size: 16px
            }
        </style>
        <body>
        <div style="font-family: var(--font-sans)">
    <h2 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.2rem">${this.title}</h2>
    <div style="margin-bottom: 1rem">
    <img style="width: 100%; height: auto" src=${this.thumbURL} alt="thumbnail" />
    </div>
    
    <div style="font-weight: 600">By <a href=${this.channelID}>${this.channelTitle}</a>
        <div style="font-size: 0.8rem">
            ${this.publishedDate}<br />
            ${this.duration}<br />
            ${this.viewCount} views
        </div>
    </div>

    <div style="padding: 1.6rem">
        ${this.content?.replace(/\n/g, '<br/>') ?? ''}
    </div>
    <div style="margin-bottom: 1rem">
        <iframe
            style="width: 100%;aspect-ratio: 16/9"
            src="https://www.youtube-nocookie.com/embed/${this.youtubeID}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    </div>
    </div>
    </body> 
`;
	}

	async uploadToDB(pb: PocketBase) {
		const skeletonData = {
			title: this.title,
			notebook: this.selectedNotebookID,
			tags: this.selectedTagIdArrays,
			last_score_updated: new Date().toISOString(),
			weight: 5,
			added: new Date().toISOString(),
			status: 'active',
			user: pb.authStore.record?.id
		};

		const filter = `sources.0.source = "Youtube" && sources.0.source_url ~ "${this.youtubeID}"`;

		const { data: record, error } = await tryCatch<RecordModel, PError>(
			pb.collection(notesCollection).getFirstListItem(filter)
		);

		if (error || !record) {
			const newRecord = await pb.collection(notesCollection).create(skeletonData);
			this.recordID = newRecord.id;
		} else {
			this.recordID = record.id;
		}

		await this.fetchYoutubeMetadata(this.youtubeID, this.youtubeAPI);
		this.publishedDate = dayjs(this.publishedDate).format('MM/DD/YYYY') ?? '';
		this.duration = parseYouTubeDuration(this.duration) ?? '';
		this.viewCount = Number(this.viewCount).toLocaleString('en-US');

		// add thumbnail and resource
		await this.addThumbnailandResource(this.youtubeThumbURL);

		// make html
		this.content = this.makeHTML();

		const sources = [
			{
				source: this.source,
				source_url: this.youtubeFullURL
			}
		];

		const data = {
			title: this.title,
			sources: sources,
			description: this.description,
			content: this.content,
			original_content: this.content,
			resources: this.resources
		};

		const { data: updatedRecord, error: updatedError } = await tryCatch(
			pb.collection(notesCollection).update(this.recordID, data)
		);

		if (updatedError) {
			console.error('Error updating record: ', updatedError.message);
		}
	}
}
