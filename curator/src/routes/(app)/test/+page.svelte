<script lang="ts">
	import { getSettingState } from '$lib/setting.svelte';
	import { fetchYoutubePlaylist } from './youtube';
	const settingState = getSettingState();

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

	<!-- {@const youtubePlaylist = await fetchYoutubePlaylist(settingState.youtubeAPIKey ?? '', playlist)}

	{JSON.stringify(youtubePlaylist, null, 2)} -->
</svelte:boundary>
