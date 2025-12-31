<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Notebook as NotebookIcon } from 'lucide-svelte';

	type Props = {
		isOpen: boolean;
		selectedNotesID: string[];
	};

	let { isOpen = $bindable(), selectedNotesID }: Props = $props();

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'DIV':
				return;
		}

		if (selectedNotesID.length === 0) return;

		switch (event.key) {
			case 'n':
				event.preventDefault();
				isOpen = true;
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

<button
	onclick={() => {
		if (selectedNotesID.length > 0) {
			isOpen = true;
		}
	}}
	class="btn"
>
	<NotebookIcon size={18} class="text-base-content/60" />Notebook</button
>
