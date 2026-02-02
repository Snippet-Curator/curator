<script lang="ts">
	import { page } from '$app/state';
	import { ScrollState } from 'runed';

	import { getMouseState, saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import type { NoteType } from '$lib/types';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';

	let initialLoading = $state();
	let tagID = $derived(page.params.slug);
	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let scrollEl = $state<HTMLElement>();

	const noteType: NoteType = {
		type: 'tags',
		id: page.params.slug
	};

	setNotelistState(tagID, noteType);
	const notelistState = getNotelistState(tagID);
	const mouseState = getMouseState();

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	const savedPage = $derived(signalPageState.savedPages.get(page.url.pathname));

	const updatePage = async (newPage: number) => {
		scroll.scrollToTop();
		mouseState.isBusy = true;
		await notelistState.getByTag(tagID, newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
		mouseState.isBusy = false;
	};

	$effect(() => {
		// console.log('Slug changed:', page.params.slug);
		notelistState.tagID = page.params.slug;
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
