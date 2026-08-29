import PocketBase from 'pocketbase';
import { updateImport } from '$lib/server/db/imports';
import { htmlImport } from '$lib/server/imports/parsers/html';

import { type UpdateImportData } from '$lib/types';

function getParser(filename: string) {
	const extension = filename.split('.').pop()?.toLowerCase();

	switch (extension) {
		case '':
			return new EPUBParser();

		case 'html':
			return new htmlImport();

		case 'xml':
			return new XMLImportParser();

		case 'md':
			return new MarkdownParser();

		default:
			throw new Error(`Unsupported file type: ${extension}`);
	}
}

export async function uploadImport(pb: PocketBase, file: File) {}

export async function processImport(pb: PocketBase, importID: string) {
	try {
		await updateImport(pb, importID, {
			status: 'processing',
			progress: 0
		});

		const importRecord = await pb.collection('imports').getOne(importID);

		const parser = getParser(importRecord.filename);

		const result = await parser.parse(importRecord);

		await updateImport(pb, importID, {
			progress: 90
		});

		await saveImportedNotes(pb, result);

		await updateImport(pb, importID, {
			status: 'completed',
			progress: 100
		});
	} catch (error) {
		await updateImport(pb, importID, {
			status: 'failed',
			error: String(error)
		});

		throw error;
	}
}
