<script lang="ts">
	import { Combobox } from 'bits-ui';
	import type { Notebook } from '$lib/types';
	import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-svelte';

	type Props = {
		notebooks: Notebook[];
		selectedNotebookID: string;
	};

	let { notebooks, selectedNotebookID = $bindable('') }: Props = $props();

	let searchValue = $state('');

	const filteredNotebooks = $derived(
		notebooks.filter((notebook) => {
			return notebook.name.toLowerCase().includes(searchValue.toLowerCase());
		})
	);

	const selectedNotebookName = $derived.by(() => {
		const selectedNotebookArray = notebooks.filter((notebook) => notebook.id == selectedNotebookID);

		if (selectedNotebookArray.length == 0) return '';

		const notebookName = selectedNotebookArray[0].name;

		return notebookName;
	});
</script>

<Combobox.Root bind:value={selectedNotebookID} inputValue={selectedNotebookName} type="single">
	<div class="relative h-10">
		<Combobox.Input
			placeholder="Search notebooks..."
			class="input w-full"
			oninput={(e) => {
				searchValue = e.currentTarget.value;
			}}
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
				{#each filteredNotebooks as notebook}
					<Combobox.Item
						class="rounded-button data-highlighted:bg-primary/30 outline-hidden flex h-10 w-full select-none items-center rounded-sm py-3 pl-5 pr-1.5 text-sm"
						value={notebook.id}
						label={notebook.name}
					>
						{notebook.name}
					</Combobox.Item>
				{/each}
			</Combobox.Viewport>
			<Combobox.ScrollDownButton class="flex w-full items-center justify-center py-1">
				<ChevronDown size={18} />
			</Combobox.ScrollDownButton>
		</Combobox.Content>
	</Combobox.Portal>
</Combobox.Root>
