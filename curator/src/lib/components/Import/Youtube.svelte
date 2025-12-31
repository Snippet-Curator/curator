<script lang="ts">
	import { getSettingState } from '$lib/db.svelte';
	import { getMouseState } from '$lib/utils.svelte';
	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { getImportState } from './import.svelte';

	let { notebooks, tags } = $props();

	const settingState = getSettingState();
	const importState = getImportState();

	const mouseState = getMouseState();

	let youtubeURLs = $state('');
	let selectedYoutubeNotebookID = $state<string>('');
	let selectedTagIdArray = $state<string[]>([]);
</script>

<section class="card mx-auto">
	<div class="card-body">
		<h2 class="card-title">Add Youtube Videos</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>
					This will add youtube videos as an embedded playable video. The video itself will not be
					downloaded. However, this enables organization of saved youtube videos and will also save
					the titles, thumbnail, and description. You need to have youtube API setup in Settings
					first to use this.
				</p>
			</div>

			<div class="gap-golden-md col-span-12 flex flex-col md:col-span-6">
				<textarea
					placeholder="Paste full youtube URLs or video IDs, one on each line."
					bind:value={youtubeURLs}
					class="textarea w-full"
				></textarea>

				<SelectNotebook bind:selectedNotebookID={selectedYoutubeNotebookID} {notebooks} />
				<SelectTags bind:selectedTagIdArray {tags} />

				<button
					disabled={!settingState.youtubeAPIKey}
					onclick={async () => {
						mouseState.isBusy = true;
						importState.getSelectedNotebookID(selectedYoutubeNotebookID);
						importState.selectedTagIdArray = selectedTagIdArray;
						await importState.importYoutube(youtubeURLs, settingState.youtubeAPIKey);
						mouseState.isBusy = false;
					}}
					class="btn btn-neutral">Import</button
				>
			</div>
		</div>
	</div>
</section>
