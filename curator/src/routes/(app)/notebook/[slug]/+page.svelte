<script lang="ts">
	import { page } from '$app/state';
	import { ScrollState } from 'runed';

	import {
		getMouseState,
		saveCurrentPage,
		signalPageState,
		saveScrollPosition
	} from '$lib/utils.svelte';
	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import { BulkEditBtn, NoteListContainer, BulkToolbar } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';
	import type { NoteType } from '$lib/types';

	let notebookID = $derived(page.params.slug);
	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let scrollEl = $state<HTMLElement>();

	let initialLoading = $state();

	const noteType: NoteType = {
		type: 'notebooks',
		id: page.params.slug
	};

	setNotelistState(notebookID, noteType);
	const notelistState = getNotelistState(notebookID);
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
		notelistState.clickedPage = newPage;
		await notelistState.getByNotebook(notebookID, newPage);
		saveCurrentPage(newPage);
		mouseState.isBusy = false;
	};

	$effect(async () => {
		// console.log('Slug changed:', page.params.slug);
		notelistState.notebookID = page.params.slug;
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

<NoteListContainer
	bind:scrollEl
	{notelistState}
	{mouseState}
	{updatePage}
	{isBulkEdit}
	{selectedNotesID}
>
	{#snippet bulkToolbar()}
		<BulkToolbar
			updatePage={() => {
				updatePage(notelistState.clickedPage);
			}}
			bind:isBulkEdit
			bind:selectedNotesID
			{notelistState}
		/>
	{/snippet}
</NoteListContainer>
