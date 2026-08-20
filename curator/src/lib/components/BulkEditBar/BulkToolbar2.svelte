<script lang="ts">
	import { page } from '$app/state';
	import { invalidateAll } from '$app/navigation';

	import {
		archiveMultiple,
		unArchiveMultiple,
		unSoftDeleteMultiple,
		softDeleteMultiple,
		mergeNotes,
		changeNotesNotebook,
		addTagToNotes,
		removeTagFromNotes,
		clearTagsFromNotes
	} from '$lib/api/note.remote';
	import { Delete, EditNotebook, EditBulkTags } from '$lib/components/';

	import BulkNotebook from './bulk-notebook.svelte';
	import BulkTags from './bulk-tags.svelte';
	import BulkArchive from './bulk-archive.svelte';
	import BulkDelete from './bulk-delete.svelte';
	import BulkMerge from './bulk-merge.svelte';
	import { getMouseState } from '$lib/utils.svelte';

	type Props = {
		selectedNotesID: string[];
		isBulkEdit: boolean;
		isArchive?: boolean;
		isTrash?: boolean;
	};

	let {
		selectedNotesID = $bindable(),
		isBulkEdit = $bindable(),
		isArchive = false,
		isTrash = false
	}: Props = $props();

	let isDeleteOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isSelectAll = $state(false);
	const mouseState = getMouseState();

	const currentTagID = $derived(page.route.id?.startsWith('/tags/') ? page.params.slug : '');

	function selectAll(e: Event) {
		const target = e.target as HTMLInputElement;
		if (!isSelectAll) {
			selectedNotesID = [];
			target.blur();
			return;
		}
		// notelistState.notes.items.forEach((item) => {
		// 	selectedNotesID.push(item.id);
		// });
		target.blur();
	}

	function updatePage() {
		invalidateAll();
	}
</script>

<div
	class="bg-base-100/95 border-t-base-200 motion-opacity-in-0 motion-duration-200 motion-scale-in-95 sticky bottom-0 left-0 z-20 flex w-full items-center justify-center border-t py-6 backdrop-blur-2xl 2xl:py-10"
>
	<div class="gap-golden-md flex flex-col items-center md:flex-row">
		<div class="gap-x-golden-md grid auto-cols-min grid-cols-4 md:mr-4">
			<div class="text-right">{selectedNotesID.length}</div>
			<div class="col-span-3">note{selectedNotesID.length > 1 ? 's' : ''} selected</div>
			<div>
				<input type="checkbox" bind:checked={isSelectAll} class="toggle" onchange={selectAll} />
			</div>
			<div class="col-span-3">
				<span>select all on page</span>
			</div>
		</div>

		<div id="button-wrap" class="gap-golden-md grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
			<BulkNotebook {selectedNotesID} bind:isOpen={isEditNotebookOpen} />
			<BulkTags {selectedNotesID} bind:isOpen={isEditTagsOpen} />
			<BulkMerge
				{selectedNotesID}
				merge={async () => {
					mouseState.isBusy = true;

					await mergeNotes(selectedNotesID);
					updatePage();
					selectedNotesID = [];
					isBulkEdit = false;

					mouseState.isBusy = false;
				}}
			></BulkMerge>
			{#if !isTrash}
				<BulkArchive
					{selectedNotesID}
					{isArchive}
					archive={async () => {
						await archiveMultiple(selectedNotesID);
						updatePage();
						isBulkEdit = false;
					}}
					unArchive={async () => {
						await unArchiveMultiple(selectedNotesID);
						updatePage();
						isBulkEdit = false;
					}}
				/>
			{/if}
			<BulkDelete
				{selectedNotesID}
				{isTrash}
				trash={() => (isDeleteOpen = true)}
				restore={async () => {
					await unSoftDeleteMultiple(selectedNotesID);
					updatePage();
					isBulkEdit = false;
				}}
			/>

			<button onclick={() => (isBulkEdit = false)} class="btn btn-soft">Cancel</button>
		</div>
		<!-- button wrap -->
	</div>
</div>

<Delete
	bind:isOpen={isDeleteOpen}
	name="Notes"
	action={async () => {
		await softDeleteMultiple(selectedNotesID);
		updatePage();
		isBulkEdit = false;
	}}>these notes?</Delete
>

<EditNotebook
	bind:isOpen={isEditNotebookOpen}
	action={async (selectedNotebookID) => {
		await changeNotesNotebook({ selectedNotesID, selectedNotebookID });
		updatePage();
		isBulkEdit = false;
	}}
/>

<EditBulkTags
	bind:isOpen={isEditTagsOpen}
	{currentTagID}
	add={async (selectedTagID: string) => {
		await addTagToNotes({ selectedNotesID, selectedTagID });
		updatePage();
	}}
	remove={async (selectedTagID: string) => {
		await removeTagFromNotes({ selectedNotesID, selectedTagID });
		updatePage();
	}}
	clearAll={async () => {
		await clearTagsFromNotes(selectedNotesID);
		updatePage();
	}}
/>
