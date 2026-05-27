<script lang="ts">
	import { onMount } from 'svelte';

	import * as Dialog from '$lib/components/ui/dialog/index';

	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { getNotebookState, getTagState } from '$lib/db.svelte';
	import {
		getSearchState,
		SavedSearch,
		type SearchState,
		getSavedSearch
	} from '$lib/search.svelte';

	type Props = {
		isOpen: boolean;
		search: (customFilter: string) => void;
	};

	let { isOpen = $bindable(), search }: Props = $props();

	let searchState = $state<SearchState>();
	let savedSearch = $state<SavedSearch>();

	const notebookState = getNotebookState();
	const tagState = getTagState();

	const notebooks = $derived(notebookState.flatNotebooks);
	const tags = $derived(tagState.flatTags);

	let filterNotebookID = $state(searchState?.searchNotebookID || '');
	let filterTagIdArray = $state<string[]>([]);
	let filterExcludeTagIdArray = $state<string[]>([]);

	function submitForm() {
		if (!searchState || !savedSearch) return;
		savedSearch.term = searchState.searchInput;
		searchState.searchNotebookID = filterNotebookID;
		searchState.selectedTagIdArray = filterTagIdArray;
		searchState.selectedExcludeTagIdArray = filterExcludeTagIdArray;
		searchState.makeFilterQuery(searchState.searchInput);
		search(searchState.customFilter);
		savedSearch.customFilter = searchState.customFilter;
		isOpen = false;
	}

	onMount(() => {
		searchState = getSearchState();
		savedSearch = getSavedSearch();
	});
</script>

<Dialog.Root open={isOpen}>
	<Dialog.Content
		onCloseAutoFocus={(e) => {
			e.preventDefault();
			isOpen = false;
		}}
		class="max-h-full max-w-4xl scrollbar-thin overflow-y-auto"
	>
		<Dialog.Header>
			<Dialog.Title>Filter Search</Dialog.Title>
		</Dialog.Header>

		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-3">
				<legend class="fieldset-legend">Full Text Search</legend>
			</div>

			<input
				type="text"
				class="input col-span-8 col-start-4 w-full"
				placeholder="Search title and content..."
				bind:value={searchState.searchInput}
			/>

			<button
				onclick={() => {
					searchState.searchInput = '';
				}}
				class="btn col-span-1">Clear</button
			>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-3">
				<legend class="fieldset-legend">Notebook</legend>
			</div>

			<div class="col-span-8 w-full text-right">
				<SelectNotebook {notebooks} bind:selectedNotebookID={filterNotebookID} />
			</div>

			<button onclick={() => (filterNotebookID = '')} class="btn col-span-1">Clear</button>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags {tags} bind:selectedTagIdArray={filterTagIdArray} />
			</div>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Exclude Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags {tags} bind:selectedTagIdArray={filterExcludeTagIdArray} />
			</div>
		</div>

		<div class="flex justify-end gap-x-2">
			<button onclick={submitForm} class="btn btn-primary">Save</button>
			<button
				onclick={() => {
					isOpen = false;
				}}
				class="btn">Close</button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>
