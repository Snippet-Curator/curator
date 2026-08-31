<script lang="ts">
	import NoteContent from './NoteContent.svelte';
	import type { Note } from '$lib/types';

	type Props = {
		data: {
			note: Note;
		};
	};

	let { data }: Props = $props();
</script>

<div class="h-[calc(100vh-60px)]">
	{#key data.note}
		<NoteContent note={data.note} />
	{/key}
</div>
