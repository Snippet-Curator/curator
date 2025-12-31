<script lang="ts">
	import { ArrowDown, ArrowUp } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		onUp: () => void;
		onDown: () => void;
	};

	let { onUp, onDown }: Props = $props();
	let upButton: HTMLButtonElement;
	let downButton: HTMLButtonElement;

	function flashButton(buttonEl: HTMLButtonElement) {
		if (!buttonEl) return;
		buttonEl.classList.add('bg-base-300');
		setTimeout(() => {
			buttonEl.classList.remove('bg-base-300');
		}, 100); // duration of the visual feedback
	}

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
			case 'ArrowUp':
			case 'w':
				event.preventDefault();
				onUp();
				flashButton(upButton);
				break;
			case 'ArrowDown':
			case 's':
				event.preventDefault();
				onDown();
				flashButton(downButton);
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

<div class="md:tooltip md:tooltip-bottom z-30" data-tip="See More">
	<button bind:this={upButton} class="btn btn-square" onclick={onUp}><ArrowUp size={18} /></button>
</div>
<div class="md:tooltip md:tooltip-bottom z-30" data-tip="See Less">
	<button bind:this={downButton} class="btn btn-square" onclick={onDown}
		><ArrowDown size={18} />
	</button>
</div>
