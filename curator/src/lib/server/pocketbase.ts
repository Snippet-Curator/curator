import PocketBase from 'pocketbase';

import { baseURL } from '$lib/const';
import { tryCatch } from '$lib/utils';

import { notesCollection } from '$lib/server/const';
import { getRequestEvent } from '$app/server';

export function getPB() {
	return getRequestEvent().locals.pb;
}

/**
 * uploads file to Pocketbase
 */
export async function uploadFileToPocketbase(pb: PocketBase, recordID: string, file: File) {
	// upload to database
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

/**
 * downloads attachment from pocketbase and returns in file format
 */
export async function downloadAttachmentByURL(fileURL: string, fileName: string, fileType: string) {
	const response = await fetch(fileURL);
	const blob = await response.blob();
	return new File([blob], fileName, { type: fileType });
}
