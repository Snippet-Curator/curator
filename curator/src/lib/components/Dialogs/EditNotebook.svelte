<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { onMount } from 'svelte';
	import pb from '$lib/db.svelte';
	import type { Notebook } from '$lib/types';

	type Props = {
		isOpen: boolean;
		currentNotebookID?: string;
		action: (selectedNotebookID: string) => void;
	};

	let { isOpen = $bindable(), action }: Props = $props();

	let notebooks = $state<Notebook[]>();

	async function getNotebooks() {
		return await pb.collection('notebooks').getFullList({
			filter: 'name != "Archive" && name != "Trash"'
		});
	}

	onMount(async () => {
		notebooks = await getNotebooks();
	});
</script>

<Command.Dialog bind:open={isOpen}>
	<Command.Input placeholder="Search Notebooks..." />
	<Command.List>
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
	</Command.List>
</Command.Dialog>
