<script lang="ts">
	import { Notebook as NotebookIcon, Pencil } from 'lucide-svelte';

	import type { Notebook } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isOpen: boolean;
	};

	let { isOpen = $bindable() }: Props = $props();

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'BUTTON':
			case 'DIV':
			case 'TRIX-EDITOR':
				return;
		}

		switch (event.key) {
			case 'e':
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

<div class="tooltip tooltip-bottom z-30" data-tip="Edit Note">
	<button onclick={() => (isOpen = true)} class="btn btn-ghost flex items-center gap-x-2">
		<Pencil size={18} />
	</button>
</div>
