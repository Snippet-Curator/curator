<script lang="ts">
	import { Archive, ArchiveRestore } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	type Props = {
		archive: () => void;
		unarchive: () => void;
		noteStatus: 'active' | 'archived' | 'deleted';
	};

	let { archive, noteStatus, unarchive }: Props = $props();

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

		if (event.shiftKey && event.key === 'A') {
			archive();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handler);

		onDestroy(() => {
			document.removeEventListener('keydown', handler);
		});
	});
</script>

{#snippet renderArchived(archived: string, Icon, archiveAction: () => void)}
	<div class="tooltip tooltip-bottom z-30" data-tip={archived}>
		<button
			onclick={() => {
				archiveAction();
			}}
			class="btn btn-ghost flex items-center gap-x-2"><Icon size={18} /></button
		>
	</div>
{/snippet}

{#if noteStatus === 'active'}
	{@render renderArchived('Archive', Archive, archive)}
{:else if noteStatus === 'archived'}
	{@render renderArchived('Un-Archive', ArchiveRestore, unarchive)}
{:else if noteStatus === 'deleted'}{/if}
