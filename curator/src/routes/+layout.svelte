<script type="ts">
	import '../app.css';
	import { setNotebookState, setTagState } from '$lib/db.svelte';

	import { setSettingState } from '$lib/setting.svelte';

	import { setMobileState, setMouseState } from '$lib/utils.svelte';

	setTagState();
	setNotebookState();
	setMobileState();
	setSettingState();
	setMouseState();

	let { children } = $props();
</script>

<div class="font-display">
	{@render children()}
</div>
