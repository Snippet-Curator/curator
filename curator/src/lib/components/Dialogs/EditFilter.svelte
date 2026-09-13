<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isOpen: boolean;
		currentName: string;
		currentQuery: string;
		update: (newName: string, newQuery: string) => void;
	};

	let { isOpen = $bindable(), currentName, currentQuery, update }: Props = $props();

	let newName = $state(currentName);
	let newQuery = $state(currentQuery);

	function updateFilter() {
		update(newName, newQuery);
		isOpen = false;
	}

	function handler(event: KeyboardEvent) {
		if (isOpen == false) return;

		switch (event.key) {
			case 'Enter':
				updateFilter();
				break;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

<Dialog.Root open={isOpen}>
	<Dialog.Content
		onCloseAutoFocus={(e) => {
			e.preventDefault();
			isOpen = false;
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Update Filter</Dialog.Title>
			<!-- <Dialog.Description>Edit saved filter.</Dialog.Description> -->
		</Dialog.Header>
		<label class="input w-full">
			<span class="label">Rename</span>
			<input type="text" class="ring-0" placeholder={currentName} bind:value={newName} />
		</label>
		<label class="input w-full">
			<span class="label">Edit Query</span>
			<input type="text" class="ring-0" placeholder={currentQuery} bind:value={newQuery} />
		</label>
		<div class="flex justify-end gap-x-2">
			<button
				disabled={newName === ''}
				onclick={() => {
					updateFilter();
				}}
				class="btn btn-primary">Save</button
			>
			<button onclick={() => (isOpen = false)} class="btn">Close</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
