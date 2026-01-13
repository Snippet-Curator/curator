<script lang="ts">
	import { page } from '$app/state';
	import {
		NoteContent,
		Delete,
		EditNotebook,
		EditTags,
		NoteLoading,
		EditNote
	} from '$lib/components/';
	import { NoteState } from '$lib/db.svelte';
	import * as Topbar from '$lib/components/Topbar/index';

	import { getMobileState } from '$lib/utils.svelte';

	const noteState = new NoteState(page.params.slug);
	const mobileState = getMobileState();
	let note = $derived(noteState.note);

	let isDeleteOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditNoteOpen = $state(false);
	let isPermaDeleteNoteOpen = $state(false);

	const initialLoading = noteState.getNote();
	noteState.updateLastOpened();
</script>

{#await initialLoading}
	<div class="h-[calc(100vh-60px)]">
		<NoteLoading />
	</div>
{:then}
	<Topbar.Root>
		<Topbar.SidebarIcon></Topbar.SidebarIcon>
		<Topbar.Back />
		<div class="grow"></div>
		{#if note.expand?.tags}
			<Topbar.Tags tags={note.expand.tags} />
		{/if}
		<Topbar.TagBtn bind:isOpen={isEditTagsOpen} />
		{#if note.expand?.notebook}
			<Topbar.Notebook bind:isOpen={isEditNotebookOpen} notebook={note.expand.notebook} />
		{/if}

		{#if !mobileState.isMobile}
			<Topbar.Rating
				rating={note.rating}
				action={async (newRating) => {
					await noteState.changeRating(newRating);
				}}
			/>
			<div class="divider divider-horizontal"></div>
		{/if}

		<Topbar.Edit bind:isOpen={isEditNoteOpen} />

		<Topbar.Archive
			noteStatus={noteState.note.status}
			archive={async () => {
				await noteState.archiveNote();
				window.history.back();
			}}
			unarchive={async () => {
				await noteState.restoreNote();
				window.history.back();
			}}
		/>
		<Topbar.Delete
			noteStatus={noteState.note.status}
			bind:isOpen={isDeleteOpen}
			restore={async () => await noteState.restoreNote()}
			bind:isPermaDeleteNoteOpen
		/>
		<Topbar.Info {note} />
	</Topbar.Root>
	<div class="h-[calc(100vh-60px)]">
		<NoteContent {noteState} />
	</div>

	<Delete
		bind:isOpen={isDeleteOpen}
		name="Note"
		action={async () => {
			await noteState.softDeleteNote();
			window.history.back();
		}}>this note</Delete
	>

	<Delete
		bind:isOpen={isPermaDeleteNoteOpen}
		name="Note"
		action={async () => {
			await noteState.permaDeleteNote();
			window.history.back();
		}}>this note permanently</Delete
	>

	<EditTags
		bind:isOpen={isEditTagsOpen}
		currentTags={note.expand?.tags}
		add={async (selectedTags) => await noteState.addTag(selectedTags)}
		remove={async (selectedTags) => await noteState.removeTag(selectedTags)}
	/>

	<EditNotebook
		currentNotebookID={note.expand?.notebook.id}
		bind:isOpen={isEditNotebookOpen}
		action={async (selectedNotebookID) => {
			await noteState.changeNotebook(selectedNotebookID);
		}}
	></EditNotebook>

	<EditNote
		{note}
		thumbURL={note?.thumbnail}
		bind:isOpen={isEditNoteOpen}
		action={async (title, description, sources, selectedThumbnailURL) => {
			await noteState.changeTitle(title);
			await noteState.changeDescription(description);
			await noteState.changeSources(sources);
			await noteState.changeThumbnail(selectedThumbnailURL);
			await noteState.getNote();
		}}
	></EditNote>
{/await}
