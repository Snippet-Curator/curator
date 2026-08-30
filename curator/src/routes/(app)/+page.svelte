<script lang="ts">
	import { ScrollState } from 'runed';
	import { page } from '$app/state';

	import * as Topbar from '$lib/components/Topbar/index';
	import { getNotes } from '$lib/api/note.remote';

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

	let totalPages = $derived(result?.totalPages ?? 0);
	let totalItems = $derived(result?.totalItems ?? 0);
	let searchInput = $state<string>(query.search ?? '');

	let scrollEl = $state<HTMLElement>();
	let isBulkEdit = $state(false);
	let isFilterSearch = $state(false);
	let selectedNotesID = $state<string[]>([]);
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>

	<Search bind:searchInput />

	<Topbar.Filter bind:isOpen={isFilterSearch} />
	<BulkEditBtn bind:isBulkEdit bind:selectedNotesID />
</Topbar.Root>

<div bind:this={scrollEl} class="relative mb-20 h-[calc(100vh-60px)] overflow-y-auto">
	<Pagination currentPage={query.page ?? 0} {totalPages} scrollToTop={() => scroll.scrollToTop()} />

	{#if totalItems && totalItems > 0}
		<NoteList
			update={async () => await getNotes(query).refresh()}
			{isBulkEdit}
			bind:selectedNotesID
			notes={result}
		/>
	{:else}
		<br />
	{/if}

	{#if isBulkEdit}
		<BulkToolbar
			update={async () => {
				await getNotes(query).refresh();
			}}
			notes={result}
			bind:isBulkEdit
			bind:selectedNotesID
		/>
	{/if}
</div>

<FilterSearch bind:isOpen={isFilterSearch} bind:query />
