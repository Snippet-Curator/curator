import { tryCatch } from '$lib/utils.svelte';

import PocketBase from 'pocketbase';

import { pbURL, notesCollection, viewNotesCollection, viewNotebooksCollection } from '$lib/const';
import { type Note, type NoteQuery } from '$lib/types';
import { mergeContents } from '$lib/utils';

export function createPB(cookie: string) {
	const pb = new PocketBase(pbURL);
	pb.authStore.loadFromCookie(cookie);

	return pb;
}

export async function getCurrentNotebook(pb: PocketBase, notebookID: string) {
	const { data, error } = await tryCatch(pb.collection(viewNotebooksCollection).getOne(notebookID));

	if (error) {
		console.error('Error getting notebook: ', error);
	}
	return data;
}

export async function getNotes(pb: PocketBase, query: NoteQuery) {
	const page = query.page ?? 1;

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
		filters.push(`!(tags ~ "${tagID}")`);
	}

	const filter = filters.join(' && ');

	// console.log('filter', filter);

	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 24, {
			sort: '-created',
			filter,
			expand: 'notebook,tags'
		})
	);

	if (error) {
		console.error(error);
		return;
	}

	return data;
}

export async function getByPage(pb: PocketBase, newPage = 1) {
	const start = performance.now();

	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(newPage, 24, {
			sort: '-created',
			filter: `status="active"`,
			expand: 'notebook, tags'
		})
	);

	if (error) {
		console.error('Unable to get notes by page ', error.message);
	}

	const end = performance.now();
	// console.log(`Default notes seen in ${end - start} ms`);

	return data;
}

export async function getByNotebook(pb: PocketBase, notebookID: string, page: number) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 24, {
			filter: `notebook="${notebookID}" && status="active"`,
			expand: 'tags,notebook',
			sort: '-created'
		})
	);

	if (error) {
		console.error('Error getting notes: ', error);
	}

	return data;
}

export async function getArchived(pb: PocketBase, page: number) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 24, {
			filter: `status="archived"`,
			expand: 'tags,notebook',
			sort: '-created'
		})
	);

	if (error) {
		console.error('Error getting notes: ', error);
	}

	return data;
}

export async function getDeleted(pb: PocketBase, page: number) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 24, {
			filter: `status="deleted"`,
			expand: 'tags,notebook',
			sort: '-created'
		})
	);

	if (error) {
		console.error('Error getting notes: ', error);
	}

	return data;
}

export async function getByTag(pb: PocketBase, tagID: string, page: number) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 24, {
			filter: `tags~"${tagID}" && status="active"`,
			expand: 'tags,notebook',
			sort: '-created'
		})
	);

	if (error) {
		console.error('Error getting notes: ', error);
	}

	return data;
}

export async function getByFilter(pb: PocketBase, customFilters: string, page: number) {
	console.log('custom filter: ', customFilters);
	const start = performance.now();
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).getList(page, 24, {
			sort: '-created',
			expand: 'tags,notebook',
			filter: customFilters
		})
	);

	if (error) {
		console.error('Unable to get notes by filter ', error.message);
		return;
	}
	const end = performance.now();
	console.log(`search complete in ${end - start} ms`);

	return data;
}

export async function getOneByName(pb: PocketBase) {
	return await pb.collection(notesCollection).getFirstListItem(`name='${name}'`);
}

export async function emptyTrash(pb: PocketBase) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getFullList({
			filter: `status="deleted"`
		})
	);

	if (error) {
		console.error('Unable to get deleted notes: ', error);
	}

	if (!data) return;

	await Promise.all(
		data.map((note) => {
			pb.collection(notesCollection).delete(note.id);
		})
	);
}

export async function softDeleteMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			const { data, error } = await pb.collection(notesCollection).update(recordID, {
				status: 'deleted'
			});

			if (error) {
				console.error('Unable to delete note: ', error);
			}
		})
	);
	// await this.getDefault(this.clickedPage)
}

export async function unSoftDeleteMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			const { data, error } = await pb.collection(notesCollection).update(recordID, {
				status: 'active'
			});

			if (error) {
				console.error('Unable to restore deleted note: ', error);
			}
		})
	);
}

export async function archiveMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			const { data, error } = await pb.collection(notesCollection).update(recordID, {
				status: 'archived'
			});

			if (error) {
				console.error('Unable to archive note: ', error);
			}
		})
	);
	// await this.getDefault(this.clickedPage)
}

export async function unArchiveMultiple(pb: PocketBase, recordIDs: string[]) {
	await Promise.all(
		recordIDs.map(async (recordID) => {
			const { data, error } = await pb.collection(notesCollection).update(recordID, {
				status: 'active'
			});

			if (error) {
				console.error('Unable to un-archive note: ', error);
			}
		})
	);
	// await this.getDefault(this.clickedPage)
}

export async function changeNotesNotebook(
	pb: PocketBase,
	selectedNotesID: string[],
	newNotebookID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			const { data, error } = await tryCatch(
				pb.collection(notesCollection).update(noteID, {
					notebook: newNotebookID
				})
			);
			if (error) {
				console.error('Error changing notebook: ', noteID, error);
			}
		})
	);
	// await this.getDefault(this.clickedPage)
}

export async function addTagToNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			const { data, error } = await tryCatch(
				pb.collection(notesCollection).update(noteID, {
					'tags+': selectedTagID
				})
			);
			if (error) {
				console.error('Error adding tag: ', noteID, error);
			}
		})
	);
	// await this.getDefault(this.clickedPage)
}

export async function removeTagFromNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagID: string
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			const { data, error } = await tryCatch(
				pb.collection(notesCollection).update(noteID, {
					'tags-': selectedTagID
				})
			);
			if (error) {
				console.error('Error removing tag: ', noteID, error);
			}
		})
	);
}

export async function clearTagsFromNotes(pb: PocketBase, selectedNotesID: string[]) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			const { data, error } = await tryCatch(
				pb.collection(notesCollection).update(noteID, {
					tags: []
				})
			);
			if (error) {
				console.error('Error clearing tags: ', noteID, error);
			}
		})
	);
}

export async function changeTagsFromNotes(
	pb: PocketBase,
	selectedNotesID: string[],
	selectedTagsID: string[]
) {
	await Promise.all(
		selectedNotesID.map(async (noteID) => {
			const { data, error } = await tryCatch(
				pb.collection(notesCollection).update(noteID, {
					tags: selectedTagsID
				})
			);
			if (error) {
				console.error('Error removing tag: ', noteID, error);
			}
		})
	);
}

export async function mergeNotes(pb: PocketBase, selectedNotesID: string[]) {
	await pb.collection('notes').unsubscribe();

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
	const newResources = await createNewResources(baseNote.id, restNotes);
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
			const thumbResource = getResourceThumbURL(finalNote.resources);
			await addThumbnailToRecord(baseNote.id, thumbResource?.fileURL);
		} catch (e) {
			console.log(e);
		}
	}

	// delete old notes
	await Promise.all(selectedNotes.slice(1).map((n) => pb.collection(notesCollection).delete(n.id)));
}

// Single Note

export async function getNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).getOne<Note>(noteID, {
			expand: 'notebook,tags'
		})
	);

	if (error) {
		console.error('Error getting note: ', noteID, error);
		return null;
	}

	return data;
}

export async function getDiscoverNoteList(
	pb: PocketBase,
	filter: string = `status="active"`,
	page = 1
) {
	// const start = performance.now();
	const { data, error } = await tryCatch(
		pb.collection(viewNotesCollection).getList(page, 30, {
			sort: '-score',
			filter: filter
		})
	);

	if (error) {
		console.error('Error getting discover note: ', error.data);
	}
	// const end = performance.now();
	// console.log(`Returned Discover List in ${end - start} ms`);

	this.noteList = data;
	return data;
}

export async function getDiscoverNote(pb: PocketBase, index = 0) {
	// const start3 = performance.now();
	this.noteID = this.noteList.items[index].id;

	// const start = performance.now();
	const { data: record, error: recordError } = await tryCatch(
		pb.collection(notesCollection).getFirstListItem(`id="${this.noteID}"`, {
			expand: 'notebook,tags'
		})
	);
	// const end = performance.now();

	// console.log(`Fetched new note  in ${end - start} ms`);

	if (recordError) {
		console.error('Error getting discover note: ', recordError.data);
	}

	if (!record) {
		console.log('No discovery note found');
	}

	// const start2 = performance.now();
	this.note = record;

	this.updateLastOpened();
	// const end2 = performance.now();
	// console.log(`Updated this.note  in ${end2 - start2} ms`);
	// const end3 = performance.now();
	// console.log(`Discover function  in ${end3 - start3} ms`);
}

export async function updateLastOpened(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			last_opened: new Date()
		})
	);

	if (error) {
		console.error('Error updating note last opened date: ', error.message);
	}
}

export async function deleteNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(pb.collection(notesCollection).delete(noteID));
	if (error) {
		console.error('Error deleting note: ', noteID, error);
	}
}

export async function softDeleteNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			status: 'deleted'
		})
	);

	if (error) {
		console.error('Unable to delete note: ', error);
	}
}

export async function changeNoteNotebook(pb: PocketBase, noteID: string, newNotebookID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			notebook: newNotebookID
		})
	);
	if (error) {
		console.error('Error changing notebook: ', noteID, error);
	}
}

export async function changeTags(pb: PocketBase, noteID: string, selectedTags: string[]) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			tags: selectedTags
		})
	);
	if (error) {
		console.error('Error changing tags: ', noteID, error);
	}
}

export async function addTagToNote(pb: PocketBase, noteID: string, selectedTagID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			'tags+': selectedTagID
		})
	);
	if (error) {
		console.error('Error adding tag: ', noteID, error);
	}
}

export async function removeTagFromNote(pb: PocketBase, noteID: string, selectedTagID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			'tags-': selectedTagID
		})
	);
	if (error) {
		console.error('Error removing tag: ', noteID, error);
	}
}

export async function changeRating(pb: PocketBase, noteID: string, newRating: number) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			rating: newRating
		})
	);
	if (error) {
		console.error('Error changing rating: ', noteID, error.message);
	}
}

export async function upvoteWeight(pb: PocketBase, noteID: string) {
	const newWeight = note.weight + 1;

	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			weight: newWeight
		})
	);
	if (error) {
		console.error('Error changing weight: ', noteID, error.message);
	}
}

export async function downvoteWeight(pb: PocketBase, noteID: string) {
	const newWeight = note.weight - 1;

	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			weight: newWeight
		})
	);
	if (error) {
		console.error('Error changing weight: ', noteID, error.message);
	}
}

export async function archiveNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			status: 'archived'
		})
	);

	if (error) {
		console.error('Error archiving note: ', error.message);
	}
}

export async function restoreNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			status: 'active'
		})
	);

	if (error) {
		console.error('Error restoring note: ', error.message);
	}
}

export async function permaDeleteNote(pb: PocketBase, noteID: string) {
	const { data, error } = await tryCatch(pb.collection(notesCollection).delete(noteID));

	if (error) {
		console.error('Error deleting note: ', error.message);
	}
}

export async function changeTitle(pb: PocketBase, noteID: string, newTitle: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			title: newTitle
		})
	);

	if (error) {
		console.error('Error changing note title: ', error.message);
	}
}

export async function changeDescription(pb: PocketBase, noteID: string, newDescription: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			description: newDescription
		})
	);

	if (error) {
		console.error('Error changing note description: ', error.message);
	}
}

export async function changeSources(
	pb: PocketBase,
	noteID: string,
	newSources: Note['sources'] | undefined
) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			sources: newSources,
			expand: 'notebook,tags'
		})
	);

	if (error) {
		console.error('Error changing note sources: ', error.message);
	}
}

export async function changeThumbnail(pb: PocketBase, noteID: string, url: string) {
	const thumbURL = url ? `${url}?thumb=500x0` : '';

	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(noteID, {
			thumbnail: thumbURL
		})
	);

	if (error) {
		console.error('Error changing note thumbnail: ', error.message);
	}
}

export async function updateContent(pb: PocketBase, noteID: string, newContent: string) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).update(
			noteID,
			{
				content: newContent
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

export async function appendContent(pb: PocketBase, noteID: string, newContent: string) {
	const { data: record, error: recordError } = await tryCatch(
		pb.collection(notesCollection).getOne(noteID)
	);

	if (recordError) {
		console.error('Error getting note content: ', recordError.message);
		return;
	}

	const contentList = [record.content, newContent];
	const mergedContent = mergeContents(contentList);

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
