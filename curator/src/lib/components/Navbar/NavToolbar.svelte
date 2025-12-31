<script lang="ts">
	import { getMobileState } from '$lib/utils.svelte';
	import { cn } from '$lib/utils.js';

	let { children, class: className = '' } = $props();

	const mobileState = getMobileState();
</script>

{#if mobileState.isMobile}
	<div class={cn('bottom-15 fixed right-8 z-30', className)}>
		{@render children()}
	</div>
{/if}
