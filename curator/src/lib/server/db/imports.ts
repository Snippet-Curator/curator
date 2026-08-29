import type { ImportRecord, UpdateImportData } from '$lib/types';
import PocketBase from 'pocketbase';
import { importCollection } from '../const';

export async function createImport(pb: PocketBase, file: File) {
	const importRecord = await pb.collection(importCollection).create<ImportRecord>({
		filename: file.name,
		status: 'pending',
		progress: 0
	});
	await pb.collection(importCollection).update(importRecord.id, {
		file
	});

	return importRecord;
}

export async function updateImport(pb: PocketBase, importID: string, data: UpdateImportData) {}

export async function getImport(pb: PocketBase, importID: string) {
	return await pb.collection(importCollection).getOne(importID);
}
