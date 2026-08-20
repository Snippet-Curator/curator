<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { page } from '$app/state';

	import { getAllNotebooks } from '$lib/api/notebook.remote';
	import { getAllTags } from '$lib/api/tag.remote';

	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { goto } from '$app/navigation';
	import type { NoteQuery } from '$lib/types';

	type Props = {
		isOpen: boolean;
		query: NoteQuery;
	};

	let { isOpen = $bindable(), query }: Props = $props();

	let allNotebooks = $derived(await getAllNotebooks());
	let allTags = $derived(await getAllTags());
	let flatNotebooks = $derived(allNotebooks?.flatNotebooks ?? []);
	let flatTags = $derived(allTags?.flatTags ?? []);

	let searchInput = $state(query.search ?? '');
	let selectedNotebookID = $state(query.notebookID ?? '');
	let selectTagIdArray = $state<string[]>(query.tagIDs ?? []);
	let selectExcludeTagIdArray = $state<string[]>(query.excludedTagIDs ?? []);

	function updateQueryParams(url: URL, updates: Record<string, string | string[] | null>) {
		for (const [key, value] of Object.entries(updates)) {
			url.searchParams.delete(key);

			if (value == null) continue;

			if (Array.isArray(value)) {
				for (const item of value) {
					url.searchParams.append(key, item);
				}
			} else {
				url.searchParams.set(key, value);
			}
		}

		return url;
	}

	function submitForm() {
		const url = new URL(page.url);

		const finalURL = updateQueryParams(url, {
			page: '1',
			search: searchInput,
			notebookID: selectedNotebookID,
			tagIDs: selectTagIdArray,
			excludedTagIDs: selectExcludeTagIdArray
		});

		goto(finalURL);

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
