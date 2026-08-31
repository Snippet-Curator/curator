<script lang="ts">
	import { page } from '$app/state';

	import { Tag as TagIcon, Pin } from 'lucide-svelte';
	import * as ContextMenu from '$lib/components/ui/context-menu/index';

	import { getAllNotebooks, unpinNotebook } from '$lib/api/notebook.remote';
	import { getAllTags, unpinTags } from '$lib/api/tag.remote';
	import type { Tag, Notebook } from '$lib/types';

	type Props = {
		pinnedTags: Tag[];
		pinnedNotebooks: Notebook[];
	};

	let { pinnedTags, pinnedNotebooks }: Props = $props();
</script>

{#snippet renderNotebook(notebook: Notebook)}
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class={`${
				page.url.pathname == `/notebook/${notebook.id}` ? ' bg-neutral text-neutral-content' : ''
			} my-1 flex cursor-auto items-center justify-between rounded-md p-0 pr-1`}
		>
			<div class=" flex w-full items-center justify-between">
				<a href="/notebook/{notebook.id}" class="w-full px-3 py-1 text-nowrap">
					{notebook.name}
				</a>
				<Pin size={15} />
			</div>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				onSelect={async () => {
					await unpinNotebook(notebook.id);
					await getAllNotebooks().refresh()    
				}}>Unpin</ContextMenu.Item
			>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}

{#snippet renderTag(tag: Tag)}
	<ContextMenu.Root>
		<ContextMenu.Trigger class="group flex cursor-auto items-center justify-between p-0 pr-1">
			<a
				href="/tags/{tag.id}"
				class="{page.url.pathname == `/tags/${tag.id}`
					? 'badge-neutral'
					: ''} badge hover:badge-neutral mx-0 my-1 flex items-center gap-x-2 text-nowrap transition-colors"
			>
				<span class="group-hover:text-base-content/90 text-base-content/70"
					><TagIcon size={15} /></span
				>
				{tag.name}
			</a>
			<span class="hover:text-base-content/70 text-base-content/50"><Pin size={15} /></span>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				onSelect={async () => {
					await unpinTags(tag.id);
					await getAllTags().refresh()
				}}>Unpin</ContextMenu.Item
			>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}

{#if pinnedNotebooks.length > 0 || pinnedTags.length > 0}
	<div class="bg-base-300/40 p-golden-sm px-golden-md mr-4 rounded-md">
		<ul class="">
			{#each pinnedNotebooks as notebook}
				<li>
					{@render renderNotebook(notebook)}
				</li>
			{/each}

			{#each pinnedTags as tag}
				{@render renderTag(tag)}
			{/each}
		</ul>
	</div>
{/if}
