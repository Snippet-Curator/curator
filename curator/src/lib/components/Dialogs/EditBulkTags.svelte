<script lang="ts">
	import { onMount } from 'svelte';

	import * as Command from '$lib/components/ui/command/index.js';

	import { getTagState } from '$lib/db.svelte';
	import type { Tag } from '$lib/types';

	type Props = {
		isOpen: boolean;
		add: (selectedTagID: string) => void;
		remove: (selectedTagID: string) => void;
		clearAll: () => void;
		currentTagID?: string;
	};

	let { isOpen = $bindable(), add, remove, clearAll, currentTagID = '' }: Props = $props();

	const tagState = getTagState();

	let searchText = $state('');
	let selectedTags: Tag[] = $state([]);

	const uniqueSelectedTags = $derived(new Set(selectedTags.map((tag) => tag.id)));
	const tags = $derived.by(() => {
		return tagState.flatTags.filter((tag) => !uniqueSelectedTags.has(tag.id));
	});

	onMount(async () => {
		if (currentTagID) {
			const currentTag = await tagState.getOne(currentTagID);
			selectedTags.push(currentTag);
		}
	});

	$effect(() => {
		isOpen;
		selectedTags = [];
	});
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input bind:value={searchText} placeholder="Search Tags..." />
	{#if selectedTags.length > 0}
		<div class="gap-golden-sm p-golden-md border-b-base-content/10 flex flex-wrap border-b">
			{#each selectedTags as tag}
				<button
					onclick={() => {
						remove(tag.id);
						selectedTags = selectedTags.filter((existingTag) => existingTag.id != tag.id);
					}}
					class="badge badge-primary hover:badge-ghost group flex items-center justify-center text-nowrap"
					>{tag.name}</button
				>
			{/each}
		</div>
	{/if}

	<Command.List>
		<Command.Empty class="px-2 py-1">
			<button
				onclick={async () => {
					const newTag = await tagState.createOnebyName(searchText, '');
					if (!newTag) {
						return;
					}
					add(newTag.id);
					selectedTags.push(newTag);
					searchText = '';
				}}
				class="bg-primary/30 mx-auto w-full rounded-md py-3">Click to create {searchText}</button
			>
		</Command.Empty>
		<Command.Group>
			{#await tags then tags}
				{#if tags}
					{#each tags as tag}
						<Command.Item
							onSelect={() => {
								add(tag.id);
								selectedTags.push(tag);
								searchText = '';
							}}
							>{tag.name}
						</Command.Item>
					{/each}
				{/if}
			{/await}
		</Command.Group>
	</Command.List>

	<div class="gap-x-golden-md p-golden-md border-t-base-content/10 flex w-full border-t">
		<div class="grow"></div>
		<button
			onclick={() => {
				clearAll();
				isOpen = false;
				searchText = '';
			}}
			class="btn">Clear all existing note tags</button
		>
	</div>
</Command.Dialog>
