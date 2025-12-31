<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';
	import { mode } from 'mode-watcher';

	let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
	theme={mode.current}
	toastOptions={{
		unstyled: true,
		classes: {
			toast: 'p-golden-lg rounded-lg bg-base-300 text-base-content',
			description: 'text-base-100',
			actionButton: 'bg-base-100 text-base-content',
			cancelButton: 'bg-muted text-muted-foreground'
		}
	}}
	{...restProps}
/>
