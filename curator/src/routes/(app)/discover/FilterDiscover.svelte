<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';

	import { getAllNotebooks } from '$lib/api/notebook.remote';
	import { getAllTags } from '$lib/api/tag.remote';
	import type { NoteQuery } from '$lib/types';
	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { tick } from 'svelte';

	type Props = {
		isOpen: boolean;
		query: NoteQuery;
		search: () => void;
	};

	let { isOpen = $bindable(), query = $bindable(), search }: Props = $props();

	const allNotebooks = $derived(await getAllNotebooks());
	const allTags = $derived(await getAllTags());

	const notebooks = $derived(allNotebooks?.flatNotebooks ?? []);
	const tags = $derived(allTags?.flatTags ?? []);

	let searchInput = $state(query.search ?? '');
	let searchNotebookID = $state(query.notebookID ?? '');
	let searchTagIdArray = $state<string[]>(query.tagIDs ?? []);
	let searchExcludeTagIdArray = $state<string[]>(query.excludedTagIDs ?? []);

	async function submitForm() {
		isOpen = false;
		await tick();
		query = {
			page: 1,
			search: searchInput ?? '',
			notebookID: searchNotebookID ?? '',
			tagIDs: searchTagIdArray,
			fullContent: query.fullContent ?? false,
			fullTextSearch: query.fullTextSearch ?? false,
			excludedTagIDs: searchExcludeTagIdArray,
			status: 'active',
			sort: query.sort ?? '-score'
		};
		search();
	}
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
			<Dialog.Title>Filter Discovery</Dialog.Title>
		</Dialog.Header>

		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-3">
				<legend class="fieldset-legend">Search Term</legend>
			</div>

			<input
				type="text"
				class="input col-span-8 col-start-4 w-full"
				placeholder="Search title..."
				bind:value={searchInput}
			/>

			<button
				onclick={() => {
					searchInput = '';
				}}
				class="btn col-span-1">Clear</button
			>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-3">
				<legend class="fieldset-legend">Notebook</legend>
			</div>

			<div class="col-span-8 w-full text-right">
				<SelectNotebook {notebooks} bind:selectedNotebookID={searchNotebookID} />
			</div>

			<button onclick={() => (searchNotebookID = '')} class="btn col-span-1">Clear</button>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags {tags} bind:selectedTagIdArray={searchTagIdArray} />
			</div>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Exclude Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags {tags} bind:selectedTagIdArray={searchExcludeTagIdArray} />
			</div>
		</div>

		<div class="flex justify-end gap-x-2">
			<button
				onclick={() => {
					isOpen = false;
				}}
				class="btn">Close</button
			>
			<button onclick={submitForm} class="btn btn-primary">Save</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
