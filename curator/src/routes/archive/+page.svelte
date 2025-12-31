<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	import { saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState, type NoteType } from '$lib/db.svelte';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn, Delete, Blank } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';

	import { page } from '$app/state';

	let isBulkEdit = $state(false);
	let isEmptyTrashOpen = $state(false);
	let selectedNotesID = $state<string[]>([]);

	const noteType: NoteType = {
		type: 'archive',
		id: page.params.slug
	};

	setNotelistState('archived', noteType);
	const notelistState = getNotelistState('archived');

	const savedPage = $derived(signalPageState.savedPages.get(page.url.hash) ?? 1);

	const updatePage = async (newPage: number) => {
		await notelistState.getArchived(newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
	};

	let initialLoading = $state<Promise<void>>();

	$effect(() => {
		// console.log('Slug changed:', page.params.slug);
		// notelistState.notebookID = notebookID;
		initialLoading = updatePage(savedPage);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<ScrollArea class="mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	{#await initialLoading}
		<br />
	{:then}
		<Pagination
			currentPage={notelistState.notes.page}
			totalPages={notelistState.notes.totalPages}
			changePage={(newPage: number) => updatePage(newPage)}
		/>
		{#if isBulkEdit}
			<BulkToolbar
				updatePage={() => {
					updatePage(notelistState.clickedPage);
				}}
				isArchive
				bind:isBulkEdit
				bind:selectedNotesID
				{notelistState}
			/>
		{/if}
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
	{/await}
</ScrollArea>
