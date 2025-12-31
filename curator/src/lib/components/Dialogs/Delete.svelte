<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import type { Snippet } from 'svelte';

	type Props = {
		isOpen: boolean;
		name: string;
		action: () => void;
		children: Snippet;
	};

	let { isOpen = $bindable(), name, action, children }: Props = $props();
</script>

<Dialog.Root open={isOpen}>
	<Dialog.Content
		onCloseAutoFocus={(e) => {
			e.preventDefault();
			isOpen = false;
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Delete {name}</Dialog.Title>
			<Dialog.Description>Are you sure you want to delete {@render children()}?</Dialog.Description>
		</Dialog.Header>
		<div class="flex justify-end gap-x-2">
			<button onclick={() => (isOpen = false)} class="btn">Close</button>
			<button
				onclick={() => {
					action();
					isOpen = false;
				}}
				class="btn btn-error">Delete</button
			>
		</div>
	</Dialog.Content>
</Dialog.Root>
