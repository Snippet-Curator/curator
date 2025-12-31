<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ContextMenuPrimitive.SubContentProps = $props();
</script>

<ContextMenuPrimitive.SubContent
	bind:ref
	class={cn(
		'text-base-content bg-base-content/10 z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md focus:outline-none',
		className
	)}
	{...restProps}
/>
