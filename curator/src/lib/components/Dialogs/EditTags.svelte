<script lang="ts">
	import { createOneTagbyName, getAllTags } from '$lib/api/tag.remote';
	import * as Command from '$lib/components/ui/command/index.js';

	import type { Tag } from '$lib/types';

	type Props = {
		isOpen: boolean;
		currentTags: Tag[];
		add: (selectedTagID: string) => void;
		remove: (selectedTagID: string) => void;
	};

	let { isOpen = $bindable(), add, remove, currentTags = [] }: Props = $props();

	let searchText = $state('');
	let currentTagList = $derived(new Set(currentTags.map((tag) => tag.id)));
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input bind:value={searchText} placeholder="Search Tags..." />
	{#if currentTags}
		<div class="gap-golden-sm p-golden-md border-b-base-content/10 flex flex-wrap border-b">
			{#each currentTags as currentTag}
				<button
					onclick={() => remove(currentTag.id)}
					class="badge badge-primary hover:badge-ghost text-nowrap">{currentTag.name}</button
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
						add(newTag.id);
						searchText = '';
					}}
					class="bg-primary/30 mx-auto w-full rounded-md py-3">Click to create {searchText}</button
				>
			</Command.Empty>
			<Command.Group>
				{#each allTags.flatTags.filter((tag) => !currentTagList.has(tag.id)) as tag}
					<Command.Item
						onSelect={() => {
							add(tag.id);
							searchText = '';
						}}
						>{tag.name}
					</Command.Item>
				{/each}
			</Command.Group>
		</svelte:boundary>
	</Command.List>
</Command.Dialog>
