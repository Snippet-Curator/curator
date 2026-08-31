<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';
	import { Archive, Trash2 } from 'lucide-svelte';

	import { New, NotebookList, TagList, Pinned } from '$lib/components';
	import type { Notebook } from '$lib/types';

	import { getAllNotebooks, createOneNotebookbyName } from '$lib/api/notebook.remote';
	import { getAllTags, createOneTagbyName } from '$lib/api/tag.remote';
	import { toast } from 'svelte-sonner';

	const allNotebooks = $derived(await getAllNotebooks());
	const notebooks = $derived(allNotebooks?.rootNotebooks ?? []);
	const flatnotebooks = $derived(allNotebooks?.flatNotebooks ?? []);
	const allTags = $derived(await getAllTags());
	const tags = $derived(allTags?.rootTags ?? []);

	let isNewNotebookOpen = $state(false);
	let isNewTagOpen = $state(false);
</script>

{#snippet renderNotebook(notebook: Notebook, NotebookIcon)}
	<div class="flex w-full cursor-auto items-center justify-between px-2">
		<a
			href="/notebook/{notebook.id}"
			class="badge hover:badge-neutral flex items-center text-nowrap transition-colors"
			><NotebookIcon size={18} />{notebook.name}
		</a>
		<span class="text-base-content/60">{notebook.note_count}</span>
	</div>
{/snippet}

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="p-golden-xl mx-auto max-w-5xl">
		<div class="flex items-center px-3">
			<h1 class="grow">Pinned</h1>
		</div>

		<div class="card p-golden-md">
			<Pinned
				pinnedNotebooks={allNotebooks?.pinnedNotebooks ?? []}
				pinnedTags={allTags?.pinnedTags ?? []}
			/>
		</div>

		<div class="divider"></div>

		<div class="flex items-center px-3">
			<h1 class="grow">Notebooks</h1>
			<button
				onclick={() => {
					isNewNotebookOpen = true;
				}}
				class="btn btn-sm md:btn-md">New</button
			>
		</div>

		<div class="card">
			<ul class="menu w-full">
				<NotebookList allowEdit={true} {notebooks} />

				<li class="mr-4 ml-0 pl-0"><a href="/archive"><Archive size={18} />Archive</a></li>

				<li class="mr-4 ml-0 pl-0"><a href="/trash"><Trash2 size={18} />Trash</a></li>
			</ul>
		</div>

		<div class="divider"></div>

		<div class="flex items-center px-3">
			<h1 class="grow">Tags</h1>
			<button
				onclick={() => {
					isNewTagOpen = true;
				}}
				class="btn md:btn-md">New</button
			>
		</div>

		<ul class="menu w-full">
			<TagList allowEdit={true} {tags} />
		</ul>
	</div>
</div>
<div class="mb-20"></div>

<New
	bind:isOpen={isNewTagOpen}
	newType="Tag"
	action={async (newTagName) => {
		const promise = createOneTagbyName({ newName: newTagName })

		toast.promise(promise, {
			loading: `Creating ${newTagName}...`,
			success: `Created ${newTagName}.`,
			error: "Failed to create tag."
		})  

		await promise 
		await getAllTags().refresh()
	}}
/>

<New
	bind:isOpen={isNewNotebookOpen}
	newType="Notebook"
	action={async (newNotebookName) => {
		const promise = createOneNotebookbyName({ newName: newNotebookName })

		toast.promise(promise, {
			loading: `Creating ${newNotebookName}...`,
			success: `Created ${newNotebookName}.`,
			error: "Failed to create notebook."
		})  

		await promise 
		await getAllNotebooks().refresh()
	}}
/>
