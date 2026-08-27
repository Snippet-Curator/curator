<script lang="ts">
	import { goto } from '$app/navigation';
	import { debouncedSearch } from '$lib/utils';
	import { CircleX, Search } from 'lucide-svelte';

	type Props = {
		searchInput: string;
	};

	let { searchInput = $bindable() }: Props = $props();

	async function clearNote() {
		await goto(`?page=1`, {
			keepFocus: true
		});
	}
</script>

<div class="relative grow px-2">
	<input
		type="text"
		bind:value={searchInput}
		oninput={() => debouncedSearch(searchInput)}
		placeholder="Search..."
		class="input relative w-full pr-10 pl-10"
	/>
	<div class="text-base-content/50 absolute inset-y-0 left-5 z-30 flex items-center">
		<Search size={18} />
	</div>
	{#if searchInput && searchInput.trim() != ''}
		<button
			class="absolute top-1/2 right-5 z-30 -translate-y-1/2 hover:cursor-pointer"
			onclick={() => {
				searchInput = '';
				clearNote();
			}}
		>
			<CircleX size={18} />
		</button>
	{/if}
</div>
