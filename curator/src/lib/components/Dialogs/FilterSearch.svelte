<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog/index';

	import { getAllNotebooks } from '$lib/api/notebook.remote';
	import { getAllTags } from '$lib/api/tag.remote';

	import { SelectTags, SelectNotebook } from '$lib/components/index';

	import type { NoteQuery } from '$lib/types';
	import { updateQueryParams } from '$lib/utils';

	type Props = {
		isOpen: boolean;
		query: NoteQuery;
	};

	let { isOpen = $bindable(), query }: Props = $props();

	const allNotebooks = $derived(await getAllNotebooks());
	const allTags = $derived(await getAllTags());
	const flatNotebooks = $derived(allNotebooks?.flatNotebooks ?? []);
	const flatTags = $derived(allTags?.flatTags ?? []);

	let searchInput = $derived(query.search ?? '');
	let selectedNotebookID = $state(query.notebookID ?? '');
	let selectTagIdArray = $state<string[]>(query.tagIDs ?? []);
	let selectExcludeTagIdArray = $state<string[]>(query.excludedTagIDs ?? []);

	function submitForm() {
		const newQuery = {
			page: 1,
			search: searchInput,
			notebookID: selectedNotebookID,
			tagIDs: selectTagIdArray,
			excludedTagIDs: selectExcludeTagIdArray
		};

		const url = updateQueryParams(new URL(window.location.href), newQuery);

		goto(url, {
			replaceState: true,
			keepFocus: true,
			noScroll: true
		});

		isOpen = false;
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
				<SelectNotebook notebooks={flatNotebooks} bind:selectedNotebookID />
			</div>

			<button onclick={() => (selectedNotebookID = '')} class="btn col-span-1">Clear</button>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags tags={flatTags} bind:selectedTagIdArray={selectTagIdArray} />
			</div>
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-start">
			<div class="col-span-3">
				<legend class="fieldset-legend">Exclude Tags</legend>
			</div>
			<div class="col-span-9 col-start-4 text-right">
				<SelectTags tags={flatTags} bind:selectedTagIdArray={selectExcludeTagIdArray} />
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
