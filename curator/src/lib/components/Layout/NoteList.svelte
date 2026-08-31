<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import * as ContextMenu from '$lib/components/ui/context-menu/index';
	import { Delete, EditNotebook, EditTags, NoteLoading, EditNote } from '$lib/components/';

	import type { Note } from '$lib/types';
	import {
		getNote,
		archiveNote,
		softDeleteNote,
		changeNoteNotebook,
		changeTitle,
		changeDescription,
		changeThumbnail,
		changeSources,
		updateTags
	} from '$lib/api/note.remote';
	import { replacePbUrl } from '$lib/utils';
	import { getSetting } from '$lib/api/setting.remote';

	type Props = {
		isBulkEdit: boolean;
		notes: Note[];
		selectedNotesID: string[];
		update: () => Promise<void>;
	};

	let { notes, isBulkEdit = false, selectedNotesID = $bindable(), update }: Props = $props();

	const isNsfwBlur = $derived(await getSetting('nsfwBlur'));

	let selectedNote = $state<Note>();
	let selectedNoteID = $state('');

	const selectedNoteTags = $derived(selectedNote?.expand?.tags ?? []);

	let isDeleteOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditNoteOpen = $state(false);

	function checkListNote(checkedNoteID: string) {
		// remove note if already in the list
		if (selectedNotesID.includes(checkedNoteID)) {
			selectedNotesID = selectedNotesID.filter((noteID: string) => noteID != checkedNoteID);
			return;
		}
		// add note to the list
		selectedNotesID.push(checkedNoteID);
	}
</script>

{#snippet renderNotes(note: Note)}
	{#key note.thumbnail}
		<figure class="motion-opacity-in-0 motion-duration-300 w-full">
			<img
				class="{note.expand?.tags?.some((tag) => tag.name === 'nsfw') && isNsfwBlur
					? 'blur-2xl'
					: ''} w-full"
				src={replacePbUrl(note.thumbnail)}
				alt=""
			/>
		</figure>
	{/key}
	<div id="card-body" class="card-body p-golden-lg w-full">
		<div
			id="card-title"
			class="{note.expand?.tags?.some((tag) => tag.name === 'nsfw') && isNsfwBlur
				? 'font-redacted hover:font-display'
				: ''} card-title overflow-hidden text-left text-pretty break-words text-ellipsis"
		>
			{note.title}
		</div>

		{#if !note.thumbnail}
			<p
				class="{note.expand?.tags?.some((tag) => tag.name === 'nsfw') && isNsfwBlur
					? 'font-redacted hover:font-display'
					: ''} line-clamp-3 text-left text-pretty"
			>
				{note.description}
			</p>
		{/if}
		<div class="group gap-golden-sm flex flex-wrap items-center">
			{#if note.expand?.notebook}
				<span class="badge badge-soft text-base-content/50 rounded-sm"
					>{note.expand?.notebook.name}</span
				>
			{/if}
			{#if note.expand?.tags}
				{#each note.expand?.tags as tag}
					<span
						class="badge text-base-content/50 group-hover:text-base-content/70 text-nowrap transition-colors duration-200"
						>#{tag.name}</span
					>
				{/each}
			{/if}
		</div>
	</div>
{/snippet}

<svelte:boundary>
	<div
		class="p-golden-md md:p-golden-lg lg:p-golden-xl gap-golden-lg space-y-golden-lg lg:gap-golden-xl lg:space-y-golden-xl relative mb-80 columns-1 md:mb-64 md:columns-2 lg:mb-32 lg:columns-3 2xl:columns-4"
	>
		{#if notes.length > 0}
			{#each notes as note}
				<div class="group relative">
					<ContextMenu.Root>
						<ContextMenu.Trigger>
							<button
								class="{[
									selectedNotesID.includes(note.id) &&
										'bg-primary/50 hover:bg-primary/60 opacity-100',
									isBulkEdit ? 'opacity-70' : ''
								]} card motion-preset-fade motion-duration-200 hover:bg-base-200/70 bg-base-100 card-border w-full border hover:cursor-pointer"
								onclick={() => {
									if (isBulkEdit) {
										checkListNote(note.id);
										return;
									}
									goto(`/note/${note.id}`);
								}}
							>
								{@render renderNotes(note)}
							</button>
						</ContextMenu.Trigger>
						<ContextMenu.Content>
							<ContextMenu.Item
								onSelect={async () => {
									selectedNoteID = note.id;

									isEditNoteOpen = true;
								}}>Edit</ContextMenu.Item
							>
							<ContextMenu.Item
								onSelect={async () => {
									selectedNoteID = note.id;
									isEditNotebookOpen = true;
								}}>Edit Notebook</ContextMenu.Item
							>
							<ContextMenu.Item
								onSelect={async () => {
									selectedNoteID = note.id;
									selectedNote = await getNote(selectedNoteID);
									isEditTagsOpen = true;
								}}>Edit Tags</ContextMenu.Item
							>
							<ContextMenu.Item
								onSelect={async () => {
									const promise = archiveNote(note.id);
									toast.promise(promise, {
										loading: `Archiving note...`,
										success: `Archived note`,
										error: 'Failed to archive note.'
									});
									await promise;
									update();
								}}>Archive</ContextMenu.Item
							>
							<ContextMenu.Separator />
							<ContextMenu.Item
								onSelect={async () => {
									selectedNoteID = note.id;
									isDeleteOpen = true;
								}}>Delete</ContextMenu.Item
							>
						</ContextMenu.Content>
					</ContextMenu.Root>
				</div>
			{/each}
		{:else}
			<NoteLoading />
		{/if}
	</div>

	{#snippet failed()}
		Notelist Failed to Render
	{/snippet}
</svelte:boundary>

<!-- <svelte:boundary> -->
{#if selectedNoteID}
	<Delete
		bind:isOpen={isDeleteOpen}
		name="Note"
		action={async () => {
			const promise = softDeleteNote(selectedNoteID);
			toast.promise(promise, {
				loading: `Deleting note...`,
				success: `Deleted note`,
				error: 'Failed to delete note.'
			});
			await promise;
			update();
		}}>this note</Delete
	>

	{#if selectedNote}
		<EditNotebook
			currentNotebookID={selectedNote.expand?.notebook?.id}
			bind:isOpen={isEditNotebookOpen}
			action={async (selectedNotebookID) => {
				await changeNoteNotebook({ noteID: selectedNoteID, newNotebookID: selectedNotebookID });
				update();
			}}
		></EditNotebook>

		<EditTags
			bind:isOpen={isEditTagsOpen}
			currentTags={selectedNoteTags}
			update={async (selectedTags) => {
				await updateTags({ noteID: selectedNoteID, selectedTags });
				update();
				selectedNote = await getNote(selectedNoteID).refresh();
			}}
		/>

		<EditNote
			note={selectedNote}
			thumbURL={selectedNote?.thumbnail}
			bind:isOpen={isEditNoteOpen}
			action={async (newTitle, newDescription, sources, selectedThumbnailURL) => {
				await changeTitle({ noteID: selectedNoteID, newTitle });
				await changeDescription({ noteID: selectedNoteID, newDescription });
				await changeSources({ ntoeID: selectedNoteID, newSources: sources });
				await changeThumbnail({ noteID: selectedNoteID, url: selectedThumbnailURL });
				selectedNote = await getNote(selectedNoteID).refresh();
				update();
			}}
		></EditNote>
	{/if}
{/if}
<!-- {#snippet failed(error)}
		Dialogs Failed to Render: {error}
	{/snippet}
</svelte:boundary> -->
