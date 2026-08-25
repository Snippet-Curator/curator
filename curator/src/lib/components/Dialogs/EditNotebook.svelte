<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { getActiveNotebooks } from '$lib/api/notebook.remote';

	type Props = {
		isOpen: boolean;
		currentNotebookID?: string;
		action: (selectedNotebookID: string) => void;
	};

	let { isOpen = $bindable(), action }: Props = $props();
	let notebooks = $derived(await getActiveNotebooks());
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input placeholder="Search Notebooks..." />
	<Command.List>
		{#if notebooks.loading}
			<div class="p-golden-xl text-center text-xs font-semibold">Loading Notebooks...</div>
		{:else}
			<Command.Empty>No notebook found.</Command.Empty>
			<Command.Group heading="">
				{#each notebooks as notebook}
					<Command.Item
						onSelect={() => {
							action(notebook.id);
							isOpen = false;
						}}
						>{notebook.name}
					</Command.Item>
				{/each}
			</Command.Group>
		{/if}
	</Command.List>
</Command.Dialog>
