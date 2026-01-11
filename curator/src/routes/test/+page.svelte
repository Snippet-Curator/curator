<script lang="ts">
	import { getNotebookState } from '$lib/db.svelte';
	import { fullTextSearch } from '$lib/search.svelte';
</script>

<svelte:boundary>
	{#snippet pending()}
		hello
	{/snippet}

	{#snippet failed(err)}
		{err}
	{/snippet}

	{@const notebookState = getNotebookState()}

	{notebookState.totalNoteCount}
</svelte:boundary>
