<script lang="ts">
	import { page } from '$app/state';

	import * as ContextMenu from '$lib/components/ui/context-menu/index';

	import type { Notebook } from '$lib/types';
	import { ChangeParent, Delete, Rename, New } from '$lib/components/';
	import NotebookList from './NotebookList.svelte';
	import { getNotebookState } from '$lib/db.svelte';

	type Props = {
		notebooks: Notebook[];
		allowEdit?: boolean;
	};

	let { notebooks, allowEdit = false }: Props = $props();

	const notebookState = getNotebookState();

	let isEditOpen = $state(false);
	let isDeleteOpen = $state(false);
	let isChangeParentOpen = $state(false);
	let isNewNotebookOpen = $state(false);
	let selectedNotebook = $state<Notebook>();
	let flatNotebooks = $derived(notebookState.flatNotebooks);
</script>

{#snippet renderNotebook(notebook: Notebook)}
	<div class=" flex w-full items-center justify-between">
		<a
			href="/notebook/{notebook.id}"
			class="w-full items-center gap-x-2 px-3 py-1 font-[450] text-nowrap"
		>
			{notebook.name}
		</a>
		<span class="text-right">{notebook.note_count}</span>
	</div>
{/snippet}

{#snippet renderNotebookSection(notebook: Notebook)}
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="{page.url.pathname == `/notebook/${notebook.id}`
				? ' bg-neutral text-neutral-content'
				: ''} my-1 flex cursor-auto items-center justify-between rounded-md p-0 pr-2"
		>
			{@render renderNotebook(notebook)}
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				onSelect={() => {
					notebookState.pin(notebook.id);
				}}>Pin</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedNotebook = notebook;
					isEditOpen = true;
				}}>Rename</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedNotebook = notebook;
					isChangeParentOpen = true;
				}}>Change Parent</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedNotebook = notebook;
					isDeleteOpen = true;
				}}>Delete</ContextMenu.Item
			>
			<ContextMenu.Separator />
			<ContextMenu.Item
				onSelect={() => {
					selectedNotebook = notebook;
					isNewNotebookOpen = true;
				}}>New</ContextMenu.Item
			>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}

<svelte:boundary>
	{#each notebooks as notebook}
		{#if notebook.name != 'Inbox'}
			<li class="group mr-4">
				{#if notebook.children?.length > 0}
					<details class="w-full">
						<summary class="flex w-full py-0 pl-0">
							<div class="grow">
								{@render renderNotebookSection(notebook)}
							</div>
						</summary>

						{#if notebook.children}
							<ul>
								<NotebookList {allowEdit} notebooks={notebook.children} />
							</ul>
						{/if}
					</details>
				{:else}
					{@render renderNotebookSection(notebook)}
				{/if}
			</li>
		{/if}
	{/each}

	{#snippet failed()}
		NotebookList Failed to Render
	{/snippet}
</svelte:boundary>

{#if selectedNotebook}
	<Rename
		bind:isOpen={isEditOpen}
		renameType="Notebook"
		currentName={selectedNotebook.name}
		action={(newName) => notebookState.updateOnebyName(selectedNotebook.id, newName)}
	/>

	<Delete
		bind:isOpen={isDeleteOpen}
		name="Notebook"
		action={() => notebookState.delete(selectedNotebook.id)}>this notebook?</Delete
	>

	<ChangeParent
		bind:isOpen={isChangeParentOpen}
		type="notebook"
		fullList={flatNotebooks}
		currentItemID={selectedNotebook?.id}
		clear={() => notebookState.updateOnebyParent(selectedNotebook?.id, '')}
		action={(selectedParentNotebookID) =>
			notebookState.updateOnebyParent(selectedNotebook?.id, selectedParentNotebookID)}
	/>

	<New
		bind:isOpen={isNewNotebookOpen}
		newType="Notebook"
		action={(newNotebookName) =>
			notebookState.createOnebyName(newNotebookName, selectedNotebook.id)}
	/>
{/if}
