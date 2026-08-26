import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/notes';
import { getPB } from './utils';

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

export const getNote = query(v.string(), (noteID) => {
	return db.getNote(getPB(), noteID);
});

export const updateLastOpened = command(v.string(), (noteID) => {
	db.updateLastOpened(getPB(), noteID);
});

export const deleteNote = command(v.string(), (noteID) => {
	db.deleteNote(getPB(), noteID);
});

export const softDeleteNote = command(v.string(), (noteID) => {
	db.softDeleteNote(getPB(), noteID);
});

export const changeNoteNotebook = command(
	v.object({
		noteID: v.string(),
		newNotebookID: v.string()
	}),
	({ noteID, newNotebookID }) => {
		db.changeNoteNotebook(getPB(), noteID, newNotebookID);
	}
);

export const changeTags = command(
	v.object({
		noteID: v.string(),
		selectedTags: v.array(v.string())
	}),
	({ noteID, selectedTags }) => {
		db.changeTags(getPB(), noteID, selectedTags);
	}
);

export const addTagToNote = command(
	v.object({
		noteID: v.string(),
		selectedTagID: v.string()
	}),
	({ noteID, selectedTagID }) => {
		db.addTagToNote(getPB(), noteID, selectedTagID);
	}
);

export const removeTagFromNote = command(
	v.object({
		noteID: v.string(),
		selectedTagID: v.string()
	}),
	({ noteID, selectedTagID }) => {
		db.removeTagFromNote(getPB(), noteID, selectedTagID);
	}
);

export const changeRating = command(
	v.object({
		noteID: v.string(),
		newRating: v.number()
	}),
	({ newRating, noteID }) => {
		db.changeRating(getPB(), noteID, newRating);
	}
);

export const archiveNote = command(v.string(), (noteID) => {
	db.archiveNote(getPB(), noteID);
});

export const restoreNote = command(v.string(), (noteID) => {
	db.restoreNote(getPB(), noteID);
});

export const permaDeleteNote = command(v.string(), (noteID) => {
	db.permaDeleteNote(getPB(), noteID);
});

export const changeTitle = command(
	v.object({
		noteID: v.string(),
		newTitle: v.string()
	}),
	({ noteID, newTitle }) => {
		db.changeTitle(getPB(), noteID, newTitle);
	}
);

export const changeDescription = command(
	v.object({
		noteID: v.string(),
		newDescription: v.string()
	}),
	({ noteID, newDescription }) => {
		db.changeDescription(getPB(), noteID, newDescription);
	}
);

export const changeSources = command(
	v.object({
		noteID: v.string(),
		newSources: v.string()
	}),
	({ noteID, newSources }) => {
		db.changeSources(getPB(), noteID, newSources);
	}
);

export const changeThumbnail = command(
	v.object({
		noteID: v.string(),
		url: v.string()
	}),
	({ noteID, url }) => {
		db.changeThumbnail(getPB(), noteID, url);
	}
);

export const updateContent = command(
	v.object({
		noteID: v.string(),
		newContent: v.string()
	}),
	({ noteID, newContent }) => {
		db.updateContent(getPB(), noteID, newContent);
	}
);

export const appendContent = command(
	v.object({
		noteID: v.string(),
		newContent: v.string()
	}),
	({ noteID, newContent }) => {
		db.appendContent(getPB(), noteID, newContent);
	}
);

export const shareNote = command(v.string(), (noteID) => {
	return db.shareNote(getPB(), noteID);
});

export const unshareNote = command(v.string(), (noteID) => {
	return db.unshareNote(getPB(), noteID);
});

// multiple notes

export const getNotes = query(noteQuerySchema, async (query) => {
	return db.getNotes(getPB(), query);
});

export const archiveMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	return db.archiveMultiple(getPB(), recordIDs);
});

export const unArchiveMultiple = command(v.array(v.string()), async (recordIDs: string[]) => {
	return db.unArchiveMultiple(getPB(), recordIDs);
});

export const softDeleteMultiple = command(v.array(v.string()), (recordIDs: string[]) => {
	db.softDeleteMultiple(getPB(), recordIDs);
});

export const unSoftDeleteMultiple = command(v.array(v.string()), (recordIDs: string[]) => {
	db.unSoftDeleteMultiple(getPB(), recordIDs);
});

export const mergeNotes = command(v.array(v.string()), (selectedNotesID: string[]) => {
	db.mergeNotes(getPB(), selectedNotesID);
});

export const changeNotesNotebook = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		newNotebookID: v.string()
	}),
	async ({ selectedNotesID, newNotebookID }) => {
		db.changeNotesNotebook(getPB(), selectedNotesID, newNotebookID);
	}
);

export const addTagToNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	({ selectedNotesID, selectedTagID }) => {
		db.addTagToNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const removeTagFromNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagID: v.string()
	}),
	({ selectedNotesID, selectedTagID }) => {
		db.removeTagFromNotes(getPB(), selectedNotesID, selectedTagID);
	}
);

export const clearTagsFromNotes = command(v.array(v.string()), (selectedNotesID) => {
	db.clearTagsFromNotes(getPB(), selectedNotesID);
});

export const changeTagsFromNotes = command(
	v.object({
		selectedNotesID: v.array(v.string()),
		selectedTagsID: v.array(v.string())
	}),
	({ selectedNotesID, selectedTagsID }) => {
		db.changeTagsFromNotes(getPB(), selectedNotesID, selectedTagsID);
	}
);

export const emptyTrash = command(() => {
	db.emptyTrash(getPB());
});
