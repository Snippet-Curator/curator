<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		onLeft: () => Promise<void>;
		onRight: () => Promise<void>;
		onUp: () => Promise<void>;
		onDown: () => Promise<void>;
	};

	let { onLeft, onRight, onUp, onDown }: Props = $props();

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'BUTTON':
			case 'DIV':
				return;
		}

		switch (event.key) {
			case 'ArrowLeft':
			case 'a':
				event.preventDefault();
				onLeft();
				break;
			case 'ArrowRight':
			case 'd':
			case ' ':
				event.preventDefault();
				onRight();
				break;
			case 'ArrowUp':
			case 'w':
				event.preventDefault();
				onUp();
				break;
			case 'ArrowDown':
			case 's':
				event.preventDefault();
				onDown();
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
