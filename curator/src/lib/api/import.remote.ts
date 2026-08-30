import * as v from 'valibot';
import { command } from '$app/server';
import { processImport } from '$lib/server/imports/processor';

export const startImport = command(
	v.object({
		file: v.file(),
		selectedNotebookID: v.string(),
		selectedTagIdArray: v.array(v.string())
	}),
	async ({ file, selectedNotebookID, selectedTagIdArray }) => {
		await processImport({ file, type: 'file', selectedNotebookID, selectedTagIdArray });
	}
);

export const startYTImport = command(
	v.object({
		url: v.string(),
		selectedNotebookID: v.string(),
		selectedTagIdArray: v.array(v.string())
	}),
	async ({ url, selectedNotebookID, selectedTagIdArray }) => {
		await processImport({ type: 'youtube', url, selectedNotebookID, selectedTagIdArray });
	}
);
