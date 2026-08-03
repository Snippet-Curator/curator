<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { ScrollState } from 'runed';

	import {
		getMouseState,
		saveCurrentPage,
		signalPageState,
		saveScrollPosition
	} from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import { Pagination, NoteList, BulkToolbar, BulkEditBtn } from '$lib/components/';
	import type { NoteType } from '$lib/types';
	import * as Topbar from '$lib/components/Topbar/index';

	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let initialLoading = $state();
	let scrollEl = $state<HTMLElement>();

	const noteType: NoteType = {
		type: 'archive',
		id: page.params.slug
	};

	setNotelistState('archived', noteType);
	const notelistState = getNotelistState('archived');
	const mouseState = getMouseState();

	const savedPage = $derived(signalPageState.savedPages.get(page.url.pathname) ?? 1);
	// gets saved scroll position from signal
	const scrollPosition = $derived<number>(
		signalPageState.scrollPositions.get(page.url.pathname) ?? 0
	);

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	const updatePage = async (newPage: number) => {
		mouseState.isBusy = true;
		await notelistState.getArchived(newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
		mouseState.isBusy = false;
	};

	onMount(async () => {
		// console.log('Slug changed:', page.params.slug);
		// notelistState.notebookID = notebookID;
		initialLoading = await updatePage(savedPage);
		scroll.scrollTo(0, scrollPosition);
	});

	$effect(() => {
		if (scroll.y === 0) return;
		saveScrollPosition(scroll.y);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	{#await initialLoading}
		<br />
	{:then}
		<Pagination
			currentPage={notelistState.notes.page}
			totalPages={notelistState.notes.totalPages}
			changePage={async (newPage: number) => {
				if (mouseState.isBusy) return;
				await updatePage(newPage);
				scroll.scrollToTop();
			}}
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
</div>
