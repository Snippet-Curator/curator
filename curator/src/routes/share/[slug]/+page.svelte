<script lang="ts">
	import NoteContent from './NoteContent.svelte';

	let { data } = $props();
</script>

<div class="h-[calc(100vh-60px)]">
	{#key data.note}
		<NoteContent note={data.note} />
	{/key}
</div>
