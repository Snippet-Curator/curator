import PocketBase from 'pocketbase';

import { pbURL } from '$lib/const';

import { notesCollection, baseURL } from '$lib/const';
import { tryCatch } from '$lib/utils';

export function createPB(cookie: string) {
	const pb = new PocketBase(pbURL);
	pb.authStore.loadFromCookie(cookie);

	return pb;
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
