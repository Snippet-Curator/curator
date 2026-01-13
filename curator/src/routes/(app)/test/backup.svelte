<script lang="ts">
	import pb from '$lib/db.svelte';
	import { tryCatch } from '$lib/utils.svelte';
	import SparkMD5 from 'spark-md5';

	let files = $state();
	const baseURL = 'http://127.0.0.1:8090/api/files/notes/';

	async function getDataFromURL(url: string, fileName: string) {
		const response = await fetch(url);

		const blob = await response.blob(); // Get file as a Blob
		const arrayBuffer = await blob.arrayBuffer();

		const mimeType = response.headers.get('content-type') || 'application/octet-stream';

		const file = new File([blob], fileName, { type: mimeType });
		console.log(file);
		// const size = arrayBuffer.byteLength;
		const hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
		return { file, hash };
	}

	function makeResourceFromFile(file: File, hash: string, url: string) {
		const resource = {
			name: file.name,
			size: file.size,
			hash: hash,
			type: file.type,
			fileURL: url,
			lastUpdated: new Date().toISOString()
		};
		return resource;
	}

	async function updateAttachments(attachments: string, noteURL: string, recordID: string) {
		let resources = [];
		for (const attachment of attachments) {
			const fileURL = `${noteURL}/${attachment}`;
			// console.log(fileURL);
			const { file, hash } = await getDataFromURL(fileURL, attachment);
			const resource = makeResourceFromFile(file, hash, fileURL);
			resources.push(resource);
		}
		const { data, error } = await tryCatch(
			pb.collection('notes').update(recordID, {
				resources: resources
			})
		);

		if (error) {
			console.error('Error updating notes: ', error);
		}
		console.log(data);
	}

	async function getFiles() {
		const { data, error } = await tryCatch(
			pb.collection('notes_without_content').getList(1, 30, {
				filter: `resources=null`
			})
		);

		if (error) {
			console.error('Error getting notes: ', error);
		}
		// for each record update attachments
		for (const file of data.items) {
			console.log('updating: ', file);
			const noteURL = `${baseURL}${file.id}`;
			await updateAttachments(file.attachments, noteURL, file.id);
		}
	}

	getFiles();
</script>
