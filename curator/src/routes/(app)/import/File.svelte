<script lang="ts">
	import { getMouseState } from '$lib/state/ui.svelte';
	import { SelectTags, SelectNotebook } from '$lib/components/index';
	import { getImportState } from './import.svelte';
	import { guiUpdate } from '$lib/state/ui.svelte';
	import { resubscribeToPocketNotes } from '$lib/utils';

	let { flatNotebooks, flatTags } = $props();

	const importState = getImportState();
	const mouseState = getMouseState();

	let selectedNotebookID = $state<string>('');
	let selectedTagIdArray = $state<string[]>([]);

	async function upload() {
		// avoid updating tags and notebook errors
		guiUpdate.suppressRefresh = true;

		// setting mouse state
		mouseState.isBusy = true;

		importState.getSelectedNotebookID(selectedNotebookID);
		importState.selectedTagIdArray = selectedTagIdArray;
		await importState.importFiles();

		// get initial counts again
		guiUpdate.suppressRefresh = false;
		await resubscribeToPocketNotes();

		mouseState.isBusy = false;
	}
</script>

<section class="card mx-auto mt-10">
	<div class="card-body">
		<h2 class="card-title">Import Files</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>
					Evernote ENEX exports and SingleFile HTMLs will be imported as HTML files. Images, audios,
					PDFs, and videos will be added as embedded HTML. Other file formats will be added as file
					with a link. See <a
						href="#/"
						onclick={(e) => {
							e.preventDefault();
							window.open('https://curator.krxiang.com');
						}}
						class="">here</a
					> for details on import.
				</p>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="gap-golden-md flex flex-col">
					<input
						onchange={(e) => importState.handleFileUpload(e)}
						type="file"
						multiple
						id="file"
						required
						class="file-input w-full"
					/>

					<SelectNotebook bind:selectedNotebookID notebooks={flatNotebooks} />
					<SelectTags bind:selectedTagIdArray tags={flatTags} />

					<!-- <label for="file" class="fieldset-label text-sm">Max size 5GB</label> -->

					<button onclick={upload} class="btn btn-neutral">Import</button>
				</div>
			</div>
		</div>
	</div>
</section>
