<script lang="ts">
	import { Inbox, Trash2 } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		isOpen: boolean;
		isPermaDeleteNoteOpen: boolean;
		noteStatus: 'active' | 'archived' | 'deleted';
		trash: () => void;
		restore: () => void;
	};

	let {
		isOpen = $bindable(),
		noteStatus,
		restore,
		isPermaDeleteNoteOpen = $bindable()
	}: Props = $props();

	function handler(event: KeyboardEvent) {
		const target = event.target as HTMLElement;

		switch (target.tagName) {
			case 'INPUT':
			case 'TEXTAREA':
			case 'BUTTON':
			case 'DIV':
			case 'TRIX-EDITOR':
				return;
		}

		if (event.key === 'Delete') {
			isOpen = true;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

{#snippet renderArchived(status: string, Icon, action: () => void)}
	<div class="tooltip tooltip-bottom z-30" data-tip={status}>
		<button onclick={() => action()} class="btn btn-ghost"><Icon size={18} /></button>
	</div>
{/snippet}

{#if noteStatus === 'active' || noteStatus === 'archived'}
	{@render renderArchived('Delete', Trash2, () => (isOpen = true))}
{:else if noteStatus === 'deleted'}
	{@render renderArchived('Delete Forever', Trash2, () => (isPermaDeleteNoteOpen = true))}
	{@render renderArchived('Restore', Inbox, restore)}
{/if}
