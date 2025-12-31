<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive, type WithoutChild } from 'bits-ui';
	import { ChevronRight } from 'lucide-svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		children,
		...restProps
	}: WithoutChild<ContextMenuPrimitive.SubTriggerProps> & {
		inset?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.SubTrigger
	bind:ref
	class={cn(
		'data-[highlighted]:bg-base-content/10 data-[state=open]:bg-base-content/10 data-[highlighted]:text-base-content data-[state=open]:text-base-content flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
		inset && 'pl-8',
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<ChevronRight class="ml-auto size-4" />
</ContextMenuPrimitive.SubTrigger>
