<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';

	import { getSetting, changeSetting } from '$lib/api/setting.remote';
	import { getMyPlaylists } from '$lib/api/youtube.remote';

	let youtubeAPI = $derived(await getSetting('youtubeAPIKey'));
	let showPlaylists = $state(false);
</script>

<div class="gap-x-golden-md grid grid-cols-12 items-center">
	<div class="col-span-12 md:col-span-4">
		<legend class="fieldset-legend">Youtube API Key</legend>
		<span class="text-base-content/70"> Used to add youtube videos.</span>
	</div>

	<div class="col-span-12 md:col-span-8">
		<!-- <InputText
			textInput={youtubeAPI}
			action={async (newAPI) => {
				await changeSetting({ name: 'youtubeAPIKey', newValue: newAPI });
				await getSetting('youtubeAPIKey').refresh();
				console.log('Changed setting, youtube API:', newAPI);
			}}
		/> -->
		<a href="/youtube"> <button class="btn">Connect to Youtube</button></a>
	</div>

	<div class="col-span-12 md:col-span-4">
		<button class="btn" onclick={() => (showPlaylists = true)}>Fetch Youtube Playlists</button>
	</div>
</div>

{#if showPlaylists}
	{#await getMyPlaylists()}
		<p>Loading Playlists</p>
	{:then playlists}
		{#each playlists as playlist (playlist.id)}
			{playlist.snippet.title}
		{/each}
	{:catch error}
		<p>Error loading playlists: {error.message}</p>
	{/await}
{/if}
