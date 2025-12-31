<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

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
			case 'Backspace':
				window.history.back();
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
	class="btn btn-outline hover:btn-neutral border-base-300 flex items-center transition-colors duration-200"
	onclick={() => window.history.back()}
>
	<ArrowLeft size={15} />

	<div class="hidden md:block">Back</div>
</button>
