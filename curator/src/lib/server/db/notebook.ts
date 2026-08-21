import PocketBase from 'pocketbase';
import { tryCatch } from '$lib/utils.svelte';
import {
	notebooksCollection,
	notesCollection,
	viewNotesCollection,
	viewNotebooksCollection
} from '$lib/const';
import { type Notebook } from '$lib/types';

export async function getAllNotebooks(pb: PocketBase) {
	// const start = performance.now()
	const { data: records, error } = await tryCatch(
		pb.collection(viewNotebooksCollection).getFullList<Notebook>({
			sort: 'name',
			// filter: 'name != "Inbox"',
			expand: 'parent'
		})
	);

	if (error) {
		console.error('Error while get all notebooks: ', error.message);
	}

	if (!records) {
		return;
	}

	const flatNotebooks = records;
	const pinnedNotebooks: Notebook[] = [];

	const notebookMap = new Map();
	records.forEach((notebook) => {
		notebookMap.set(notebook.id, { ...notebook, children: [] });
		if (notebook.status === 'pinned') {
			pinnedNotebooks.push(notebook);
		}
	});

	let rootNotebooks: Notebook[] = [];
	notebookMap.forEach((notebook) => {
		if (notebook.expand.parent) {
			const parent = notebookMap.get(notebook.expand.parent.id);
			parent.children.push(notebook);
		} else {
			rootNotebooks.push(notebook);
		}
	});
	// const end = performance.now()
	// console.log(`notebooks in ${end - start} ms`)
	return {
		flatNotebooks,
		pinnedNotebooks,
		rootNotebooks
	};
}

export async function getInbox(pb: PocketBase) {
	const { data: inbox, error } = await tryCatch(
		pb.collection(viewNotebooksCollection).getFirstListItem(`name="Inbox"`)
	);

	if (error) {
		console.error('Error while getting inbox: ', error.message);
	}

	if (!inbox) {
		return;
	}

	return {
		inbox,
		id: inbox.id,
		count: inbox.count
	};
}

export async function getTotalNotecount(pb: PocketBase) {
	const { data, error } = await tryCatch(
		pb.collection(notesCollection).getList(1, 1, {
			filter: `status="active"`
		})
	);

	if (error) {
		console.error('Error while getting all notebooks: ', error.message);
	}

	return data?.totalItems ?? 0;
}

export async function createOneNotebookbyName(
	pb: PocketBase,
	newName: string,
	parentNotebookID?: string
) {
	const { data, error } = await tryCatch(
		pb.collection(notebooksCollection).create({
			name: newName,
			parent: parentNotebookID,
			user: pb.authStore.record?.id
		})
	);
	if (error) {
		console.error('Error while creating new notebook: ', error.data, error.message);
	}
	await this.getAll();
	await this.getAllCounts();
}

export async function getOneNotebookByName(pb: PocketBase, notebookName: string) {
	const { data, error } = await tryCatch(
		pb.collection(viewNotebooksCollection).getFirstListItem(`name="${notebookName}"`)
	);

	if (error) {
		console.error('Error while get notebook: ', notebookName, error.data);
	}
	return data;
}

export async function deleteNotebook(pb: PocketBase, recordID: string) {
	const { data: recordsToMove, error: errorsToMove } = await tryCatch(
		pb.collection(viewNotesCollection).getFullList({
			filter: `notebook = '${recordID}'`
		})
	);

	if (errorsToMove) {
		console.error('Error getting records to move: ', errorsToMove);
		return;
	}

	if (!this.inbox) {
		await this.getInbox();
	}

	for (const record of recordsToMove) {
		const { data: recordToMove, error: errorToMove } = await tryCatch(
			pb.collection(notesCollection).update(record.id, {
				notebook: this.inboxID
			})
		);

		if (errorToMove) {
			console.error('Error moving record: ', errorToMove.message);
			continue;
		}
	}

	const { data, error } = await tryCatch(pb.collection(notebooksCollection).delete(recordID));

	if (error) {
		console.error('Error while deleting notebook: ', error);
	}
	await this.getAll();
	await this.getAllCounts();
}

export async function updateOneNotebookByName(pb: PocketBase, recordID: string, newName: string) {
	const { data, error } = await tryCatch(
		pb.collection(notebooksCollection).update(recordID, {
			name: newName
		})
	);
	if (error) {
		console.error('Error while updating notebook name: ', error);
	}
	await this.getAll();
	await this.getAllCounts();
}

export async function updateOneNotebookByParent(
	pb: PocketBase,
	recordID: string,
	parentNotebook: string
) {
	const { data, error } = await tryCatch(
		pb.collection(notebooksCollection).update(recordID, {
			parent: parentNotebook
		})
	);
	if (error) {
		console.error('Error while updating parent notebook: ', error);
	}
	await this.getAll();
	await this.getAllCounts();
}

export async function pinNotebook(pb: PocketBase, recordID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notebooksCollection).update(recordID, {
			status: 'pinned'
		})
	);
	if (error) {
		console.error('Error pinning notebook: ', error.data);
	}
}

export async function unpinNotebook(pb: PocketBase, recordID: string) {
	const { data, error } = await tryCatch(
		pb.collection(notebooksCollection).update(recordID, {
			status: ''
		})
	);
	if (error) {
		console.error('Error unpinning notebook: ', error.data);
	}
}
