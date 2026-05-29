<script lang="ts">
	import { Send, Users } from '@jis3r/icons';

	type Props = {
		isOpen: boolean;
		isShared: true | false | undefined;
		share: () => void;
	};

	let { isOpen = $bindable(), isShared, share }: Props = $props();
</script>

{#snippet renderArchived(shared: string, Icon)}
	<div class="tooltip text-base-content/70 tooltip-bottom z-30" data-tip={shared}>
		<button
			onclick={() => {
				if (!isShared) {
					share();
				}
				isOpen = true;
			}}
			class="btn btn-ghost flex items-center gap-x-2"><Icon size={18} /></button
		>
	</div>
{/snippet}

{#if isShared === false}
	{@render renderArchived('Share', Send)}
{:else}
	{@render renderArchived('Shared', Users)}
{/if}
