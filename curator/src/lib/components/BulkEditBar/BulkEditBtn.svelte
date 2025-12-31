<script lang="ts">
	import { Pencil } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isBulkEdit: boolean;
		selectedNotesID: string[];
	};

	let { isBulkEdit = $bindable(), selectedNotesID = $bindable() }: Props = $props();

	function handler(event: KeyboardEvent) {
		if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
			return;
		}

		switch (event.key) {
			case 'b':
			case 'Escape':
				event.preventDefault();
				isBulkEdit = !isBulkEdit;
				selectedNotesID = [];
				break;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

<div class="tooltip tooltip-bottom z-30" data-tip="Bulk Edit">
	<button
		class="{isBulkEdit ? 'btn-primary' : 'btn-ghost'} btn"
		onclick={() => {
			isBulkEdit = !isBulkEdit;
			selectedNotesID = [];
		}}
	>
		<Pencil size={18} />
	</button>
</div>
