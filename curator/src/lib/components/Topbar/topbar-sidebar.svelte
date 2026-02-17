<script lang="ts">
	import { getMobileState } from '$lib/utils.svelte';
	import { PanelLeft } from 'lucide-svelte';

	const mobileState = getMobileState();
</script>

<button
	onclick={() => (mobileState.isSidebarOpen = !mobileState.isSidebarOpen)}
	class="btn btn-sm btn-square text-base-content/70 hover:text-base-content/90 hidden cursor-pointer items-center gap-x-2 transition-colors duration-200 md:flex"
	><PanelLeft size={18} /></button
>
