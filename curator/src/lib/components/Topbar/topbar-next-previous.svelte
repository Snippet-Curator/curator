<script lang="ts">
	import { ArrowLeft, ArrowRight } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		currentIndex: number;
		currentPage: number;
		lastItemIndex: number;
		totalPages: number;
		onLeft: () => void;
		onRight: () => void;
	};

	let { onLeft, onRight, currentIndex, currentPage, lastItemIndex, totalPages }: Props = $props();
	let nextButton: HTMLButtonElement;
	let previousButton: HTMLButtonElement;

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
			case 'ArrowLeft':
			case 'a':
				event.preventDefault();
				onLeft();
				flashButton(previousButton);
				break;
			case 'ArrowRight':
			case 'd':
			case ' ':
				event.preventDefault();
				onRight();
				flashButton(nextButton);
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

<div class="md:tooltip md:tooltip-bottom z-30" data-tip="Previous">
	<button
		bind:this={previousButton}
		disabled={currentIndex == 0 && currentPage == 1}
		class="btn btn-square"
		onclick={onLeft}><ArrowLeft size={18} /></button
	>
</div>
<div class="md:tooltip md:tooltip-bottom z-30" data-tip="Next">
	<button
		bind:this={nextButton}
		disabled={currentIndex == lastItemIndex && currentPage == totalPages}
		class="btn btn-square"
		onclick={onRight}><ArrowRight size={18} /></button
	>
</div>
