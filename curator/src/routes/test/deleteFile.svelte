<script lang="ts">
	import pb from '$lib/db.svelte';
	import { tryCatch } from '$lib/utils.svelte';

	let files = $state();
	const baseURL = 'http://127.0.0.1:8090/api/files/notes/';

	async function deleteFile(fileID: string) {
		const { data, error } = await tryCatch(pb.collection('notes').delete(fileID));

		if (error) {
			console.error('Error deleting file: ', fileID, error.data);
		}
	}

	async function getFiles() {
		const { data, error } = await tryCatch(
			pb.collection('notes').getList(1, 1, {
				filter: `created>'2025-05-23'`
			})
		);

		if (error) {
			console.error('Error getting notes: ', error.data);
		}
		// for each record update attachments
		for (const file of data.items) {
			console.log('deleting: ', file.title);
			// const noteURL = `${baseURL}${file.id}`;
			// await deleteFile(file.id);
		}
	}

	getFiles();
</script>
