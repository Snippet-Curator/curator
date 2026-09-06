import { getContext, setContext } from 'svelte';
import type { Notebook } from '$lib/types';
import { getActiveNotebooks, getAllNotebooks, getInbox } from '$lib/api/notebook.remote';

export class NotebookState {
	inbox = $state<{
		inbox: Notebook;
		id: string;
		count: number;
	}>();
	inboxID = $state<string>('');
	inboxCount = $state(0);
	totalNoteCount = $state(0);
	rootNotebooks = $state<Notebook[]>([]);
	flatNotebooks = $state<Notebook[]>([]);
	pinnedNotebooks = $state<Notebook[]>([]);
	activeNotebooks = $state<Notebook[]>([]);

	constructor() {
		this.load();
	}

	async load() {
		const allNotebooks = await getAllNotebooks();
		this.flatNotebooks = allNotebooks?.flatNotebooks ?? [];
		this.rootNotebooks = allNotebooks?.rootNotebooks ?? [];
		this.pinnedNotebooks = allNotebooks?.pinnedNotebooks ?? [];
		this.activeNotebooks = await getActiveNotebooks();
		this.inbox = await getInbox();
		this.inboxCount = this.inbox.count ?? 0;
		this.inboxID = this.inbox.id ?? '';
	}
}

const NOTEBOOK_KEY = Symbol('NOTEBOOK');

export function setNotebookState() {
	return setContext(NOTEBOOK_KEY, new NotebookState());
}

export function getNotebookState() {
	return getContext<ReturnType<typeof setNotebookState>>(NOTEBOOK_KEY);
}
