<script lang="ts">
	import { page } from '$app/state';
	import { ScrollState } from 'runed';

	import { getMouseState, saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn, Delete } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';
	import type { NoteType } from '$lib/types';

	let isBulkEdit = $state(false);
	let isEmptyTrashOpen = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let scrollEl = $state<HTMLElement>();
	let initialLoading = $state<Promise<void>>();

	const noteType: NoteType = {
		type: 'trash',
		id: page.params.slug
	};

	setNotelistState('deleted', noteType);
	const notelistState = getNotelistState('deleted');
	const mouseState = getMouseState();

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	const savedPage = $derived(signalPageState.savedPages.get(page.url.pathname) ?? 1);

	const updatePage = async (newPage: number) => {
		scroll.scrollToTop();
		mouseState.isBusy = true;
		await notelistState.getDeleted(newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
		mouseState.isBusy = false;
	};

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

<div bind:this={scrollEl} class="mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	{#await initialLoading}
		<br />
	{:then}
		<Pagination
			currentPage={notelistState.notes.page}
			totalPages={notelistState.notes.totalPages}
			changePage={(newPage: number) => {
				if (mouseState.isBusy) return;
				updatePage(newPage);
			}}
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
</div>

<Delete
	bind:isOpen={isEmptyTrashOpen}
	name="Notes Permanently"
	action={() => {
		notelistState.emptyTrash();
		window.history.back();
	}}>these notes</Delete
>
