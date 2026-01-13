<script type="ts">
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

{@render children()}
