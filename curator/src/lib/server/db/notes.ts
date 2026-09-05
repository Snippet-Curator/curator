import PocketBase from 'pocketbase';
import type { ListResult } from 'pocketbase';

import { notesCollection, viewNotesCollection, viewNotebooksCollection } from '$lib/server/const';
import { type Note, type NoteQuery } from '$lib/types';
import {
	addThumbnailToRecord,
	createNewResources,
	getResourceforThumbGen,
	mergeNotesContent,
	createMergedNoteData
} from '$lib/server/utils';
import { tryCatch } from '$lib/utils';

export async function getCurrentNotebook(pb: PocketBase, notebookID: string) {
	const { data, error } = await tryCatch(pb.collection(viewNotebooksCollection).getOne(notebookID));

	if (error) {
		console.error('Error getting notebook: ', error);
	}
	return data;
}

export async function getNotes(pb: PocketBase, query: NoteQuery): Promise<ListResult<Note>> {
	const page = query.page ?? 1;
	const sort = query.sort ?? '-created';
	const collection = query.fullContent ? notesCollection : viewNotesCollection;

	const filters: string[] = [`status="${query.status ?? 'active'}"`];

	if (query.search) {
		filters.push(`title ~ "${query.search}"`);
	}

	if (query.notebookID) {
		filters.push(
			`notebook="${query.notebookID}"
			`
		);
	}

	for (const tagID of query.tagIDs ?? []) {
		filters.push(`tags ~ "${tagID}"`);
	}

	for (const tagID of query.excludedTagIDs ?? []) {
		filters.push(`tags !~ "${tagID}"`);
	}

	const filter = filters.join(' && ');

	return await pb.collection(collection).getList<Note>(page, 24, {
		sort,
		filter,
		expand: 'notebook,tags'
	});
}

export async function emptyTrash(pb: PocketBase) {
	const data = await pb.collection(viewNotesCollection).getFullList<Note>({
		filter: `status="deleted"`
	});

	await Promise.all(
		data.map((note) => {
			pb.collection(notesCollection).delete(note.id);
		})
	);
}

export async function softDeleteMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			await pb.collection(notesCollection).update(recordID, {
				status: 'deleted'
			});
		})
	);
}

export async function unSoftDeleteMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			await pb.collection(notesCollection).update(recordID, {
				status: 'active'
			});
		})
	);
}

export async function archiveMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			await pb.collection(notesCollection).update(recordID, {
				status: 'archived'
			});
		})
	);
}

export async function unArchiveMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			await pb.collection(notesCollection).update(recordID, {
				status: 'active'
			});
		})
	);
}

export async function changeNotesNotebook(
	pb: PocketBase,
	selectedNotesID: string[],
	newNotebookID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			await pb.collection(notesCollection).update(noteID, {
				notebook: newNotebookID
			});
		})
	);
}

export async function addTagToNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			await pb.collection(notesCollection).update(noteID, {
				'tags+': selectedTagID
			});
		})
	);
}

export async function removeTagFromNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			await pb.collection(notesCollection).update(noteID, {
				'tags-': selectedTagID
			});
		})
	);
}

export async function updateTagsForNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagsID: string[]
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			await pb.collection(notesCollection).update(noteID, {
				tags: selectedTagsID
			});
		})
	);
}

export async function mergeNotes(pb: PocketBase, selectedNotesID: string[]) {
	let selectedNotes = [];

	for (const selectedNoteID of selectedNotesID) {
		const { data: selectedNote, error: selectedNoteError } = await tryCatch(
			pb.collection(notesCollection).getOne(selectedNoteID)
		);

		if (selectedNoteError) {
			console.error('Error getting notes to merge: ', selectedNoteError.message);
			continue;
		}
		selectedNotes.push(selectedNote);
	}

	if (!selectedNotes || selectedNotes.length < 2) return;

	const [baseNote, ...restNotes] = selectedNotes;
	const newResources = await createNewResources(pb, baseNote.id, restNotes);
	const mergedNoteData = createMergedNoteData(selectedNotes, newResources);
	const { data: finalNote, error: finalNoteError } = await tryCatch(
		pb.collection(notesCollection).update(baseNote.id, mergedNoteData)
	);

	if (finalNoteError) {
		console.error('Error updating final merged note: ', finalNoteError.data);
	}

	// create new thumbnail if doesn't have one
	if (!baseNote.thumbnail) {
		try {
			const thumbResource = getResourceforThumbGen(finalNote.resources);
			await addThumbnailToRecord(pb, baseNote.id, thumbResource?.fileURL);
		} catch (e) {
			console.log(e);
		}
	}

	// delete old notes
	await Promise.all(selectedNotes.slice(1).map((n) => pb.collection(notesCollection).delete(n.id)));
}

export async function updateNotes(
	pb: PocketBase,
	noteIDs: string[],
	updates: Partial<{
		title: string;
		description: string;
		sources: Note['sources'];
		thumbnail: string;
		content: string;
		last_opened: Date;
	}>
) {
	const batch = pb.createBatch();
	for (const noteID of noteIDs) {
		batch.collection(notesCollection).update(noteID, updates);
	}
	await batch.send();
}

// Single Note

export async function getNote(pb: PocketBase, noteID: string) {
	return await pb.collection(notesCollection).getOne<Note>(noteID, {
		expand: 'notebook,tags'
	});
}

export async function updateLastOpened(pb: PocketBase, noteID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			last_opened: new Date()
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function deleteNote(pb: PocketBase, noteID: string) {
	await pb.collection(notesCollection).delete(noteID);
}

export async function softDeleteNote(pb: PocketBase, noteID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			status: 'deleted'
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function changeNoteNotebook(pb: PocketBase, noteID: string, newNotebookID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			notebook: newNotebookID
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function updateTags(pb: PocketBase, noteID: string, selectedTags: string[]) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			tags: selectedTags
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function addTagToNote(pb: PocketBase, noteID: string, selectedTagID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			'tags+': selectedTagID
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function removeTagFromNote(pb: PocketBase, noteID: string, selectedTagID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			'tags-': selectedTagID
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function changeRating(pb: PocketBase, noteID: string, newRating: number) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			rating: newRating
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function archiveNote(pb: PocketBase, noteID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			status: 'archived'
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function restoreNote(pb: PocketBase, noteID: string) {
	return await pb.collection(notesCollection).update<Note>(
		noteID,
		{
			status: 'active'
		},
		{
			expand: 'notebook,tags'
		}
	);
}

export async function permaDeleteNote(pb: PocketBase, noteID: string) {
	await pb.collection(notesCollection).delete(noteID);
}

export async function updateNote(
	pb: PocketBase,
	noteID: string,
	updates: Partial<{
		title: string;
		description: string;
		sources: Note['sources'];
		thumbnail: string;
		content: string;
	}>
) {
	return await pb.collection(notesCollection).update<Note>(noteID, updates, {
		expand: 'notebook,tags'
	});
}

export async function appendContent(pb: PocketBase, noteID: string, newContent: string) {
	const { data: record, error: recordError } = await tryCatch(
		pb.collection(notesCollection).getOne(noteID)
	);

	if (recordError) {
		console.error('Error getting note content: ', recordError.message);
		return;
	}

	const contentList = [record.content, newContent];
	const mergedContent = mergeNotesContent(contentList);

	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(
			noteID,
			{
				content: mergedContent
			},
			{
				expand: 'notebook,tags'
			}
		)
	);

	if (error) {
		console.error('Error updating note content: ', error.message);
	}
}

function generateShareToken(pb: PocketBase, length = 20) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	const array = new Uint8Array(length);

	window.crypto.getRandomValues(array);

	return Array.from(array, (byte) => chars[byte % chars.length]).join('');
}

export async function shareNote(pb: PocketBase, noteID: string) {
	const sharedToken = generateShareToken(pb);

	const { data: record, error: recordError } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			is_shared: true,
			share_token: sharedToken
		})
	);

	if (recordError) {
		console.error('Error sharing note: ', recordError.message);
		return;
	}
	return sharedToken;
}

export async function unshareNote(pb: PocketBase, noteID: string) {
	const sharedToken = generateShareToken(pb);

	const { data: record, error: recordError } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			is_shared: false,
			share_token: null
		})
	);

	if (recordError) {
		console.error('Error un-sharing note: ', recordError.message);
		return;
	}
	return sharedToken;
}
