import * as v from 'valibot';
import { query } from '$app/server';

import * as db from '$lib/server/db/notes';
import { getPB } from './utils';

const noteQuerySchema = v.object({
	page: v.number(),
	search: v.optional(v.string()),
	tagIDs: v.optional(v.array(v.string())),
	excludedTagIDs: v.optional(v.array(v.string())),
	notebookID: v.optional(v.string()),
	starred: v.optional(v.boolean()),
	status: v.string()
});

export const getNotes = query(noteQuerySchema, async (query) => {
	return db.getNotes(getPB(), query);
});

export const getByPage = query(v.number(), async (page = 1) => {
	return db.getByPage(getPB(), page);
});

export const archiveMultiple = query(v.array(v.string()), async (recordIDs: string[]) => {
	return db.archiveMultiple(getPB(), recordIDs);
});

export const unArchiveMultiple = query(v.array(v.string()), async (recordIDs: string[]) => {
	return db.unArchiveMultiple(getPB(), recordIDs);
});

export const softDeleteMultiple = query(v.array(v.string()), (recordIDs: string[]) => {
	db.softDeleteMultiple(getPB(), recordIDs);
});

export const unSoftDeleteMultiple = query(v.array(v.string()), (recordIDs: string[]) => {
	db.unSoftDeleteMultiple(getPB(), recordIDs);
});

export const mergeNotes = query(v.array(v.string()), (selectedNotesID: string[]) => {
	db.mergeNotes(getPB(), selectedNotesID);
});

export const changeNotesNotebook = query(
	v.object({
		selectedNotesID: v.array(v.string()),
		newNotebookID: v.string()
	}),
	async ({ selectedNotesID, newNotebookID }) => {
		db.changeNotesNotebook(getPB(), selectedNotesID, newNotebookID);
	}
);

export const addTagToNotes = query(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	({ selectedNotesID, selectedTagID }) => {
		db.addTagToNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const removeTagFromNotes = query(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	({ selectedNotesID, selectedTagID }) => {
		db.removeTagFromNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const clearTagsFromNotes = query(v.array(v.string()), (selectedNotesID) => {
	db.clearTagsFromNotes(getPB(), selectedNotesID);
});

export const emptyTrash = query(() => {
	db.emptyTrash(getPB());
});
