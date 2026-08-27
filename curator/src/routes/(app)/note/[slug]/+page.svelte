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

	import { getMobileState } from '$lib/utils.svelte';
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
		changeTitle,
		changeDescription,
		changeThumbnail,
		changeSources,
		updateTags
	} from '$lib/api/note.remote';

	const mobileState = getMobileState();
	let noteID = page.params.slug ?? '';
	let note = $derived(await getNote(noteID));

	let isDeleteOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditNoteOpen = $state(false);
	let isPermaDeleteNoteOpen = $state(false);
	let isShareNoteOpen = $state(false);

	updateLastOpened(page.params.slug ?? '');
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
	{#if note?.expand?.tags}
		<Topbar.Tags tags={note.expand.tags} />
	{/if}
	<Topbar.TagBtn bind:isOpen={isEditTagsOpen} />
	{#if note?.expand?.notebook}
		<Topbar.Notebook bind:isOpen={isEditNotebookOpen} notebook={note.expand.notebook} />
	{/if}
	<Topbar.Rating
		rating={note?.rating ?? 0}
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
					isShared={note?.is_shared}
				/>

				<Topbar.Archive
					noteStatus={note?.status ?? 'active'}
					archive={async () => {
						await archiveNote(noteID);
						window.history.back();
					}}
					unarchive={async () => {
						await restoreNote(noteID);
						window.history.back();
					}}
				/>
				<Topbar.Delete
					noteStatus={note?.status ?? 'active'}
					bind:isOpen={isDeleteOpen}
					trash={async () => await softDeleteNote(noteID)}
					restore={async () => await restoreNote(noteID)}
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
			isShared={note?.is_shared}
		/>

		<Topbar.Archive
			noteStatus={note?.status ?? 'active'}
			archive={async () => {
				await archiveNote(noteID);
				window.history.back();
			}}
			unarchive={async () => {
				await restoreNote(noteID);
				await getNote(noteID).refresh();
			}}
		/>
		<Topbar.Delete
			noteStatus={note?.status ?? 'active'}
			bind:isOpen={isDeleteOpen}
			trash={async () => await softDeleteNote(noteID)}
			restore={async () => await restoreNote(noteID)}
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
		await softDeleteNote(noteID);
		window.history.back();
	}}>this note</Delete
>

<Delete
	bind:isOpen={isPermaDeleteNoteOpen}
	name="Note"
	action={async () => {
		await permaDeleteNote(noteID);
		window.history.back();
	}}>this note permanently</Delete
>

<EditTags
	bind:isOpen={isEditTagsOpen}
	currentTags={note?.expand?.tags}
	update={async (selectedTags) => {
		await updateTags({ noteID, selectedTags });
		getNote(noteID).refresh();
	}}
/>

<EditNotebook
	currentNotebookID={note?.expand?.notebook?.id}
	bind:isOpen={isEditNotebookOpen}
	action={async (selectedNotebookID) => {
		await changeNoteNotebook({ noteID, newNotebookID: selectedNotebookID });
		await getNote(noteID).refresh();
	}}
></EditNotebook>

<EditNote
	{note}
	thumbURL={note?.thumbnail}
	bind:isOpen={isEditNoteOpen}
	action={async (newTitle, newDescription, sources, selectedThumbnailURL) => {
		await changeTitle({ noteID, newTitle });
		await changeDescription({ noteID, newDescription });
		await changeSources({ noteID, newSources: sources });
		await changeThumbnail({ noteID, url: selectedThumbnailURL });
		await getNote(noteID).refresh();
	}}
></EditNote>

<ShareNote
	{note}
	unshare={async () => {
		await unshareNote(noteID);
		await getNote(noteID).refresh();
	}}
	bind:isOpen={isShareNoteOpen}
></ShareNote>
