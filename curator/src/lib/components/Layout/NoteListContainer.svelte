<script lang="ts">
	import { Pagination, NoteList, BulkToolbar } from '$lib/components/';
	import { type NotelistState } from '$lib/db.svelte';
	import { type MouseState } from '$lib/utils.svelte';

	type Props = {
		scrollEl: HTMLElement;
		notelistState: NotelistState;
		mouseState: MouseState;
		updatePage: (newPage: number) => void;
		isBulkEdit: boolean;
		bulkToolbar: HTMLDivElement;
		selectedNotesID: string[];
	};

	let {
		scrollEl = $bindable(),
		notelistState,
		mouseState,
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
		changePage={(newPage: number) => {
			if (mouseState.isBusy) return;
			updatePage(newPage);
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
