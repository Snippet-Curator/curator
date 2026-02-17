<script lang="ts">
	let { tags } = $props();
</script>

<div class="max-w-80 min-w-10 overflow-x-auto text-right whitespace-nowrap">
	{#if tags}
		{#each tags as tag}
			<span class="badge text-base-content/70 hover:text-base-content/90 mx-1 text-nowrap"
				>{tag.name}</span
			>
		{/each}
	{/if}
</div>
