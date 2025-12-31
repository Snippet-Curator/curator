<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import type { Notebook, Tag } from '$lib/types';

	type Props = {
		isOpen: boolean;
		fullList: Tag[] | Notebook[];
		currentItemID: string;
		action: (selectedItem: string) => void;
		clear: () => void;
		type: 'notebook' | 'tag';
	};

	let { isOpen = $bindable(), fullList, currentItemID, action, clear, type }: Props = $props();

	let filteredList = $derived.by(() => {
		return fullList.filter(
			(item) => item.id != currentItemID && item.expand?.parent?.id != currentItemID
		);
	});
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input placeholder="Search {type}s..." />

	<Command.List>
		<Command.Empty>No {type} found.</Command.Empty>
		<Command.Group heading="">
			{#each filteredList as item}
				<Command.Item
					onSelect={() => {
						action(item.id);
						isOpen = false;
					}}
					>{item.name}
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
		<button
			onclick={() => {
				clear();
				isOpen = false;
			}}
			class="btn btn-primary">Clear Parent {type}</button
		>
	</div>
</Command.Dialog>
