<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Popover from '$lib/components/ui/popover/index';
	import { EllipsisVertical } from 'lucide-svelte';

	type Props = {
		renderMore: Snippet;
	};

	let { renderMore }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger
		><div
			class="btn btn-ghost text-base-content/70 hover:text-base-content/90 transition-colors duration-200"
		>
			<EllipsisVertical size={18} />
		</div></Popover.Trigger
	>
	<Popover.Content>
		<div class="gap-golden-md grid grid-cols-3">
			{@render renderMore()}
		</div>
	</Popover.Content>
</Popover.Root>
