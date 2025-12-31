<script lang="ts">
	import { Combobox } from 'bits-ui';
	import type { Tag } from '$lib/types';
	import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-svelte';

	type Props = {
		tags: Tag[];
		selectedTagIdArray: string[];
	};

	let { tags, selectedTagIdArray = $bindable([]) }: Props = $props();

	let searchValue = $state('');

	const selectedTags = $derived(tags.filter((tag) => selectedTagIdArray.includes(tag.id)));
	const filteredTags = $derived(
		tags.filter((tag) => {
			return (
				!selectedTagIdArray.includes(tag.id) &&
				tag.name.toLowerCase().includes(searchValue.toLowerCase())
			);
		})
	);
</script>

{#if selectedTags.length > 0}
	<div class="gap-golden-sm p-golden-sm flex flex-wrap">
		{#each selectedTags as tag}
			<button
				onclick={() => {
					selectedTagIdArray = selectedTagIdArray.filter(
						(selectedTagID) => selectedTagID != tag.id
					);
				}}
				class="badge badge-primary hover:badge-ghost text-nowrap">{tag.name}</button
			>
		{/each}
	</div>
{/if}

<Combobox.Root bind:value={selectedTagIdArray} type="multiple">
	<div class="relative h-10">
		<Combobox.Input
			placeholder="Search tags..."
			class="input w-full"
			oninput={(e) => (searchValue = e.currentTarget.value)}
		/>
		<Combobox.Trigger>
			<button
				class="hover:bg-base-200/30 absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-sm p-1 hover:cursor-pointer"
			>
				<ChevronsUpDown size={16} />
			</button>
		</Combobox.Trigger>
	</div>
	<Combobox.Portal>
		<Combobox.Content
			class="focus-override border-base-content/20 bg-base-100  data-[state=closed]:motion-opacity-out-0 data-[state=open]:motion-opacity-in-0 motion-duration-75 data-[state=closed]:motion-scale-out-95 data-[state=open]:motion-scale-in-95 outline-hidden z-100 h-64 max-h-[var(--bits-combobox-content-available-height)] w-[var(--bits-combobox-anchor-width)] min-w-[var(--bits-combobox-anchor-width)] select-none rounded-md border px-1 py-3"
			sideOffset={10}
		>
			<Combobox.ScrollUpButton class="flex w-full items-center justify-center py-1">
				<ChevronUp size={18} />
			</Combobox.ScrollUpButton>
			<Combobox.Viewport class="p-1">
				{#each filteredTags as tag}
					<Combobox.Item
						class="rounded-button data-highlighted:bg-primary/30 outline-hidden flex h-10 w-full select-none items-center rounded-sm py-3 pl-5 pr-1.5 text-sm"
						value={tag.id}
						label={tag.name}
					>
						{tag.name}
					</Combobox.Item>
				{/each}
			</Combobox.Viewport>
			<Combobox.ScrollDownButton class="flex w-full items-center justify-center py-1">
				<ChevronDown size={18} />
			</Combobox.ScrollDownButton>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
