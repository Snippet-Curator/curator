<script lang="ts">
	import { page } from '$app/state';

	import * as ContextMenu from '$lib/components/ui/context-menu/index';

	import type { Notebook } from '$lib/types';
	import { ChangeParent, Delete, Rename, New } from '$lib/components/';
	import NotebookList from './NotebookList.svelte';
	import {
		createOneNotebookbyName,
		deleteNotebook,
		getInbox,
		pinNotebook,
		updateOneNotebookByName,
		updateOneNotebookByParent
	} from '$lib/api/notebook.remote';

	type Props = {
		notebooks: Notebook[];
		allowEdit?: boolean;
	};

	let { notebooks, allowEdit = false }: Props = $props();

	let isEditOpen = $state(false);
	let isDeleteOpen = $state(false);
	let isChangeParentOpen = $state(false);
	let isNewNotebookOpen = $state(false);
	let selectedNotebook = $state<Notebook>();
	let inbox = $derived(await getInbox());
	let inboxID = $derived(inbox?.id);
</script>

{#snippet renderNotebook(notebook: Notebook)}
	<div class="group flex w-full items-center justify-between">
		<a
			href="/notebook/{notebook.id}"
			class="w-full items-center gap-x-2 px-3 py-1 font-[450] text-nowrap"
		>
			{notebook.name}
		</a>
		<span class="text-base-content/50 group-hover:text-base-content/70 text-right"
			>{notebook.note_count > 0 ? notebook.note_count : ''}</span
		>
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
					pinNotebook(notebook.id);
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
		action={(newName) => updateOneNotebookByName({ recordID: selectedNotebook.id, newName })}
	/>

	<Delete
		bind:isOpen={isDeleteOpen}
		name="Notebook"
		action={() => deleteNotebook({ recordID: selectedNotebook.id, inboxID })}>this notebook?</Delete
	>

	<ChangeParent
		bind:isOpen={isChangeParentOpen}
		type="notebook"
		fullList={notebooks}
		currentItemID={selectedNotebook?.id}
		clear={() => updateOneNotebookByParent({ recordID: selectedNotebook?.id, parentID: '' })}
		action={(parentID) =>
			updateOneNotebookByParent({
				recordID: selectedNotebook?.id,
				parentID
			})}
	/>

	<New
		bind:isOpen={isNewNotebookOpen}
		newType="Notebook"
		action={(newName) =>
			createOneNotebookbyName({ newName, parentNotebookID: selectedNotebook.id })}
	/>
{/if}
