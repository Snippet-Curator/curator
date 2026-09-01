<script lang="ts">
	import { page } from '$app/state';
	import {
		NoteContent,
		Delete,
		EditNotebook,
		EditTags,
		NoteLoading,
		EditNote,
		ShareNote
	} from '$lib/components/';
	import * as Topbar from '$lib/components/Topbar/index';

	import { getMobileState } from '$lib/state/ui.svelte';
	import {
		changeRating,
		getNote,
		updateLastOpened,
		shareNote,
		unshareNote,
		archiveNote,
		restoreNote,
		softDeleteNote,
		permaDeleteNote,
		changeNoteNotebook,
		updateTags,
		updateNote
	} from '$lib/api/note.remote';
	import { toast } from 'svelte-sonner';

	const mobileState = getMobileState();
	let noteID = page.params.slug!;
	let note = $derived(await getNote(noteID));

	let isDeleteOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditNoteOpen = $state(false);
	let isPermaDeleteNoteOpen = $state(false);
	let isShareNoteOpen = $state(false);

	updateLastOpened(noteID);
</script>

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
	<Topbar.Rating
		rating={note.rating ?? 0}
		action={async (newRating) => {
			await changeRating({
				noteID,
				newRating
			});
		}}
	/>

	{#if mobileState.isMobile}
		<Topbar.More>
			{#snippet renderMore()}
				<Topbar.Edit bind:isOpen={isEditNoteOpen} />

				<Topbar.Share
					share={async () => await shareNote(noteID)}
					bind:isOpen={isShareNoteOpen}
					isShared={note.is_shared}
				/>

				<Topbar.Archive
					noteStatus={note.status}
					archive={async () => {
						const promise = archiveNote(noteID);

						toast.promise(promise, {
							loading: `Archiving note...`,
							success: `Archived note.`,
							error: 'Failed to archive note.'
						});

						await promise;

						window.history.back();
					}}
					unarchive={async () => {
						const promise = restoreNote(noteID);

						toast.promise(promise, {
							loading: `Restoring note...`,
							success: `Restored note.`,
							error: 'Failed to restore note.'
						});

						await promise;
						await getNote(noteID).refresh();
					}}
				/>
				<Topbar.Delete
					noteStatus={note.status}
					bind:isOpen={isDeleteOpen}
					restore={async () => {
						const promise = restoreNote(noteID);

						toast.promise(promise, {
							loading: `Restoring note...`,
							success: `Restored note.`,
							error: 'Failed to restore note.'
						});

						await promise;
						await getNote(noteID).refresh();
					}}
					bind:isPermaDeleteNoteOpen
				/>
				<Topbar.Info {note} />
			{/snippet}
		</Topbar.More>
	{:else}
		<div class="divider divider-horizontal"></div>
		<Topbar.Edit bind:isOpen={isEditNoteOpen} />

		<Topbar.Share
			share={async () => {
				await shareNote(noteID);
				await getNote(noteID).refresh();
			}}
			bind:isOpen={isShareNoteOpen}
			isShared={note.is_shared}
		/>

		<Topbar.Archive
			noteStatus={note.status}
			archive={async () => {
				const promise = archiveNote(noteID);

				toast.promise(promise, {
					loading: `Archiving note...`,
					success: `Archived note.`,
					error: 'Failed to archive note.'
				});

				await promise;
				window.history.back();
			}}
			unarchive={async () => {
				const promise = restoreNote(noteID);

				toast.promise(promise, {
					loading: `Restoring note...`,
					success: `Restored note.`,
					error: 'Failed to restore note.'
				});

				await promise;
				await getNote(noteID).refresh();
			}}
		/>
		<Topbar.Delete
			noteStatus={note.status}
			bind:isOpen={isDeleteOpen}
			restore={async () => {
				const promise = restoreNote(noteID);

				toast.promise(promise, {
					loading: `Restoring note...`,
					success: `Restored note.`,
					error: 'Failed to restore note.'
				});

				await promise;
				await getNote(noteID).refresh();
			}}
			bind:isPermaDeleteNoteOpen
		/>
		<Topbar.Info {note} />
	{/if}
</Topbar.Root>
<div class="h-[calc(100vh-60px)]">
	<NoteContent {note} />
</div>

<Delete
	bind:isOpen={isDeleteOpen}
	name="Note"
	action={async () => {
		const promise = softDeleteNote(noteID);

		toast.promise(promise, {
			loading: `Deleting note...`,
			success: `Deleted note.`,
			error: 'Failed to delete note.'
		});

		await promise;
		window.history.back();
	}}>this note</Delete
>

<Delete
	bind:isOpen={isPermaDeleteNoteOpen}
	name="Note"
	action={async () => {
		const promise = permaDeleteNote(noteID);

		toast.promise(promise, {
			loading: `Deleting note...`,
			success: `Deleted note.`,
			error: 'Failed to delete note.'
		});

		await promise;
		window.history.back();
	}}>this note permanently</Delete
>

{#if note.expand?.tags}
	<EditTags
		bind:isOpen={isEditTagsOpen}
		currentTags={note.expand?.tags}
		update={async (selectedTags) => {
			await updateTags({ noteID, selectedTags });
			getNote(noteID).refresh();
		}}
	/>
{/if}

<EditNotebook
	currentNotebookID={note.expand?.notebook?.id}
	bind:isOpen={isEditNotebookOpen}
	action={async (selectedNotebookID) => {
		await changeNoteNotebook({ noteID, newNotebookID: selectedNotebookID });
		await getNote(noteID).refresh();
	}}
></EditNotebook>

<EditNote
	{note}
	thumbURL={note.thumbnail}
	bind:isOpen={isEditNoteOpen}
	action={async (title, description, sources, thumbnail) => {
		await updateNote({
			noteID,
			updates: {
				title,
				description,
				sources,
				thumbnail
			}
		});
		await getNote(noteID).refresh();
	}}
></EditNote>

<ShareNote
	{note}
	unshare={async () => {
		const promise = unshareNote(noteID);

		toast.promise(promise, {
			loading: `Unsharing note...`,
			success: `Unshared note.`,
			error: 'Failed to unshare note.'
		});

		await promise;
		await getNote(noteID).refresh();
	}}
	bind:isOpen={isShareNoteOpen}
></ShareNote>
