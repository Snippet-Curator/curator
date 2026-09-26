import { getContext, setContext } from 'svelte';
import {
	getActiveNotebooks,
	getAllNotebooks,
	getInbox,
	getNotebookCounts,
	getTotalNotecount
} from '$lib/api/notebook.remote';

export class NotebookState {
	notebookQuery = getAllNotebooks();
	rootNotebooks = $derived(this.notebookQuery.current?.rootNotebooks);
	flatNotebooks = $derived(this.notebookQuery.current?.flatNotebooks);
	pinnedNotebooks = $derived(this.notebookQuery.current?.pinnedNotebooks);

	notebookCountsQuery = getNotebookCounts();
	notebookCounts = $derived(
		Object.fromEntries((this.notebookCountsQuery.current ?? []).map((c) => [c.id, c.note_count]))
	);
	notesCountQuery = getTotalNotecount();
	totalNoteCount = $derived(this.notesCountQuery.current);

	activeNotebooks = $derived(getActiveNotebooks());

	inboxQuery = getInbox();
	inboxID = $derived(this.inboxQuery.current?.id ?? '');
	inboxCount = $derived(this.inboxQuery.current?.count ?? 0);

	async refresh() {
		await this.notebookQuery.refresh();
		await this.inboxQuery.refresh();
	}

	async refreshCounts() {
		await this.inboxQuery.refresh();
		await this.notebookCountsQuery.refresh();
		await this.notesCountQuery.refresh();
	}

	getNotebookCount(notebookId: string) {
		return this.notebookCounts[notebookId] ?? 0;
	}
}

const NOTEBOOK_KEY = Symbol('NOTEBOOK');

export function setNotebookState() {
	return setContext(NOTEBOOK_KEY, new NotebookState());
}

export function getNotebookState() {
	return getContext<ReturnType<typeof setNotebookState>>(NOTEBOOK_KEY);
}
