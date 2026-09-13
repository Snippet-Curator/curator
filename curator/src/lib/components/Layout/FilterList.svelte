<script lang="ts">
	import { page } from '$app/state';

	import * as ContextMenu from '$lib/components/ui/context-menu/index';

	import type { Filter } from '$lib/types';
	import { Delete, EditFilter } from '$lib/components/';
	import { deleteFilter, updateFilter } from '$lib/api/filter.remote';
	import { toast } from 'svelte-sonner';
	import { getFilterState } from '$lib/state/filter.svelte';

	const filterState = getFilterState();
	const filters = $derived(filterState.filters);

	let isEditOpen = $state(false);
	let isDeleteOpen = $state(false);
	let selectedFilter = $state<Filter>();
</script>

{#snippet renderFilter(filter: Filter)}
	<div class="group flex w-full items-center justify-between">
		<a
			href="/?{filter.query_string}"
			class="w-full items-center gap-x-2 px-3 py-1 font-[450] text-nowrap"
		>
			{filter.name}
		</a>
	</div>
{/snippet}

{#snippet renderNotebookSection(filter: Filter)}
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="{page.url.pathname == `/?${filter.query_string}`
				? ' bg-neutral text-neutral-content'
				: ''} my-1 flex cursor-auto items-center justify-between rounded-md p-0 pr-2"
		>
			{@render renderFilter(filter)}
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				onSelect={() => {
					selectedFilter = filter;
					isEditOpen = true;
				}}>Edit</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedFilter = filter;
					isDeleteOpen = true;
				}}>Delete</ContextMenu.Item
			>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}

<svelte:boundary>
	{#each filters as filter}
		<li class="group mr-4">
			{@render renderNotebookSection(filter)}
		</li>
	{/each}

	{#snippet failed()}
		NotebookList Failed to Render
	{/snippet}
</svelte:boundary>

{#if selectedFilter}
	<EditFilter
		bind:isOpen={isEditOpen}
		currentName={selectedFilter.name}
		currentQuery={selectedFilter.query_string}
		update={async (newName, newQuery) => {
			if (!selectedFilter) return;
			const promise = updateFilter({
				filterID: selectedFilter.id,
				updates: {
					name: newName,
					query_string: newQuery
				}
			});

			toast.promise(promise, {
				loading: `Updating ${selectedFilter.name}...`,
				success: `Updated ${selectedFilter.name}.`,
				error: 'Failed to update filter.'
			});

			await promise;
			await filterState.refresh();
		}}
	/>

	<Delete
		bind:isOpen={isDeleteOpen}
		name="Notebook"
		action={async () => {
			if (!selectedFilter) return;
			const promise = deleteFilter(selectedFilter.id);

			toast.promise(promise, {
				loading: `Deleting ${selectedFilter.name}...`,
				success: `Deleted ${selectedFilter.name}.`,
				error: 'Failed to delete filter.'
			});

			await promise;
			await filterState.refresh();
		}}>this filter?</Delete
	>
{/if}
