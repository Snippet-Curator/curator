<script lang="ts">
	import { ScrollState } from 'runed';
	import { page } from '$app/state';

	import { getNotes, emptyTrash } from '$lib/api/note.remote';

	import {
		Pagination,
		BulkEditBtn,
		NoteList,
		BulkToolbar,
		Search,
		FilterSearch,
		Delete
	} from '$lib/components';
	import * as Topbar from '$lib/components/Topbar/index';
	import { getQueryFromURL } from '$lib/utils';
	import { type NoteQuery } from '$lib/types';
	import { toast } from 'svelte-sonner';

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	let query = $derived(getQueryFromURL(page.url));
	const newQuery = $derived<NoteQuery>({
		page: query.page ?? 1,
		search: query.search ?? '',
		notebookID: query.notebookID ?? '',
		tagIDs: [page.params.slug ?? ''],
		excludedTagIDs: query.excludedTagIDs ?? [],
		status: 'deleted',
		sort: '-created',
		fullContent: query.fullContent ?? false,
		fullTextSearch: query.fullTextSearch ?? false
	});

	let result = $derived(await getNotes(newQuery));
	let notes = $derived(result.items);

	let totalPages = $derived(result.totalPages);
	let totalItems = $derived(result.totalItems);
	let searchInput = $state<string>(query.search ?? '');

	let scrollEl = $state<HTMLElement>();
	let isBulkEdit = $state(false);
	let isFilterSearch = $state(false);
	let selectedNotesID = $state<string[]>([]);
	let isEmptyTrashOpen = $state(false);
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<Search bind:searchInput />
	{#if notes && notes.length > 0}
		<Topbar.Empty bind:isOpen={isEmptyTrashOpen} />
	{/if}
	<Topbar.Sort scrollToTop={() => scroll.scrollToTop()} />
	<Topbar.Filter bind:isOpen={isFilterSearch} />
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	<Pagination currentPage={query.page ?? 0} {totalPages} scrollToTop={() => scroll.scrollToTop()} />

	{#if totalItems && totalItems > 0}
		<NoteList
			update={async () => await getNotes(newQuery).refresh()}
			{isBulkEdit}
			bind:selectedNotesID
			{notes}
		/>
	{:else}
		<br />
	{/if}

	{#if isBulkEdit}
		<BulkToolbar
			update={async () => await getNotes(newQuery).refresh()}
			{notes}
			isTrash
			bind:isBulkEdit
			bind:selectedNotesID
		/>
	{/if}
</div>

<FilterSearch bind:isOpen={isFilterSearch} bind:query />

<Delete
	bind:isOpen={isEmptyTrashOpen}
	name="Notes Permanently"
	action={async () => {
		const promise = emptyTrash();

		toast.promise(promise, {
			loading: `Emptying trash...`,
			success: `Deleted all note.`,
			error: 'Failed to empty trash.'
		});

		await promise;

		window.history.back();
	}}>these notes</Delete
>
