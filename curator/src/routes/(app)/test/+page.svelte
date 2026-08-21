<script lang="ts">
	import { fetchYoutubePlaylist } from './youtube';

	let { data } = $props();

	const playlist = 'PLWaHMoScaN1ZhqWur8-J6rsiaLf6zVWJ4';

	console.log('returned data', data);
</script>

<svelte:boundary>
	{#snippet pending()}
		Fetching...
	{/snippet}

	{#snippet failed(err)}
		Fetch failed: {err}
	{/snippet}
</svelte:boundary>
