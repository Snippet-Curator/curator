<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isOpen: boolean;
		renameType: string;
		currentName: string;
		action: (newName: string) => void;
	};

	let { isOpen = $bindable(), currentName, renameType, action }: Props = $props();

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
			<Dialog.Title>Rename {renameType}</Dialog.Title>
			<Dialog.Description>Change {renameType.toLowerCase()} to new name</Dialog.Description>
		</Dialog.Header>
		<label class="input w-full">
			<span class="label">{renameType} Name</span>
			<input
				type="text"
				class="ring-0"
				placeholder={currentName}
				bind:value={newName}
				onfocus={() => (newName = currentName)}
			/>
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
				class="btn btn-primary">Save</button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>
