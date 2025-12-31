<script lang="ts">
	import { Trash } from 'lucide-svelte';

	type Props = {
		isOpen: boolean;
	};

	let { isOpen = $bindable() }: Props = $props();
</script>

<div class="tooltip tooltip-bottom z-30" data-tip="Empty Trash">
	<button onclick={() => (isOpen = true)} class="btn btn-ghost"><Trash size={18} /></button>
</div>
