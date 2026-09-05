<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { type NoteQuery } from '$lib/types';

	import { makeDiscoverPlaylist, getMyPlaylists } from '$lib/api/youtube.remote';
	import { importPlaylist } from '$lib/api/import.remote';
	import { getYoutubeSettings } from '$lib/api/setting.remote';
	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { getOneTagByName } from '$lib/api/tag.remote';

	let { notebooks, tags } = $props();

	let youtubeSettings = $derived(await getYoutubeSettings());
	let showPlaylists = $state(false);
	let selectedNotebookID = $state<string>('');
	let selectedTagIdArray = $state<string[]>([]);
	let youtubeTag = $derived((await getOneTagByName('youtube')).id);

	const query = $state<NoteQuery>({
		page: 1,
		search: '',
		notebookID: '',
		tagIDs: [youtubeTag],
		fullContent: false,
		fullTextSearch: false,
		excludedTagIDs: [],
		status: 'active',
		sort: '-score'
	});
</script>

<section class="card mx-auto">
	<div class="card-body">
		<h2 class="card-title">Import Youtube Playlist</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>
					This will import youtube playlists. Importing playlist will move successfully imported
					videos to "Curator Saved" playlist and unsuccessful imports to "Curator Error" playlist.
				</p>
			</div>
			<div class="gap-golden-md col-span-12 flex flex-col md:col-span-6">
				<SelectNotebook bind:selectedNotebookID {notebooks} />
				<SelectTags bind:selectedTagIdArray {tags} />

				{#if youtubeSettings.youtubeRefreshToken}
					<button class="btn btn-neutral" onclick={() => (showPlaylists = true)}
						>Fetch Youtube Playlists</button
					>
				{:else}
					Start by<a href="/settings">connecting to Youtube</a>
				{/if}
			</div>
			<div class="col-span-12 max-h-96 overflow-y-auto">
				{#if showPlaylists}
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
									<button
										onclick={async () => {
											const promise = importPlaylist({
												playlistID: playlist.id,
												selectedNotebookID,
												selectedTagIdArray
											});

											toast.promise(promise, {
												loading: `Importing youtube playlist...`,
												success: `Finished importing youtube playlist.`,
												error: 'Failed to import youtube playlist.'
											});

											await promise;
										}}
										class="btn">Import Playlist</button
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
	</div>

	<div class="card-body">
		<h2 class="card-title">Make Discover Playlist</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>
					This will create a discover playlist on youtube with notes tagged with youtube tag,
					selected by decreasing scores.
				</p>
			</div>
			<div class="gap-golden-md col-span-12 flex flex-col md:col-span-6">
				{#if youtubeSettings.youtubeRefreshToken}
					<button
						class="btn btn-neutral"
						onclick={async () => {
							const promise = makeDiscoverPlaylist(query);

							toast.promise(promise, {
								loading: `Making discover playlist...`,
								success: `Finished making discover playlist.`,
								error: 'Failed to make discover playlist.'
							});

							await promise;
						}}>Make Discover Playlist</button
					>
				{:else}
					Start by<a href="/settings">connecting to Youtube</a>
				{/if}
			</div>
		</div>
	</div>
</section>
