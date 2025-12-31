<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isOpen: boolean;
		newType: 'Tag' | 'Notebook';
		action: (name: string) => void;
	};

	let { isOpen = $bindable(), newType, action }: Props = $props();

	let newName = $state('');

	function handler(event: KeyboardEvent) {
		if (isOpen == false) return;

		switch (event.key) {
			case 'Enter':
				action(newName);
				newName = '';
				isOpen = false;
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
			<Dialog.Title>New {newType}</Dialog.Title>
		</Dialog.Header>
		<label class="input w-full">
			<span class="label">{newType} Name</span>
			<input type="text" class="ring-0" bind:value={newName} />
		</label>
		<div class="flex justify-end gap-x-2">
			<button onclick={() => (isOpen = false)} class="btn">Close</button>
			<button
				disabled={newName === ''}
				onclick={() => {
					action(newName);
					newName = '';
					isOpen = false;
				}}
				class="btn btn-primary">Create</button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>
