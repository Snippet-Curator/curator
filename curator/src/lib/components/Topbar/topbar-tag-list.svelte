<script lang="ts">
	let { tags } = $props();
</script>

<div class="min-w-10 max-w-80 whitespace-nowrap text-right overflow-x-auto">
	{#if tags}
		{#each tags as tag}
			<span class="badge mx-1 text-nowrap">{tag.name}</span>
		{/each}
	{/if}
</div>
