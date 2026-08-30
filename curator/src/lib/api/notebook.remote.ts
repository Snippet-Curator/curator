import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/notebook';
import { getPB } from '$lib/server/pocketbase';

export const makeDefaultNotebook = query(async () => {
	return await db.makeDefaultNotebook(getPB());
});

export const getAllNotebooks = query(async () => {
	return await db.getAllNotebooks(getPB());
});

export const getActiveNotebooks = query(async () => {
	return await db.getActiveNotebooks(getPB());
});

export const getTotalNotecount = query(async () => {
	return await db.getTotalNotecount(getPB());
});

export const getInbox = query(async () => {
	return await db.getInbox(getPB());
});

export const pinNotebook = command(v.string(), async (recordID) => {
	await db.pinNotebook(getPB(), recordID);
});

export const unpinNotebook = command(v.string(), async (recordID) => {
	await db.unpinNotebook(getPB(), recordID);
});

export const createOneNotebookbyName = command(
	v.object({
		newName: v.string(),
		parentNotebookID: v.optional(v.string())
	}),
	async ({ newName, parentNotebookID }) => {
		await db.createOneNotebookbyName(getPB(), newName, parentNotebookID);
	}
);

export const updateOneNotebookByName = command(
	v.object({
		recordID: v.string(),
		newName: v.string()
	}),
	async ({ recordID, newName }) => {
		await db.updateOneNotebookByName(getPB(), recordID, newName);
	}
);

export const deleteNotebook = command(
	v.object({
		recordID: v.string(),
		inboxID: v.string()
	}),
	async ({ recordID, inboxID }) => {
		await db.deleteNotebook(getPB(), recordID, inboxID);
	}
);

export const updateOneNotebookByParent = command(
	v.object({
		recordID: v.string(),
		parentNotebook: v.string()
	}),
	async ({ recordID, parentNotebook }) => {
		await db.updateOneNotebookByParent(getPB(), recordID, parentNotebook);
	}
);
