<script lang="ts">
	import { NoteList } from '$lib/components';
	import { getNotebookState, getNotelistState, setNotelistState } from '$lib/db.svelte';
	import type { NoteType } from '$lib/types';

	let notebookID = 'homepage';
	const noteType: NoteType = {
		type: 'default'
	};


	let isBulkEdit = false
	let selectedNotesID = $state()

	setNotelistState(notebookID, noteType);

</script>

<svelte:boundary>
	{#snippet pending()}
		hello
	{/snippet}

	{#snippet failed(err)}
		{err}
	{/snippet}
	

	{@const notelistState = await getNotelistState(notebookID)}

	{notelistState.notes.totalItems}

	<NoteList
				{isBulkEdit}
				update={()=>null}
				bind:selectedNotesID
				notes={notelistState.notes}
			/>
</svelte:boundary>
