<script lang="ts">
	import { page } from '$app/state';

	import { Tag as TagIcon } from 'lucide-svelte';

	import * as ContextMenu from '$lib/components/ui/context-menu/index';

	import type { Tag } from '$lib/types';
	import { ChangeParent, Delete, Rename, TagList, New } from '$lib/components/';
	import {
		createOneTagbyName,
		deleteTag,
		getAllTags,
		pinTag,
		updateOneTagByName,
		updateOneTagByParent
	} from '$lib/api/tag.remote';

	type Props = {
		tags: Tag[];
		allowEdit?: boolean;
	};

	let { tags, allowEdit = false }: Props = $props();

	const allTags = $derived(await getAllTags());
	const flatTags = $derived(allTags?.flatTags);

	let isEditOpen = $state(false);
	let isDeleteOpen = $state(false);
	let isChangeParentOpen = $state(false);
	let isNewTagOpen = $state(false);
	let selectedTag = $state<Tag>();
</script>

{#snippet renderTag(tag: Tag)}
	<ContextMenu.Root>
		<ContextMenu.Trigger class="group flex cursor-auto items-center justify-between p-0 pr-2">
			<a
				href="/tags/{tag.id}"
				class="{page.url.pathname == `/tags/${tag.id}`
					? 'badge-neutral'
					: ''} badge hover:badge-neutral mx-2 my-2 flex items-center gap-x-2 text-nowrap transition-colors"
			>
				<span class="group-hover:text-base-content/90 text-base-content/70"
					><TagIcon size={15} /></span
				>
				{tag.name}
			</a>

			<span class="text-base-content/50 group-hover:text-base-content/70 text-right"
				>{tag.note_count > 0 ? tag.note_count : ''}</span
			>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item
				onSelect={() => {
					pinTag(tag.id);
				}}>Pin</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedTag = tag;
					isEditOpen = true;
				}}>Rename</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedTag = tag;
					isChangeParentOpen = true;
				}}>Change Parent</ContextMenu.Item
			>
			<ContextMenu.Item
				onSelect={() => {
					selectedTag = tag;
					isDeleteOpen = true;
				}}>Delete</ContextMenu.Item
			>
			<ContextMenu.Separator />
			<ContextMenu.Item
				onSelect={() => {
					selectedTag = tag;
					isNewTagOpen = true;
				}}>New</ContextMenu.Item
			>
		</ContextMenu.Content>
	</ContextMenu.Root>
{/snippet}

<svelte:boundary>
	{#each tags as tag}
		<li class="group mr-4">
			{#if tag.children && tag.children?.length > 0}
				<details class="w-full cursor-pointer">
					<summary class="mr-4 flex w-full py-0 pl-0">
						<div class="grow">
							{@render renderTag(tag)}
						</div>
					</summary>

					{#if tag.children}
						<ul>
							<TagList {allowEdit} tags={tag.children} />
						</ul>
					{/if}
				</details>
			{:else}
				{@render renderTag(tag)}
			{/if}
		</li>
	{/each}

	{#snippet failed()}
		Tags Failed to Render
	{/snippet}
</svelte:boundary>

{#if selectedTag}
	<Rename
		bind:isOpen={isEditOpen}
		renameType="Tag"
		currentName={selectedTag.name}
		action={(renameTagName) => {
			updateOneTagByName({ tagID: selectedTag?.id, newName: renameTagName });
		}}
	/>

	<Delete bind:isOpen={isDeleteOpen} name="Tag" action={() => deleteTag(selectedTag.id)}
		>this tag?</Delete
	>

	<ChangeParent
		bind:isOpen={isChangeParentOpen}
		type="tag"
		fullList={flatTags}
		currentItemID={selectedTag?.id}
		clear={() => updateOneTagByParent({ tagID: selectedTag?.id, parentTagID: '' })}
		action={(selectedParentTagID) =>
			updateOneTagByParent({ tagID: selectedTag?.id, parentTagID: selectedParentTagID })}
	/>

	<New
		bind:isOpen={isNewTagOpen}
		newType="Tag"
		action={(newTagName) => createOneTagbyName({ name: newTagName, parentTagID: selectedTag.id })}
	/>
{/if}
