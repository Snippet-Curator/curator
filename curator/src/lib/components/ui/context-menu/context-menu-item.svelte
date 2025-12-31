<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		inset,
		...restProps
	}: ContextMenuPrimitive.ItemProps & {
		inset?: boolean;
	} = $props();
</script>

<ContextMenuPrimitive.Item
	bind:ref
	class={cn(
		'data-[highlighted]:bg-base-content/10 data-[highlighted]:text-base-content relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		inset && 'pl-8',
		className
	)}
	{...restProps}
/>
