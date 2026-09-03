<script lang="ts">
	import { ScrollState } from 'runed';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import * as Topbar from '$lib/components/Topbar/index';
	import { getNotes } from '$lib/api/note.remote';
	import { saveScrollPosition, signalPageState } from '$lib/state/ui.svelte';

	import {
		Pagination,
		BulkEditBtn,
		NoteList,
		BulkToolbar,
		Search,
		FilterSearch
	} from '$lib/components';
	import { getQueryFromURL } from '$lib/utils';

	const scroll = new ScrollState({
		element: () => scrollEl
	});

	let query = $derived(getQueryFromURL(page.url));

	let result = $derived(await getNotes(query));
	let notes = $derived(result.items);

	let totalPages = $derived(result.totalPages);
	let totalItems = $derived(result.totalItems);
	let searchInput = $state<string>(query.search ?? '');

	let scrollEl = $state<HTMLElement>();
	let isBulkEdit = $state(false);
	let isFilterSearch = $state(false);
	let selectedNotesID = $state<string[]>([]);

	onMount(async () => {
		const scrollPosition = await signalPageState.scrollPositions.get(page.url.pathname);

		scroll.scrollTo(0, scrollPosition);
	});

	$effect(() => {
		if (scroll.y === 0) return;
		saveScrollPosition(scroll.y);
	});
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>

	<Topbar.Filter bind:isOpen={isFilterSearch} />
	<Search bind:searchInput />

	<Topbar.Sort scrollToTop={() => scroll.scrollToTop()} />
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	<Pagination currentPage={query.page ?? 0} {totalPages} scrollToTop={() => scroll.scrollToTop()} />

	{#if totalItems && totalItems > 0}
		<NoteList
			update={async () => await getNotes(query).refresh()}
			{isBulkEdit}
			bind:selectedNotesID
			{notes}
		/>
	{:else}
		<br />
	{/if}

	{#if isBulkEdit}
		<BulkToolbar
			update={async () => {
				await getNotes(query).refresh();
			}}
			{notes}
			bind:isBulkEdit
			bind:selectedNotesID
		/>
	{/if}
</div>

<FilterSearch bind:isOpen={isFilterSearch} {query} />
