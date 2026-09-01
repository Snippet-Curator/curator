<script lang="ts">
	import { createOneTagbyName, getAllTags } from '$lib/api/tag.remote';
	import * as Command from '$lib/components/ui/command/index.js';

	import type { Tag } from '$lib/types';

	type Props = {
		isOpen: boolean;
		currentTags: Tag[];
		update: (selectedTagIDs: string[]) => void;
	};

	let { isOpen = $bindable(), currentTags = [], update }: Props = $props();

	let wasOpen = false;
	let selectedTags = $state<Tag[]>(currentTags ?? []);
	let searchText = $state('');
	let selectedTagList = $derived.by(() => {
		if (selectedTags.length === 0) return new Set<string>();
		return new Set(selectedTags.map((tag) => tag.id));
	});

	$effect(() => {
		if (wasOpen && !isOpen) {
			update([...selectedTagList]);
		}

		wasOpen = isOpen;
		selectedTags = currentTags ?? [];
	});
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input bind:value={searchText} placeholder="Search Tags..." />
	{#if selectedTags}
		<div class="gap-golden-sm p-golden-md border-b-base-content/10 flex flex-wrap border-b">
			{#each selectedTags as tag}
				<button
					onclick={() => {
						selectedTags = selectedTags.filter((selectedTag) => selectedTag.id != tag.id);
					}}
					class="badge badge-primary hover:badge-ghost text-nowrap">{tag.name}</button
				>
			{/each}
		</div>
	{/if}
	<Command.List>
		<svelte:boundary>
			{@const allTags = await getAllTags()}
			{#snippet pending()}
				<div class="p-golden-xl text-center text-xs font-semibold">Loading Tags...</div>
			{/snippet}

			<Command.Empty class="px-2 py-1">
				<button
					onclick={async () => {
						const newTag = await createOneTagbyName({ newName: searchText, parentTagID: '' });
						if (!newTag) {
							return;
						}
						selectedTags.push(newTag);
						searchText = '';
					}}
					class="bg-primary/30 mx-auto w-full rounded-md py-3">Click to create {searchText}</button
				>
			</Command.Empty>
			<Command.Group>
				{#each allTags?.flatTags.filter((tag) => !selectedTagList.has(tag.id)) as tag}
					<Command.Item
					value={tag.id}
						onSelect={() => {
							selectedTags.push(tag);
							searchText = '';
						}}
						>{tag.name}
					</Command.Item>
				{/each}
			</Command.Group>
		</svelte:boundary>
	</Command.List>
</Command.Dialog>
