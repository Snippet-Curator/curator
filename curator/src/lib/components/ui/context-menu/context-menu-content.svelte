<script lang="ts">
	import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		portalProps,
		class: className,
		...restProps
	}: ContextMenuPrimitive.ContentProps & {
		portalProps?: ContextMenuPrimitive.PortalProps;
	} = $props();
</script>

<ContextMenuPrimitive.Portal {...portalProps}>
	<ContextMenuPrimitive.Content
		bind:ref
		class={cn(
			'bg-base-100 text-base-content border-base-content/20 z-50 min-w-[8rem] rounded-md border p-1 shadow-md focus:outline-none',
			className
		)}
		{...restProps}
	/>
</ContextMenuPrimitive.Portal>
