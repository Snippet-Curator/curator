<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		rating: number;
		action: (newRating: number) => void;
	};

	let { rating, action }: Props = $props();
	let newRating = $state(0);

	function updateRating(star: number) {
		newRating = star == rating ? 0 : star;
		action(newRating);
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
			case 'h':
			case '0':
				event.preventDefault();
				updateRating(0);
				break;
			case 'j':
			case '1':
				event.preventDefault();
				updateRating(1);
				break;
			case 'k':
			case '2':
				event.preventDefault();
				updateRating(2);
				break;
			case 'l':
			case '3':
				event.preventDefault();
				updateRating(3);
				break;
			case ';':
			case '4':
				event.preventDefault();
				updateRating(4);
				break;
			case "'":
			case '5':
				event.preventDefault();
				updateRating(5);
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

<div class="rating rating-xs">
	{#each [1, 2, 3, 4, 5] as star}
		<input
			type="radio"
			name="ratings"
			class="mask mask-star-2 bg-orange-400"
			aria-label="{star} star"
			checked={rating === star}
			onclick={() => updateRating(star)}
		/>
	{/each}
</div>
