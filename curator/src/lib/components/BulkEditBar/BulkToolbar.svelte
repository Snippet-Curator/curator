<script lang="ts">
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';

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
	import { guiUpdate } from '$lib/state/ui.svelte';
	import { Delete, EditNotebook, EditBulkTags } from '$lib/components/';

	import BulkNotebook from './bulk-notebook.svelte';
	import BulkTags from './bulk-tags.svelte';
	import BulkArchive from './bulk-archive.svelte';
	import BulkDelete from './bulk-delete.svelte';
	import BulkMerge from './bulk-merge.svelte';
	import { getMouseState } from '$lib/state/ui.svelte';
	import type { Note } from '$lib/types';
	import { resubscribeToPocketNotes } from '$lib/utils';
	import { tick } from 'svelte';

	type Props = {
		selectedNotesID: string[];
		notes: Note[];
		isBulkEdit: boolean;
		isArchive?: boolean;
		isTrash?: boolean;
		update: () => Promise<void>;
	};

	let {
		selectedNotesID = $bindable(),
		notes,
		isBulkEdit = $bindable(),
		isArchive = false,
		isTrash = false,
		update
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
		notes.forEach((item) => {
			selectedNotesID.push(item.id);
		});
		target.blur();
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
					guiUpdate.suppressRefresh = true;
					isBulkEdit = false;
					await tick();

					const mergePromise = mergeNotes(selectedNotesID);

					toast.promise(mergePromise, {
						loading: `Merging ${selectedNotesID.length} notes...`,
						success: `Merged ${selectedNotesID.length} notes`,
						error: 'Failed to merge notes.'
					});

					await mergePromise;
					guiUpdate.suppressRefresh = false;
					await resubscribeToPocketNotes();
					selectedNotesID = [];
					update();
				}}
			></BulkMerge>
			{#if !isTrash}
				<BulkArchive
					{selectedNotesID}
					{isArchive}
					archive={async () => {
						isBulkEdit = false;
						await tick();
						const promise = archiveMultiple(selectedNotesID);
						toast.promise(promise, {
							loading: `Archiving ${selectedNotesID.length} notes...`,
							success: `Archived ${selectedNotesID.length} notes`,
							error: 'Failed to archive notes.'
						});
						await promise;
						selectedNotesID = [];
						update();
					}}
					unArchive={async () => {
						isBulkEdit = false;
						await tick();
						const promise = unArchiveMultiple(selectedNotesID);
						toast.promise(promise, {
							loading: `Restoring ${selectedNotesID.length} notes...`,
							success: `Restored ${selectedNotesID.length} notes`,
							error: 'Failed to unarchive notes.'
						});
						await promise;
						selectedNotesID = [];
						update();
					}}
				/>
			{/if}
			<BulkDelete
				{selectedNotesID}
				{isTrash}
				trash={() => (isDeleteOpen = true)}
				restore={async () => {
					isBulkEdit = false;
					await tick();
					const promise = unSoftDeleteMultiple(selectedNotesID);
					toast.promise(promise, {
						loading: `Restoring ${selectedNotesID.length} notes...`,
						success: `Restored ${selectedNotesID.length} notes`,
						error: 'Failed to restore notes.'
					});
					await promise;
					selectedNotesID = [];
					update();
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
		isBulkEdit = false;
		await tick();
		const promise = softDeleteMultiple(selectedNotesID);
		toast.promise(promise, {
			loading: `Deleting ${selectedNotesID.length} notes...`,
			success: `Deleted ${selectedNotesID.length} notes`,
			error: 'Failed to delete notes.'
		});
		await promise;
		selectedNotesID = [];
		update();
	}}>these notes?</Delete
>

<EditNotebook
	bind:isOpen={isEditNotebookOpen}
	action={async (newNotebookID) => {
		await changeNotesNotebook({ selectedNotesID, newNotebookID });
		selectedNotesID = [];
		isBulkEdit = false;
		update();
	}}
/>

<EditBulkTags
	bind:isOpen={isEditTagsOpen}
	{currentTagID}
	add={async (selectedTagID: string) => {
		await addTagToNotes({ selectedNotesID, selectedTagID });
		update();
	}}
	remove={async (selectedTagID: string) => {
		await removeTagFromNotes({ selectedNotesID, selectedTagID });
		update();
	}}
	clearAll={async () => {
		await clearTagsFromNotes(selectedNotesID);
		update();
	}}
/>
