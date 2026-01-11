<script lang="ts">
	import { fullTextSearch } from '$lib/search.svelte';
</script>

test page

{#await fullTextSearch()}{/await}
