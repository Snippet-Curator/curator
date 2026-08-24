<script lang="ts">
	import { getMobileState } from '$lib/utils.svelte';
	import { ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		changePage: (newPage: number) => void;
		currentPage: number;
		totalPages: number;
	};

	let { changePage, currentPage = 1, totalPages = 1 }: Props = $props();

	const mobileState = getMobileState();
	const maxVisiblePages = 5;
	let pages = $derived.by(() => {
		let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		const end = Math.min(totalPages, start + maxVisiblePages - 1);

		if (end - start < maxVisiblePages - 1) {
			start = Math.max(1, end - maxVisiblePages + 1);
		}
		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	});

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
			case 'ArrowRight':
				changePage(currentPage + 1);
				break;
			case 'ArrowLeft':
				changePage(currentPage - 1);
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

{#if currentPage && totalPages && pages.length > 1}
	<div
		class="join bg-base-100/95 sticky top-0 z-20 flex w-full items-center justify-center py-1 backdrop-blur-2xl md:py-3"
	>
		<button disabled={currentPage == 1} onclick={() => changePage(1)} class="btn join-item">
			{#if mobileState.isMobile}
				<ChevronsLeft size={18} />
			{:else}
				First
			{/if}
		</button>
		<button
			onclick={() => changePage(currentPage - 1)}
			disabled={currentPage == 1}
			class="btn join-item"
		>
			{#if mobileState.isMobile}
				<ChevronLeft size={18} />
			{:else}
				Previous
			{/if}
		</button>
		{#each pages as page}
			<button onclick={() => changePage(page)} disabled={currentPage == page} class="join-item btn"
				>{page}</button
			>
		{/each}
		<button
			onclick={() => changePage(currentPage + 1)}
			disabled={currentPage == totalPages}
			class="btn join-item"
		>
			{#if mobileState.isMobile}
				<ChevronRight size={18} />
			{:else}
				Next
			{/if}
		</button>
		<button
			disabled={currentPage == totalPages}
			onclick={() => changePage(totalPages)}
			class="btn join-item"
		>
			{#if mobileState.isMobile}
				<ChevronsRight size={18} />
			{:else}
				Last
			{/if}</button
		>
	</div>
{/if}
