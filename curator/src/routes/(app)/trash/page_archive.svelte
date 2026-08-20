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
	import { BulkToolbar, BulkEditBtn, Delete, NoteListContainer } from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';
	import type { NoteType } from '$lib/types';

	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let isEmptyTrashOpen = $state(false);
	let initialLoading = $state();
	let scrollEl = $state<HTMLElement>();

	const noteType: NoteType = {
		type: 'trash',
		id: page.params.slug
	};

	setNotelistState('deleted', noteType);
	const notelistState = getNotelistState('deleted');
	const mouseState = getMouseState();

	const savedPage = $derived(signalPageState.savedPages.get(page.url.pathname) ?? 1);
	const scrollPosition = $derived<number>(
		signalPageState.scrollPositions.get(page.url.pathname) ?? 0
	);

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	const updatePage = async (newPage: number) => {
		mouseState.isBusy = true;
		await notelistState.getDeleted(newPage);
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
	<Topbar.Empty bind:isOpen={isEmptyTrashOpen} />
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<NoteListContainer
	bind:scrollEl
	{notelistState}
	{mouseState}
	{updatePage}
	scrollToTop={scroll.scrollToTop}
	{isBulkEdit}
	{selectedNotesID}
>
	{#snippet bulkToolbar()}
		<BulkToolbar
			updatePage={() => {
				updatePage(notelistState.clickedPage);
			}}
			isTrash
			bind:isBulkEdit
			bind:selectedNotesID
			{notelistState}
		/>
	{/snippet}
</NoteListContainer>

<Delete
	bind:isOpen={isEmptyTrashOpen}
	name="Notes Permanently"
	action={() => {
		notelistState.emptyTrash();
		window.history.back();
	}}>these notes</Delete
>
