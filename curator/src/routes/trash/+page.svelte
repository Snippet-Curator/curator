<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	import { saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState, type NoteType } from '$lib/db.svelte';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn, Delete } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';

	import { page } from '$app/state';

	let isBulkEdit = $state(false);
	let isEmptyTrashOpen = $state(false);
	let selectedNotesID = $state<string[]>([]);

	const noteType: NoteType = {
		type: 'trash',
		id: page.params.slug
	};

	setNotelistState('deleted', noteType);
	const notelistState = getNotelistState('deleted');

	const savedPage = $derived(signalPageState.savedPages.get(page.url.hash) ?? 1);

	const updatePage = async (newPage: number) => {
		await notelistState.getDeleted(newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
	};

	let initialLoading = $state<Promise<void>>();

	$effect(() => {
		initialLoading = updatePage(savedPage);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
	<Topbar.Empty bind:isOpen={isEmptyTrashOpen} />
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
				isTrash
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

<Delete
	bind:isOpen={isEmptyTrashOpen}
	name="Notes Permanently"
	action={() => {
		notelistState.emptyTrash();
		window.history.back();
	}}>these notes</Delete
>
