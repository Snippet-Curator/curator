<script lang="ts">
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { Search } from 'lucide-svelte';

	let {
		ref = $bindable(null),
		class: className,
		value = $bindable(''),
		...restProps
	}: CommandPrimitive.InputProps = $props();
</script>

<div class="border-base-content/10 flex items-center border-b px-2" data-command-input-wrapper="">
	<Search size={18} class="mr-2 opacity-50" />
	<CommandPrimitive.Input
		class={cn(
			'placeholder:text-muted flex h-11 w-full rounded-md border-none bg-transparent py-3 text-base outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className
		)}
		bind:ref
		{...restProps}
		bind:value
	/>
</div>
