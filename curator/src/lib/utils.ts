import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import SparkMD5 from 'spark-md5';
import type { Resource } from './types';
import { pb } from '$lib/pocketbase';
import { notesCollection, baseURL, pbURL } from './const';
// import sanitizeHTML from 'sanitize-html';
import { XMLParser } from 'fast-xml-parser';
import { type Note, type PError } from './types';
import type { RecordModel } from 'pocketbase';
import { type NoteQuery } from '$lib/types';
import { goto } from '$app/navigation';

// ─────────────────────────────
//          Tailwind
// ─────────────────────────────

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// ─────────────────────────────
//          Pocketbase
// ─────────────────────────────

/**
 * Replaces local url with remote url if different
 */
export function replacePbUrl(content: string) {
	if (!content) return '';
	if (pbURL == 'http://127.0.0.1:8090') return content;
	return content.replace(/http:\/\/127\.0\.0\.1:8090/g, pbURL);
}

/**
 * Uploads file to pocketbase and returns URL
 */
export async function uploadFileToPocketbase(recordID: string, file: File) {
	// upload to database
	console.log('file', file);
	const { data: record, error } = await tryCatch(
		pb.collection(notesCollection).update(recordID, {
			'attachments+': [file]
		})
	);

	if (error) {
		console.error('Error uploading file: ', error.message, error.data);
		return '';
	}

	return `${baseURL}\/${notesCollection}\/${recordID}\/${record.attachments.at(-1)}`;
}

// ─────────────────────────────
//          Parsers
// ─────────────────────────────

export const parser = new XMLParser({
	ignoreAttributes: false,
	attributeNamePrefix: ''
});

// ─────────────────────────────
//          File Operations
// ─────────────────────────────

export async function getFileHash(file: File) {
	const arrayBuffer = await file.arrayBuffer();
	const hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
	return hash;
}

/**
 * downloads attachment from pocketbase and returns in file format
 */
export async function downloadAttachmentByURL(fileURL: string, fileName: string, fileType: string) {
	const response = await fetch(fileURL);
	const blob = await response.blob();
	return new File([blob], fileName, { type: fileType });
}

/**
 * Returns mimetype based on guess from filename
 */
export function getMimeFromName(fileName: string, originalMime: string) {
	const MIME_LOOKUP: Record<string, string> = {
		mp4: 'video/mp4',
		webm: 'video/webm',
		mov: 'video/quicktime',
		avi: 'video/x-msvideo',
		mkv: 'video/x-matroska',
		'3gp': 'video/3gpp',
		ogg: 'video/ogg'
	};

	let correctedMime = originalMime;
	if (originalMime === 'application/octet-stream') {
		const ext = fileName.split('.').pop()?.toLowerCase();
		if (ext && MIME_LOOKUP[ext]) {
			correctedMime = MIME_LOOKUP[ext];
		}
	}

	return correctedMime;
}

// ─────────────────────────────
//          Thumbnail
// ─────────────────────────────

/**
 * Generates thumbnail for video file
 */
export async function getVideoThumb(videoUrl: string): Promise<File> {
	return new Promise((resolve, reject) => {
		if (!videoUrl || videoUrl.trim() == '') {
			return reject(new Error('Video URL is empty'));
		}

		const video = document.createElement('video');

		// setting up properties
		video.src = videoUrl;
		video.crossOrigin = 'anonymous'; // Prevent CORS issues
		video.muted = true;
		video.playsInline = true;
		video.preload = 'metadata';

		// add error handling
		video.onerror = (e) => {
			reject(new Error(`Video loading error: ${video.error?.message} || 'Unknown error'`));
		};

		// make sure metadata loaded before seeking
		video.onloadedmetadata = () => {
			// now seek
			video.onloadeddata = () => {
				video.currentTime = 1; // Capture at 1 second
			};
		};

		video.onseeked = async () => {
			// small delay
			await new Promise((res) => setTimeout(res, 200));

			const canvas = document.createElement('canvas');
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;

			// draw the current video frame to the canvas
			const ctx = canvas.getContext('2d');

			if (!ctx) {
				reject(new Error('Could not get canvas context'));
				return;
			}

			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

			// Convert canvas to Blob and create a File
			canvas.toBlob((blob) => {
				if (blob) {
					const thumbnailFile = new File([blob], 'thumbnail.png', { type: 'image/png' });
					resolve(thumbnailFile);
				} else {
					reject(new Error('Failed to create thumbnail blob'));
				}
			}, 'image/png');
		};
	});
}

/**
 * Gets fileURL from list of notes.resources used to generate thumbnail. Uses biggest image first. If no image is found. Then it uses video file url
 */
export function getResourceforThumbGen(resources: Resource[]) {
	if (!Array.isArray(resources)) return resources;

	const imageTypes = [
		'image/png',
		'image/jpeg',
		'image/jpg',
		'image/bmp',
		'image/tiff',
		'image/tif',
		'image/svg',
		'image/svg+xml',
		'image/webp',
		'image/gif'
	];
	const videoTypes = [
		'video/mp4',
		'video/webm',
		'video/ogg',
		'video/quicktime',
		'video/x-msvideo',
		'video/x-matroska',
		'video/3gpp',
		'video/ogg',
		'video/x-m4v'
	];

	// Find all images
	const images = resources.filter((r) => imageTypes.includes(r.type));
	if (images.length > 0) {
		// Return the largest image
		return images.reduce((max, img) => (img.size > max.size ? img : max));
	}

	// If no images, look for videos
	const videos = resources.filter((r) => videoTypes.includes(r.type));
	if (videos.length > 0) {
		// Return the first video
		return videos[0];
	}

	// No suitable resource found
	return null;
}

/**
 * Create thumbnail based on resource types. Returns thumbnail as resource
 */
export async function createThumbnail(recordID: string, resources: Resource[]) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).getFirstListItem(`id="${recordID}"`)
	);

	if (error) {
		console.error('Error getting record: ', error.message);
	}

	if (!data || !data.attachments) {
		console.error('Error: no attachments found');
	}

	let thumbnailURL = '';
	let record = data;

	if (!record) return;
	if (record.thumbnail) return;

	const thumbFile = getResourceforThumbGen(resources);
	let thumbResource;

	if (!thumbFile) return;
	if (thumbFile.size < 10000) return;

	const mimeType = thumbFile.type;
	const defaultThumbURL = thumbFile.fileURL;
	const videoURL = replacePbUrl(thumbFile.fileURL);

	if (
		!mimeType.includes('image') &&
		!mimeType.includes('video') &&
		!mimeType.includes('application/octet-stream')
	) {
		return;
	}

	if (mimeType.includes('video')) {
		const { data: thumbFile, error: thumbFileError } = await tryCatch(getVideoThumb(videoURL));

		if (thumbFileError) {
			console.error('Error generating thumbfile: ', thumbFileError.message);
			return;
		}

		const { data: thumbRecord, error: thumbError } = await tryCatch(
			pb.collection(notesCollection).update(record.id, {
				'attachments+': [thumbFile]
			})
		);

		if (thumbError) {
			console.error('Error getting updated thumbnail record: ', thumbError.message);
			return;
		}

		if (!thumbRecord) return;
		thumbnailURL = `${baseURL}/${notesCollection}/${record.id}/${thumbRecord.attachments.at(-1)}?thumb=500x0`;
		const thumbnailResourceURL = `${baseURL}/${notesCollection}/${record.id}/${thumbRecord.attachments.at(-1)}`;
		// uses video itself as thumbnail:
		// thumbnailURL = `${baseURL}/${notesCollection}/${record.id}/${record.attachments[index]}`
		const thumbHash = await getFileHash(thumbFile);
		thumbResource = makeResourceFromFile(thumbFile, thumbHash, thumbnailResourceURL);
	} else if (mimeType == 'image/gif') {
		thumbnailURL = defaultThumbURL;
	} else {
		thumbnailURL = `${defaultThumbURL}?thumb=500x0`;
	}

	// update thumbnail
	const { data: updatedRecord, error: thumbnailError } = await tryCatch(
		pb.collection(notesCollection).update(record.id, {
			thumbnail: thumbnailURL
		})
	);

	if (thumbnailError) {
		console.error('Error updating record: ', thumbnailError.message);
	}
	record = updatedRecord;

	return thumbResource;
}

/**
 * Add thumbnail to record with a given thumbURL. This also adds thumb 500x0 suffix
 */
export async function addThumbnailToRecord(recordID: string, thumbURL: string) {
	const { data: record, error } = await tryCatch(
		pb.collection(notesCollection).update(recordID, {
			thumbnail: `${thumbURL}?thumb=500x0`
		})
	);

	if (error) {
		console.error('Error updating thumbURL: ', error.message);
	}

	return record;
}

// ─────────────────────────────
//      Content Operation
// ─────────────────────────────

/**
 * Returns html embed for different medias
 */
export function addMediaToContent(mimeType: string, fileURL: string, fileName: string) {
	if (!fileURL) {
		console.error('No file URL');
		return '';
	}

	if (!fileName) {
		console.error('No fileName provided');
		return '';
	}

	if (
		mimeType.includes('image') ||
		['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'tiff', 'tif'].some((ext) =>
			fileName.includes(ext.toLowerCase())
		)
	) {
		return `<img src=${fileURL} type=${mimeType}>`;
	}

	if (fileName.includes('svg')) {
		return `<img src=${fileURL} type='svg' />`;
	}

	if (
		mimeType.includes('video') ||
		['mp4', 'webm', 'mov', 'avi', 'mkv', '3gp', 'ogg'].some((ext) => fileName.includes(ext))
	) {
		return `<video style='width:100%' controls><source src=${fileURL} type=${mimeType} />Your browser does not support the video tag.</video>`;
	}

	if (mimeType == 'audio/mpeg' || ['mp3', 'wav', 'aac'].some((ext) => fileName.includes(ext))) {
		return `<div style="text-align: center;"><audio class="audio-player" controls style="width: 80vw; max-width: 400px;"><source src=${fileURL} type=${mimeType}><a href=${fileURL} target="_blank">${fileName}</a>.</audio></div>`;
	}

	if (mimeType == 'application/pdf') {
		return `<a href=${fileURL} target="_blank">${fileName}</a><iframe src=${fileURL} style="width: 80vw; min-height: 800px; height: 100vh; max-width: 900px; margin: auto; display: block;" frameborder="0" > </iframe> `;
	} else {
		return `<a href=${fileURL} type=${mimeType}/>${fileName}</a>`;
	}
}

/**
 * Create description given html content
 */
export function createDescription(htmlContent: string, maxLength = 300) {
	if (!htmlContent) return null;

	const strippedText = htmlContent
		.replace(/<[^>]+>/g, '') // Remove HTML tags
		.replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
		.replace(/\s+/g, ' '); // Normalize whitespace

	const trimmedText = strippedText.trim();

	if (trimmedText.length <= maxLength) {
		return trimmedText;
	}

	return trimmedText.substring(0, maxLength);
}

/**
 * Parses youtube duration into readable format
 */
export function parseYouTubeDuration(duration: string) {
	const regex = /P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
	const matches = duration.match(regex);

	if (!matches) return null;

	const days = parseInt(matches[1] || 0, 10);
	const hours = parseInt(matches[2] || 0, 10);
	const minutes = parseInt(matches[3] || 0, 10);
	const seconds = parseInt(matches[4] || 0, 10);

	const parts = [];
	if (days) parts.push(`${days}d`);
	if (hours) parts.push(`${hours}h`);
	if (minutes) parts.push(`${minutes}m`);
	if (seconds) parts.push(`${seconds}s`);
	return parts.join(' ') || '0s';
}

// ─────────────────────────────
//      Resource Operation
// ─────────────────────────────

/**
 * Clear attachments
 */
export async function deleteAllAttachments(recordID: string) {
	const { data: record, error } = await tryCatch(
		pb.collection(notesCollection).update(recordID, {
			attachments: []
		})
	);

	if (error) {
		console.error('Error clearing attachments: ', error.message);
		return;
	}

	if (!record) return;
}

/**
 * Add this file as the only attachment, overwrite any existing
 */
export async function addAsOnlyFileToRecord(recordID: string, file: File) {
	// upload to database
	const { data: record, error } = await tryCatch<RecordModel, PError>(
		pb.collection(notesCollection).update(recordID, {
			attachments: [file]
		})
	);

	if (error) {
		console.error('Error uploading file: ', error.message, error.data);
		return '';
	}

	return `${baseURL}\/${notesCollection}\/${recordID}\/${record.attachments.at(-1)}`;
}

/**
 * Create one Resource for record based on file
 */
export function makeResourceFromFile(file: File, hash: string, url: string) {
	const resource: Resource = {
		name: file.name,
		size: file.size,
		hash: hash,
		type: file.type,
		fileURL: url,
		lastUpdated: new Date().toISOString()
	};
	return resource;
}

/**
 * Given one old resource, upload attachment to new record, and return new resource
 */
async function createOneNewResource(recordID: string, resource: Resource) {
	const attachment = await downloadAttachmentByURL(
		replacePbUrl(resource.fileURL),
		resource.name,
		resource.type
	);
	return {
		name: resource.name,
		fileURL: await uploadFileToPocketbase(recordID, attachment),
		oldFileURL: resource.fileURL,
		hash: resource.hash,
		type: resource.type,
		size: resource.size,
		lastUpdated: new Date().toISOString()
	} as Resource;
}

/**
 * For list of records, upload all of their resources to new record, return new resource
 */
export async function createNewResources(recordID: string, records: RecordModel[]) {
	let newResources: Resource[] = [];
	for (const record of records) {
		if (!record.resources) continue;
		for (const resource of record.resources) {
			if (!resource) continue;
			console.log('before createonenewresource');
			const newResource = await createOneNewResource(recordID, resource);
			console.log('aftercreatingonenewreousrce');
			newResources.push(newResource);
		}
	}
	return newResources;
}

/**
 * Merge old resource list and/or new resource list. If both are empty, return undefined
 */
export function mergeResources(
	originalResources: Resource[] | undefined | null,
	newResources: Resource | Resource[] | undefined | null
) {
	const newResourceList = Array.isArray(newResources)
		? newResources
		: newResources
			? [newResources]
			: [];
	const oldResourceList = Array.isArray(originalResources)
		? originalResources
		: originalResources
			? [originalResources]
			: [];

	if (oldResourceList.length === 0 && newResourceList.length === 0) return [];

	const all = [...oldResourceList, ...newResourceList];

	try {
		// Deduplicate by resource.hash
		const seen = new Set();
		const deduped = [];

		for (const res of all) {
			if (!seen.has(res.hash)) {
				seen.add(res.hash);
				deduped.push(res);
			}
		}
		return deduped;
	} catch (e) {
		console.log(e);
		return all;
	}
}

/**
 * merge new resource or resources to Record.resource in database
 */
export async function addResourcesToRecord(recordID: string, resource: Resource | Resource[]) {
	const { data: record, error } = await tryCatch(pb.collection(notesCollection).getOne(recordID));

	if (error) {
		console.error('Error getting record: ', error.message);
		return;
	}

	if (!record) return;

	const oldResources = record.resources;
	let mergedResource = mergeResources(oldResources, resource);

	const { data: updatedRecord, error: updatedError } = await tryCatch(
		pb.collection(notesCollection).update(recordID, {
			resources: mergedResource
		})
	);

	if (error) {
		console.error('Error adding resources: ', error.message);
		return;
	}

	return mergedResource;
}

// ─────────────────────────────
//      Pocketbase Merge
// ─────────────────────────────

/**
 * Merges sources into a list of unique sources
 */
export function mergeSources(notes: Note[]) {
	const allSources = notes.flatMap((n) => n.sources || []);

	const uniqueSources = Array.from(
		new Map(allSources.map((src) => [`${src.source}|${src.source_url}`, src])).values()
	);
	return uniqueSources;
}

/**
 * parses out head and body of content, clears out all min-h and h-screen styles. Return cleaned version
 */
export function getContentBeforeMerge(noteContent: string) {
	const DomParser = new DOMParser();
	const content = DomParser.parseFromString(noteContent, 'text/html');

	const head = content.querySelector('head');
	const body = content.querySelector('body');

	if (!head || !body) {
		return {
			head: '',
			body: ''
		};
	}

	// Remove problematic Tailwind-style classes from all elements
	body.querySelectorAll('[class]').forEach((el) => {
		const classAttr =
			typeof el.className === 'string' ? el.className : el.getAttribute('class') || '';
		const classes = classAttr.split(/\s+/);
		const filtered = classes.filter(
			(c) =>
				!c.startsWith('min-h-') &&
				!c.startsWith('min-w-') &&
				!c.startsWith('h-screen') &&
				!c.startsWith('w-screen')
		);
		el.setAttribute('class', filtered.join(' '));
	});

	// Remove min-height inline styles
	body.querySelectorAll('[style]').forEach((el) => {
		const style = el.getAttribute('style') || '';
		if (style.includes('min-height')) {
			const newStyle = style
				.split(';')
				.filter((s) => !s.trim().startsWith('min-height'))
				.join(';');
			el.setAttribute('style', newStyle);
		}
	});

	// removes style min-height
	head.querySelectorAll('style').forEach((style) => {
		const cleaned = style.innerHTML.replace(/min-height\s*:\s*[\w]+/gi, '');
		style.innerHTML = cleaned;
	});

	const wrapped = `<div style="all: unset; display: block;">${body.innerHTML}</div>`;

	return {
		head: head?.innerHTML,
		body: wrapped
	};
}

/**
 * gets a list of notes and then merge their content into one final HTML
 */
export function mergeNotesContent(notes: Note[]) {
	let mergedHead: string[] = [];
	let mergedBody: string[] = [];

	for (const note of notes) {
		const { head, body } = getContentBeforeMerge(note.content);
		mergedHead.push(head);
		mergedBody.push(body);
	}

	const finalHead = mergedHead.join('\n');
	const finalBody = mergedBody.join('\n\n<br/>\n\n');

	const finalHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                ${finalHead}
            </head>
            <body>
                ${finalBody}
            </body>
            </html>`.trim();
	return finalHTML;
}

/**
 * creates pocketbase merged data from set of notes ready to be added to db
 */
export function createMergedNoteData(notes: Note[], newResources: Resource[]) {
	const [base, ...rest] = notes;
	let content = mergeNotesContent(notes);

	for (const resource of newResources) {
		if (!resource.oldFileURL) continue;
		content = content.replace(resource.oldFileURL, resource.fileURL);
	}

	return {
		title: base.title,
		notebook: base.notebook,
		tags: [...new Set(notes.flatMap((n) => n.tags || []))],
		last_opened: new Date().toISOString(),
		sources: mergeSources(notes),
		resources: mergeResources(base.resources, newResources),
		description: notes.map((n) => n.description).join('\n\n'),
		content: content,
		original_content: content
	};
}

/**
 * gets a list of contents and then merge their content into one final HTML
 */
export function mergeContents(contentList: string[]) {
	let mergedHead: string[] = [];
	let mergedBody: string[] = [];

	for (const content of contentList) {
		const { head, body } = getContentBeforeMerge(content);
		mergedHead.push(head);
		mergedBody.push(body);
	}

	const finalHead = mergedHead.join('\n');
	const finalBody = mergedBody.join('\n\n<br/>\n\n');

	const finalHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                ${finalHead}
            </head>
            <body>
                ${finalBody}
            </body>
            </html>`.trim();
	return finalHTML;
}

// ─────────────────────────────
//      Front End
// ─────────────────────────────

/**
 * creates custom styels for note content
 */
export function getCustomStyles(fontScale: number) {
	return `
			:root {
				  --color-base-100: oklch(100% 0 0);
				  --color-base-content: oklch(27.807% 0.029 256.847);
			  }
			  @media (prefers-color-scheme: dark) {
				:root {
					  --color-base-100: oklch(25.33% 0.016 252.42);
					  --color-base-content: oklch(97.807% 0.029 256.847); 
			   }
			}
			  html, body {
				  margin: 0 !important;
				  height: 100% !important;
			  }
			  * {
				  font-size: ${fontScale * 100}% !important;
				  line-height: 1.4 !important;
			 }
			  html, body, main, section, p, pre, div {
				  background-color: var(--color-base-100) !important;
				  background: var(--color-base-100) !important; 
				  color: var(--color-base-content) !important;
			  }
			  img {
				  max-width: 100% !important;
				  height: auto !important;
			  }
			  .img-wrapper {
				  display: flex;
				  justify-content: center;
				  margin-bottom: 1rem;
			  }
			  video {
				  max-height: 800px; !important;
			  }
			  `;
}

/**
 * gets share url token
 */
export function getShareURL(shareToken: string) {
	return `${window.location.origin}/share/${shareToken}`;
}

// Types for the result object with discriminated union
type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}

// debounce
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
}

// debounced search
export const debouncedSearch = debounce(async (searchInput: string) => {
	await goto(`?search=${encodeURIComponent(searchInput)}&page=1`, {
		replaceState: true,
		keepFocus: true,
		noScroll: true
	});
}, 300);

// updates url parameters based on query
export function updateQueryParams(url: URL, updates: Record<string, string | string[] | null>) {
	for (const [key, value] of Object.entries(updates)) {
		url.searchParams.delete(key);

		if (value == null) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				url.searchParams.append(key, item);
			}
		} else {
			url.searchParams.set(key, value);
		}
	}

	return url;
}

type Status = 'active' | 'archived' | 'deleted';
type Sort = '-created' | '-score';
// getSearchQuery
export function getQueryFromURL(url: URL): NoteQuery {
	return {
		page: Number(url.searchParams.get('page') ?? 1),
		search: url.searchParams.get('search') ?? '',
		tagIDs: url.searchParams.getAll('tagIDs'),
		excludedTagIDs: url.searchParams.getAll('excludedTagIDs'),
		notebookID: url.searchParams.get('notebookID') ?? '',
		status: (url.searchParams.get('status') ?? 'active') as Status,
		sort: (url.searchParams.get('sort') ?? '-created') as Sort,
		fullContent: url.searchParams.get('fullContent') === 'true',
		fullTextSearch: url.searchParams.get('fullTextSearch') === 'true'
	};
}
