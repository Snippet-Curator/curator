<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { getNotebookState } from '$lib/state/notebooks.svelte';

	type Props = {
		isOpen: boolean;
		currentNotebookID?: string;
		action: (selectedNotebookID: string) => void;
	};

	let { isOpen = $bindable(), action }: Props = $props();
	const notebooksState = getNotebookState();
	const notebooks = $derived(notebooksState.activeNotebooks);
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input placeholder="Search Notebooks..." />
	<Command.List>
		<Command.Empty>No notebook found.</Command.Empty>
		<Command.Group heading="">
			{#each await notebooks as notebook}
				<Command.Item
					value={notebook.name}
					onSelect={() => {
						action(notebook.id);
						isOpen = false;
					}}
					>{notebook.name}
				</Command.Item>
			{/each}
		</Command.Group>
	</Command.List>
</Command.Dialog>
