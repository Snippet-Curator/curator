<script lang="ts">
	import { getMobileState } from '$lib/utils.svelte';
	import { PanelLeft } from 'lucide-svelte';

	const mobileState = getMobileState();
</script>

<button
	onclick={() => (mobileState.isSidebarOpen = !mobileState.isSidebarOpen)}
	class="btn btn-sm btn-square hidden cursor-pointer items-center gap-x-2 md:flex"
	><PanelLeft size={18} /></button
>
