<script type="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="font-display">
	{@render children()}
</div>
