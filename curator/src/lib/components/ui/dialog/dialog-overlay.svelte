<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DialogPrimitive.OverlayProps = $props();
</script>

<DialogPrimitive.Overlay
	bind:ref
	class={cn(
		'data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 motion-duration-75 z-80 bg-base-200/60 fixed inset-0 backdrop-blur-md   dark:bg-black/80',
		className
	)}
	{...restProps}
/>
