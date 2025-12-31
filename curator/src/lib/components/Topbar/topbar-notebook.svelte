<script lang="ts">
	import { Notebook as NotebookIcon } from 'lucide-svelte';

	import type { Notebook } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		notebook: Notebook;
		isOpen: boolean;
	};

	let { notebook, isOpen = $bindable() }: Props = $props();

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

<div class="tooltip tooltip-bottom z-30" data-tip="Change Notebook">
	<button onclick={() => (isOpen = true)} class="btn btn-ghost flex items-center gap-x-2">
		<NotebookIcon class="md:hidden" size={18} />
		<span class="hidden md:inline">{notebook.name}</span></button
	>
</div>
