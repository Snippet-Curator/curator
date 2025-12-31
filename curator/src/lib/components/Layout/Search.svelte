<script lang="ts">
	import { CircleX, Search } from 'lucide-svelte';

	type Props = {
		searchNotes: (searchInput: string) => void;
		clearNote: () => void;
		searchInput: string;
	};

	let { searchNotes, searchInput = $bindable(), clearNote }: Props = $props();
</script>

<div class="relative grow px-2">
	<input
		type="text"
		bind:value={searchInput}
		oninput={() => searchNotes(searchInput)}
		placeholder="Search..."
		class="input relative w-full pl-10 pr-10"
	/>
	<div class="text-base-content/50 absolute inset-y-0 left-5 z-30 flex items-center">
		<Search size={18} />
	</div>
	{#if searchInput && searchInput.trim() != ''}
		<button
			class="absolute right-5 top-1/2 z-30 -translate-y-1/2 hover:cursor-pointer"
			onclick={() => {
				searchInput = '';
				clearNote();
			}}
		>
			<CircleX size={18} />
		</button>
	{/if}
</div>
