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
	import type { NoteType } from '$lib/types';
	import { BulkToolbar, BulkEditBtn, NoteListContainer } from '$lib/components/';
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
	const scrollPosition = $derived<number>(
		signalPageState.scrollPositions.get(page.url.pathname) ?? 0
	);

	const updatePage = async (newPage: number) => {
		mouseState.isBusy = true;
		await notelistState.getByTag(tagID, newPage);
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
		mouseState.isBusy = false;
	};

	$effect(async () => {
		// console.log('Slug changed:', page.params.slug);
		// notelistState.notebookID = notebookID;
		notelistState.tagID = page.params.slug;
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
	scrollToTop={scroll.scrollToTop}
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
