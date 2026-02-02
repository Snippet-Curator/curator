<script lang="ts">
	import { page } from '$app/state';
	import { ScrollState } from 'runed';

	import { getMouseState, saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';
	import type { NoteType } from '$lib/types';

	let notebookID = $derived(page.params.slug);
	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let scrollEl = $state<HTMLElement>();

	const noteType: NoteType = {
		type: 'notebooks',
		id: page.params.slug
	};

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	setNotelistState(notebookID, noteType);
	const notelistState = getNotelistState(notebookID);
	const mouseState = getMouseState();

	const savedPage = $derived(signalPageState.savedPages.get(page.url.pathname) ?? 1);

	const updatePage = async (newPage: number) => {
		scroll.scrollToTop();
		mouseState.isBusy = true;
		notelistState.clickedPage = newPage;
		await notelistState.getByNotebook(notebookID, newPage);
		saveCurrentPage(newPage);
		mouseState.isBusy = false;
	};

	let initialLoading = $state<Promise<void>>();

	$effect(() => {
		// console.log('Slug changed:', page.params.slug);
		notelistState.notebookID = page.params.slug;
		initialLoading = updatePage(savedPage);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
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
			<BulkToolbar
				updatePage={() => {
					updatePage(notelistState.clickedPage);
				}}
				bind:isBulkEdit
				bind:selectedNotesID
				{notelistState}
			/>
		{/if}
	{/await}
</div>
