<script lang="ts">
	import { Pagination, NoteList, BulkToolbar } from '$lib/components/';
	import type { Snippet } from 'svelte';
	import { type NotelistState } from '$lib/db.svelte';
	import { type MouseState } from '$lib/utils.svelte';

	type Props = {
		scrollEl: HTMLElement;
		notelistState: NotelistState;
		mouseState: MouseState;
		scrollToTop: () => void;
		updatePage: (newPage: number) => Promise<void>;
		isBulkEdit: boolean;
		bulkToolbar: Snippet;
		selectedNotesID: string[];
	};

	let {
		scrollEl = $bindable(),
		notelistState,
		mouseState,
		scrollToTop,
		updatePage,
		bulkToolbar,
		isBulkEdit = false,
		selectedNotesID = $bindable()
	}: Props = $props();
</script>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	<Pagination
		currentPage={notelistState.notes.page}
		totalPages={notelistState.notes.totalPages}
		changePage={async (newPage: number) => {
			if (mouseState.isBusy) return;
			await updatePage(newPage);
			scrollToTop();
		}}
	/>

	{#if notelistState.notes.totalItems > 0}
		<NoteList
			update={() => updatePage(notelistState.clickedPage)}
			{isBulkEdit}
			bind:selectedNotesID
			notes={notelistState.notes}
		/>
	{:else}
		<br />
	{/if}
	{#if isBulkEdit}
		{@render bulkToolbar()}
	{/if}
</div>
