<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { getNotelistState, setNotelistState } from '$lib/db.svelte';
	import {
		Pagination,
		NoteList,
		Search,
		BulkToolbar,
		BulkEditBtn,
		Blank,
		NoteLoading,
		FilterSearch
	} from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';
	import { getMouseState, saveCurrentPage, signalPageState } from '$lib/utils.svelte';
	import { getSearchState, setSearchState, type SearchState } from '$lib/search.svelte';
	import type { NoteType } from '$lib/types';
	import { ScrollState } from 'runed';

	let notebookID = 'homepage';
	let searchInput = $state('');
	let isBulkEdit = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let isFilterSearch = $state(false);
	let searchState = $state<SearchState>();
	let scrollEl = $state<HTMLElement>();

	let initialLoading = $state();

	const noteType: NoteType = {
		type: 'default'
	};

	setNotelistState(notebookID, noteType);
	setSearchState();

	const notelistState = getNotelistState(notebookID);
	const mouseState = getMouseState();

	const savedPage = $derived<number>(signalPageState.savedPages.get(page.url.pathname) ?? 1);

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	const updatePage = async (newPage: number) => {
		scroll.scrollToTop();

		// saves current clicked page number
		saveCurrentPage(newPage);
		notelistState.clickedPage = newPage;
		if (!searchState) return;

		// get default page if no filters
		mouseState.isBusy = true;
		if (
			!searchState.searchInput &&
			!searchState.searchNotebookID &&
			searchState.selectedTagIdArray.length == 0
		) {
			searchState.searchTerm = '';
			searchState.resetCustomFilter();
			await notelistState.getByPage(newPage);
			mouseState.isBusy = false;
			return;
		}

		// run same filter if search term is same
		if (searchState.searchTerm === searchState.searchInput) {
			await notelistState.getByFilter(searchState.customFilter, newPage);
			mouseState.isBusy = false;
			return;
		}

		// uses new search filter
		await searchState.getSearchTags(searchInput.trim());
		await searchState.getSearchNotebook(searchInput.trim());
		searchState.makeSearchQuery(searchState.searchInput);
		await notelistState.getByFilter(searchState.customFilter, newPage);
		searchState.searchTerm = searchState.searchInput;
		mouseState.isBusy = false;
	};

	onMount(async () => {
		searchState = getSearchState();

		if (searchState.searchTerm) {
			searchState.searchInput = searchState.searchTerm;
		}
		initialLoading = updatePage(savedPage);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	{#if searchState}
		<Search
			bind:searchInput={searchState.searchInput}
			searchNotes={() => updatePage(1)}
			clearNote={() => {
				searchState.searchTerm = '';
				searchState.resetCustomFilter();
				updatePage(1);
			}}
		/>
	{:else}{/if}
	<Topbar.Filter bind:isOpen={isFilterSearch} />
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	{#await initialLoading}
		<NoteLoading />
	{:then}
		<Pagination
			currentPage={notelistState.notes.page}
			totalPages={notelistState.notes.totalPages}
			changePage={(newPage: number) => {
				if (mouseState.isBusy) return;
				updatePage(newPage);
			}}
		/>

		{#if notelistState.notes && notelistState.notes.totalItems > 0}
			<NoteList
				{isBulkEdit}
				update={() => updatePage(notelistState.clickedPage)}
				bind:selectedNotesID
				notes={notelistState.notes}
			/>
		{:else if searchState?.searchInput || searchState?.searchNotebookID || searchState?.selectedTagIdArray.length > 0}
			<div class="grid h-full place-items-center">No Notes Found.</div>
		{:else}
			<Blank />
			<!-- <NoteLoading /> -->
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

<FilterSearch
	bind:isOpen={isFilterSearch}
	search={async (customFilters) => await notelistState.getByFilter(customFilters, 1)}
/>
