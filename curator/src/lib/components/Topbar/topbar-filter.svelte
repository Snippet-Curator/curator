<script lang="ts">
	import { SlidersHorizontal } from '@jis3r/icons';

	type Props = {
		isOpen: boolean;
	};

	let { isOpen = $bindable() }: Props = $props();
</script>

<div class="tooltip text-base-content/70 tooltip-bottom z-30" data-tip="Filter">
	<button onclick={() => (isOpen = true)} class="btn btn-ghost flex items-center gap-x-2"
		><SlidersHorizontal size={18} /></button
	>
</div>
