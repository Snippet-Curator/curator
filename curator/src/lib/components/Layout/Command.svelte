<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';

	import {
		Import,
		Notebook as NotebookIcon,
		Settings,
		Tags,
		Trash2,
		WalletCards,
		Archive,
		Search,
		Newspaper
	} from 'lucide-svelte';

	import * as Command from '$lib/components/ui/command/index.js';

	import { getNotebookState, getTagState } from '$lib/db.svelte';

	const notebookState = getNotebookState();
	const tagState = getTagState();

	const inboxID = $derived(notebookState.inboxID);
	const notebooks = $derived(
		notebookState.flatNotebooks.filter((notebook) => notebook.name != 'Inbox')
	);
	const tags = $derived(tagState.flatTags);

	let isOpen = $state(false);

	const defaultNotebooks = [
		{
			name: 'Discover',
			icon: Newspaper,
			url: '#/discover'
		},
		{
			name: 'Search',
			icon: Search,
			url: '#/'
		},
		{
			name: 'Inbox',
			icon: NotebookIcon,
			url: `#/notebook/${inboxID}`
		},
		{
			name: 'Archive',
			icon: Archive,
			url: '#/archive'
		},
		{
			name: 'Trash',
			icon: Trash2,
			url: '#/trash'
		}
	];

	const otherPages = [
		{
			name: 'Organize',
			icon: WalletCards,
			url: '#/organize'
		},
		{
			name: 'Import',
			icon: Import,
			url: '#/import'
		},
		{
			name: 'Settings',
			icon: Settings,
			url: '#/settings'
		}
	];

	function customFilter(commandValue: string, search: string, commandKeywords?: string[]): number {
		return commandValue.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
	}

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'BUTTON':
			case 'DIV':
			case 'TRIX-EDITOR':
				return;
		}

		if (event.ctrlKey && event.key === 'l') {
			event.preventDefault();
			isOpen = true;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

<Command.Dialog filter={customFilter} bind:open={isOpen}>
	<Command.Input placeholder="Search notebooks or tags..." />

	<Command.List>
		<Command.Empty>No notebook or tag found.</Command.Empty>
		<Command.Group heading="Notebooks">
			{#each notebooks as notebook}
				<Command.Item
					class="motion-opacity-in-0 motion-duration-75"
					onSelect={() => {
						goto(`#/notebook/${notebook.id}`);
						isOpen = false;
					}}
					><NotebookIcon class="text-base-content/30" size={18} />{notebook.name}
				</Command.Item>
			{/each}
			{#each defaultNotebooks as notebook}
				{@const Icon = notebook.icon}
				<Command.Item
					onSelect={() => {
						goto(notebook.url);
						isOpen = false;
					}}
					><Icon class="text-base-content/30" size={18} />{notebook.name}
				</Command.Item>
			{/each}
		</Command.Group>
		<Command.Group heading="Tags">
			{#each tags as tag}
				<Command.Item
					onSelect={() => {
						goto(`#/tags/${tag.id}`);
						isOpen = false;
					}}
					><Tags class="text-base-content/30" size={18} />{tag.name}
				</Command.Item>
			{/each}
		</Command.Group>
		<Command.Group heading="Settings">
			{#each otherPages as page}
				{@const Icon = page.icon}
				<Command.Item
					onSelect={() => {
						goto(page.url);
						isOpen = false;
					}}
					><Icon class="text-base-content/30" size={18} />{page.name}
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
	<div class="gap-x-golden-md p-golden-md border-b-base-content/10 flex w-full border-b">
		<div class="grow"></div>
		<button
			onclick={() => {
				isOpen = false;
			}}
			class="btn">Cancel</button
		>
	</div>
</Command.Dialog>
