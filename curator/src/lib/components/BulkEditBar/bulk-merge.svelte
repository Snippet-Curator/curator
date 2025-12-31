<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Layers } from 'lucide-svelte';

	type Props = {
		merge: () => void;
		selectedNotesID: string[];
	};

	let { merge, selectedNotesID }: Props = $props();

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'DIV':
				return;
		}

		if (selectedNotesID.length === 0) return;

		if (event.shiftKey && event.key === 'M') {
			event.preventDefault();
			merge();
			return;
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
	class="btn"
	onclick={() => {
		merge();
	}}><Layers size={18} class="text-base-content/60" />Merge</button
>
