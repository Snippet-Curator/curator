<script lang="ts">
	import { getMouseState } from '$lib/state/ui.svelte';
	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { getImportState } from './import.svelte';

	let { notebooks, tags } = $props();

	const importState = getImportState();
	const mouseState = getMouseState();

	let instagramURLs = $state('');
	let selectedYoutubeNotebookID = $state<string>('');
	let selectedTagIdArray = $state<string[]>([]);
</script>

<section class="card mx-auto">
	<div class="card-body">
		<h2 class="card-title">Add Instagram Posts</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>This will import instagram posts by URL.</p>
			</div>

			<div class="gap-golden-md col-span-12 flex flex-col md:col-span-6">
				<textarea
					placeholder="Paste full instagram URLs, one on each line."
					bind:value={instagramURLs}
					class="textarea w-full"></textarea>

				<SelectNotebook bind:selectedNotebookID={selectedYoutubeNotebookID} {notebooks} />
				<SelectTags bind:selectedTagIdArray {tags} />

				<button
					onclick={async () => {
						mouseState.isBusy = true;
						importState.getSelectedNotebookID(selectedYoutubeNotebookID);
						importState.selectedTagIdArray = selectedTagIdArray;
						await importState.importInstagramURLs(instagramURLs);
						mouseState.isBusy = false;
					}}
					class="btn btn-neutral">Import</button
				>
			</div>
		</div>
	</div>
</section>
