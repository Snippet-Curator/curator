<script lang="ts">
	import {
		NoteContent,
		Delete,
		EditNotebook,
		EditTags,
		Navbar,
		EditNote,
		NoteLoading
	} from '$lib/components/';

	import * as Topbar from '$lib/components/Topbar/index';
	import { getMobileState } from '$lib/state/ui.svelte';

	import {
		archiveNote,
		changeDescription,
		changeNoteNotebook,
		changeRating,
		changeSources,
		updateTags,
		changeThumbnail,
		changeTitle,
		getNote,
		getNotes,
		restoreNote,
		softDeleteNote,
		updateLastOpened
	} from '$lib/api/note.remote';
	import type { NoteQuery } from '$lib/types';

	import FilterDiscover from './FilterDiscover.svelte';
	import { onMount, tick } from 'svelte';

	let query = $state<NoteQuery>({
		page: 1,
		search: '',
		notebookID: '',
		fullContent: true,
		fullTextSearch: false,
		tagIDs: [],
		excludedTagIDs: [],
		status: 'active',
		sort: '-score'
	});

	const mobileState = getMobileState();

	let result = $derived(await getNotes(query));
	let noteIndex = $state(0);
	let note = $derived(result?.items[noteIndex]);
	let noteID = $derived(note?.id ?? '');
	let lastItemIndex = $derived(result?.perPage ?? 30);

	let isDeleteOpen = $state(false);
	let isEditTagsOpen = $state(false);
	let isEditNotebookOpen = $state(false);
	let isEditNoteOpen = $state(false);

	let isFilterSearch = $state(false);

	async function getNextNote() {
		if (noteIndex == 23) {
			await getNotes(query).refresh();
			noteIndex = 0;
		}

		noteIndex++;

		await tick();

		if (note?.id) {
			await updateLastOpened(note.id);
		}
	}

	async function getPreviousNote() {
		if (noteIndex == 0) return;

		noteIndex--;
	}

	onMount(() => {
		if (noteID) {
			updateLastOpened(noteID);
		}
	});
</script>

{#if note}
	<Topbar.Root>
		<Topbar.SidebarIcon></Topbar.SidebarIcon>
		{#if !mobileState.isMobile}
			<Topbar.NavBtns
				currentIndex={noteIndex}
				{lastItemIndex}
				onLeft={getPreviousNote}
				onRight={getNextNote}
			></Topbar.NavBtns>
		{/if}
		<Topbar.Filter bind:isOpen={isFilterSearch} />
		<!-- {note.score.toFixed(2)} -->
		<div class="hidden grow md:block"></div>

		{#if note?.expand?.tags}
			<Topbar.Tags tags={note.expand.tags} />
		{/if}
		<Topbar.TagBtn bind:isOpen={isEditTagsOpen} />
		{#if note?.expand?.notebook}
			<Topbar.Notebook bind:isOpen={isEditNotebookOpen} notebook={note.expand.notebook} />
		{/if}

		{#if !mobileState.isMobile}
			<Topbar.Rating
				rating={note.rating}
				action={(newRating) => {
					changeRating({ noteID: note.id, newRating });
				}}
			/>
		{/if}
		<div class="divider divider-horizontal hidden md:flex"></div>

		<Topbar.Edit bind:isOpen={isEditNoteOpen} />

		<Topbar.Archive
			noteStatus={note.status}
			archive={() => {
				archiveNote(note.id);
				getNextNote();
			}}
			unarchive={() => {
				restoreNote(note.id);
				getNextNote();
			}}
		/>
		<Topbar.Delete noteStatus={note.status} bind:isOpen={isDeleteOpen} />
		<Topbar.Info {note} />
	</Topbar.Root>

	<div class="h-[calc(100vh-60px)]">
		{#key noteIndex}
			<NoteContent {note} />
		{/key}
	</div>

	<Navbar class="p-golden-md bg-base-100 flex flex-col items-end gap-y-2 rounded-md">
		<div class="flex flex-row gap-x-2">
			<Topbar.NavBtns
				currentIndex={noteIndex}
				{lastItemIndex}
				onLeft={getPreviousNote}
				onRight={getNextNote}
			></Topbar.NavBtns>
		</div>
		<Topbar.Rating
			rating={note.rating}
			action={(newRating) => {
				changeRating({ noteID: note.id, newRating });
			}}
		/>
	</Navbar>
{:else}
	<div class="grid h-screen place-items-center">
		<NoteLoading />
		<br />
	</div>
{/if}

{#if note}
	<Delete
		bind:isOpen={isDeleteOpen}
		name="Note"
		action={() => {
			softDeleteNote(note.id);
			getNextNote();
		}}>this note</Delete
	>

	<EditNotebook
		currentNotebookID={note.expand?.notebook.id}
		bind:isOpen={isEditNotebookOpen}
		action={(newNotebookID) => {
			changeNoteNotebook({ noteID: note.id, newNotebookID });
		}}
	></EditNotebook>

	<EditTags
		bind:isOpen={isEditTagsOpen}
		currentTags={note?.expand?.tags}
		update={async (selectedTags) => {
			await updateTags({ noteID, selectedTags });
			getNote(noteID).refresh();
		}}
	/>

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

	<FilterDiscover
		bind:query
		bind:isOpen={isFilterSearch}
		search={() => {
			noteIndex = 0;
		}}
	/>
{/if}
