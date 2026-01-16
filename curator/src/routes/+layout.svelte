<script type="ts">
	import { setSettingState } from '$lib/setting.svelte';
	import '../app.css';

	setSettingState();

	let { children } = $props();
</script>

<div class="font-display">
	{@render children()}
</div>
