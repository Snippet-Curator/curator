<script lang="ts">
	import { getMobileState } from '$lib/state/ui.svelte';
	import { cn } from '$lib/utils.js';

	let { children, class: className = '' } = $props();

	const mobileState = getMobileState();
</script>

{#if mobileState.isMobile}
	<div class={cn('fixed right-8 bottom-15 z-30', className)}>
		{@render children()}
	</div>
{/if}
