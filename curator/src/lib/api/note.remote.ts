import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/notes';
import { getPB } from '$lib/server/pocketbase';

const noteQuerySchema = v.object({
	page: v.number(),
	search: v.optional(v.string()),
	tagIDs: v.optional(v.array(v.string())),
	excludedTagIDs: v.optional(v.array(v.string())),
	notebookID: v.optional(v.string()),
	starred: v.optional(v.boolean()),
	status: v.string(),
	fullContent: v.boolean(),
	fullTextSearch: v.boolean(),
	sort: v.string()
});

export const getNote = query(v.string(), async (noteID) => {
	return await db.getNote(getPB(), noteID);
});

export const updateLastOpened = command(v.string(), async (noteID) => {
	return await db.updateLastOpened(getPB(), noteID);
});

export const deleteNote = command(v.string(), async (noteID) => {
	await db.deleteNote(getPB(), noteID);
});

export const softDeleteNote = command(v.string(), async (noteID) => {
	return await db.softDeleteNote(getPB(), noteID);
});

const sourceSchema = v.object({
	source: v.string(),
	source_url: v.string()
});

export const updateNote = command(
	v.object({
		noteID: v.string(),
		updates: v.object({
			title: v.optional(v.string()),
			description: v.optional(v.string()),
			sources: v.optional(v.array(sourceSchema)),
			thumbnail: v.optional(v.string()),
			content: v.optional(v.string())
		})
	}),
	async ({ noteID, updates }) => {
		return await db.updateNote(getPB(), noteID, updates);
	}
);

export const changeNoteNotebook = command(
	v.object({
		noteID: v.string(),
		newNotebookID: v.string()
	}),
	async ({ noteID, newNotebookID }) => {
		return await db.changeNoteNotebook(getPB(), noteID, newNotebookID);
	}
);

export const updateTags = command(
	v.object({
		noteID: v.string(),
		selectedTags: v.array(v.string())
	}),
	async ({ noteID, selectedTags }) => {
		return await db.updateTags(getPB(), noteID, selectedTags);
	}
);

export const addTagToNote = command(
	v.object({
		noteID: v.string(),
		selectedTagID: v.string()
	}),
	async ({ noteID, selectedTagID }) => {
		return await db.addTagToNote(getPB(), noteID, selectedTagID);
	}
);

export const removeTagFromNote = command(
	v.object({
		noteID: v.string(),
		selectedTagID: v.string()
	}),
	async ({ noteID, selectedTagID }) => {
		return await db.removeTagFromNote(getPB(), noteID, selectedTagID);
	}
);

export const changeRating = command(
	v.object({
		noteID: v.string(),
		newRating: v.number()
	}),
	async ({ newRating, noteID }) => {
		return await db.changeRating(getPB(), noteID, newRating);
	}
);

export const archiveNote = command(v.string(), async (noteID) => {
	return await db.archiveNote(getPB(), noteID);
});

export const restoreNote = command(v.string(), async (noteID) => {
	return await db.restoreNote(getPB(), noteID);
});

export const permaDeleteNote = command(v.string(), async (noteID) => {
	await db.permaDeleteNote(getPB(), noteID);
});

export const appendContent = command(
	v.object({
		noteID: v.string(),
		newContent: v.string()
	}),
	async ({ noteID, newContent }) => {
		await db.appendContent(getPB(), noteID, newContent);
	}
);

export const shareNote = command(v.string(), async (noteID) => {
	return await db.shareNote(getPB(), noteID);
});

export const unshareNote = command(v.string(), async (noteID) => {
	return await db.unshareNote(getPB(), noteID);
});

// multiple notes

export const getNotes = query(noteQuerySchema, async (query) => {
	return await db.getNotes(getPB(), query);
});

export const archiveMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	return await db.archiveMultiple(getPB(), recordIDs);
});

export const unArchiveMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	return await db.unArchiveMultiple(getPB(), recordIDs);
});

export const softDeleteMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	await db.softDeleteMultiple(getPB(), recordIDs);
});

export const unSoftDeleteMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	await db.unSoftDeleteMultiple(getPB(), recordIDs);
});

export const mergeNotes = command(v.array(v.string()), async (selectedNotesID: string[]) => {
	await db.mergeNotes(getPB(), selectedNotesID);
});

export const changeNotesNotebook = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		newNotebookID: v.string()
	}),
	async ({ selectedNotesID, newNotebookID }) => {
		await db.changeNotesNotebook(getPB(), selectedNotesID, newNotebookID);
	}
);

export const addTagToNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	async ({ selectedNotesID, selectedTagID }) => {
		await db.addTagToNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const removeTagFromNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	async ({ selectedNotesID, selectedTagID }) => {
		await db.removeTagFromNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const clearTagsFromNotes = command(v.array(v.string()), async (selectedNotesID) => {
	await db.updateTagsForNotes(getPB(), selectedNotesID, []);
});

export const updateTagsForNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagsID: v.array(v.string())
	}),
	async ({ selectedNotesID, selectedTagsID }) => {
		await db.updateTagsForNotes(getPB(), selectedNotesID, selectedTagsID);
	}
);

export const emptyTrash = command(async () => {
	await db.emptyTrash(getPB());
});
