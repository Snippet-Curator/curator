<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { children, class: className = '' } = $props();
</script>

<div class={cn('menu bg-base-200 border-base-200 w-full border-b md:min-h-15 md:px-4', className)}>
	<div class="flex items-center justify-start gap-x-2 md:flex-wrap">
		{@render children()}
	</div>
</div>
