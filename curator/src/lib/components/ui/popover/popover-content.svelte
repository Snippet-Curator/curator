<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { Popover as PopoverPrimitive } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		sideOffset = 4,
		align = 'center',
		portalProps,
		...restProps
	}: PopoverPrimitive.ContentProps & {
		portalProps?: PopoverPrimitive.PortalProps;
	} = $props();
</script>

<PopoverPrimitive.Portal {...portalProps}>
	<PopoverPrimitive.Content
		bind:ref
		data-slot="popover-content"
		{sideOffset}
		{align}
		class={cn(
			'bg-base-100 border-base-content/20 text-base-content data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 data-[state=closed]:motion-scale-out-95 motion-duration-75 data-[state=open]:motion-scale-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) outline-hidden font-display z-50 w-72 rounded-md border p-4 text-sm shadow-md',
			className
		)}
		{...restProps}
	/>
</PopoverPrimitive.Portal>
