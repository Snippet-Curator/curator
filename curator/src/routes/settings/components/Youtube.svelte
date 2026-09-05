<script lang="ts">
	import { importPlaylist } from '$lib/api/import.remote';

	// import InputText from '$lib/components/Layout/InputText.svelte';

	import { getYoutubeSettings } from '$lib/api/setting.remote';
	import { getMyPlaylists } from '$lib/api/youtube.remote';

	let youtubeSettings = $derived(await getYoutubeSettings());
	let showPlaylists = $state(false);
</script>

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-base-content/70 mb-golden-lg text-xl tracking-widest uppercase">
			Youtube
		</div>
		<div class="gap-y-golden-md flex flex-col">
			<div class="gap-x-golden-md grid grid-cols-12 items-center">
				<div class="col-span-12 md:col-span-6">
					<!-- <legend class="fieldset-legend">Connect to Youtube</legend> -->
					<span class="text-base-content/70"
						>You must place Youtube API client ID and client secret in .env file first before you
						connect. Importing playlist will move successfully imported videos to "Curator Saved"
						playlist and unsuccessful imports to "Curator Error" playlist.</span
					>
				</div>

				<div class="col-span-12 md:col-span-2"></div>

				<div class="gap-y-golden-md col-span-12 flex flex-col justify-end md:col-span-4">
					{#if youtubeSettings.youtubeRefreshToken}
						<a href="/youtube"> <button class="btn w-full">Reconnect to Youtube</button></a>
						<button class="btn w-full" onclick={() => (showPlaylists = true)}
							>Fetch Youtube Playlists</button
						>
					{:else}
						<a href="/youtube"> <button class="btn w-full">Connect to Youtube</button></a>
					{/if}
				</div>
			</div>
		</div>

		{#if showPlaylists}
			<div class="divider mb-0"></div>
			{#await getMyPlaylists()}
				<p>Loading Playlists</p>
			{:then playlists}
				<ul class="list">
					{#each playlists as playlist (playlist.id)}
						<li class="list-row">
							<div class="list-col-grow">
								<img alt="playlist thumbnail" src={playlist.snippet.thumbnails.medium.url} />
								{playlist.snippet.title}
								{playlist.contentDetails.itemCount}
							</div>
							<button onclick={async () => await importPlaylist(playlist.id)} class="btn"
								>Import Playlist</button
							>
						</li>
					{/each}
				</ul>
			{:catch error}
				<p>Error loading playlists: {error.message}</p>
			{/await}
		{/if}
	</div>
</div>
