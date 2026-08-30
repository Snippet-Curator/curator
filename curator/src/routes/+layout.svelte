<script type="ts">
import { Toaster } from 'svelte-sonner';
	import '../app.css';
	let { children } = $props();
</script>

	<Toaster richColors />

<div class="font-display">
	{@render children()}
</div>
