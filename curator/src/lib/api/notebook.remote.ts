import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/notebook';
import { getPB } from './utils';

export const makeDefaultNotebook = query(() => {
	return db.makeDefaultNotebook(getPB());
});

export const getAllNotebooks = query(() => {
	return db.getAllNotebooks(getPB());
});

export const getActiveNotebooks = query(() => {
	return db.getActiveNotebooks(getPB());
});

export const getTotalNotecount = query(() => {
	return db.getTotalNotecount(getPB());
});

export const getInbox = query(() => {
	return db.getInbox(getPB());
});

export const pinNotebook = command(v.string(), async (recordID) => {
	await db.pinNotebook(getPB(), recordID);
});

export const unpinNotebook = command(v.string(), (recordID) => {
	db.unpinNotebook(getPB(), recordID);
});

export const createOneNotebookbyName = command(
	v.object({
		newName: v.string(),
		parentNotebookID: v.optional(v.string())
	}),
	({ newName, parentNotebookID }) => {
		db.createOneNotebookbyName(getPB(), newName, parentNotebookID);
	}
);

export const updateOneNotebookByName = command(
	v.object({
		recordID: v.string(),
		newName: v.string()
	}),
	({ recordID, newName }) => {
		db.updateOneNotebookByName(getPB(), recordID, newName);
	}
);

export const deleteNotebook = command(
	v.object({
		recordID: v.string(),
		inboxID: v.string()
	}),
	({ recordID, inboxID }) => {
		db.deleteNotebook(getPB(), recordID, inboxID);
	}
);

export const updateOneNotebookByParent = command(
	v.object({
		recordID: v.string(),
		parentNotebook: v.string()
	}),
	({ recordID, parentNotebook }) => {
		db.updateOneNotebookByParent(getPB(), recordID, parentNotebook);
	}
);
