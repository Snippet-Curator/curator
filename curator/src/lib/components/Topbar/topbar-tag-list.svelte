<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	let { tags } = $props();
</script>

<ScrollArea orientation="horizontal" class="min-w-10 max-w-80 whitespace-nowrap text-right">
	{#if tags}
		{#each tags as tag}
			<span class="badge mx-1 text-nowrap">{tag.name}</span>
		{/each}
	{/if}
</ScrollArea>
