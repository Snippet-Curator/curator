import { startImport, startYTImport } from '$lib/api/import.remote';
import { tryCatch } from '$lib/utils';
import { getContext, setContext } from 'svelte';

type UploadStatus = 'stopped' | 'in progress' | 'error' | 'completed';
type FailureFile = {
	name: string;
	error: string;
};

export class ImportStateClass {
	uploadStatus = $state<UploadStatus>('stopped');
	successFiles = $state<string[]>([]);
	failureFiles = $state<FailureFile[]>([]);
	successYTs = $state<string[]>([]);
	failureYTs = $state([]);
	totalFiles = $state(0);
	progress = $state(0);
	currentFile = $state('');
	filesToUpload = $state<File[]>([]);
	selectedNotebookID = $state<string>('');
	selectedTagIdArray = $state<string[]>([]);
	inboxID = $state<string>();

	constructor(inboxID: string) {
		this.inboxID = inboxID;
	}

	getSelectedNotebookID(newID: string | undefined) {
		if (!this.inboxID) throw new Error('Error: no inbox provided');
		if (!newID || newID.startsWith('Import')) {
			this.selectedNotebookID = this.inboxID;
			return this.inboxID;
		}
		this.selectedNotebookID = newID;
		return newID;
	}

	handleFileUpload(event: Event) {
		const input = event.target as HTMLInputElement;
		if (!input.files) throw new Error('Error: no input files');

		this.filesToUpload = Array.from(input.files);
		this.totalFiles = this.filesToUpload.length;
	}

	async importFiles() {
		this.uploadStatus = 'in progress';

		for (const [index, file] of this.filesToUpload.entries()) {
			this.currentFile = file.name;
			const { data, error } = await tryCatch(
				startImport({
					file,
					selectedNotebookID: this.selectedNotebookID,
					selectedTagIdArray: this.selectedTagIdArray
				})
			);

			if (error) {
				console.error(error);
				this.failureFiles.push({
					name: file.name,
					error: error.message
				});
				continue;
			}

			this.successFiles.push(file.name);
			this.progress = Math.round(((index + 1) / this.totalFiles) * 100);
		}
		this.currentFile = '';
		this.uploadStatus = 'completed';
	}

	async importYoutube(urls: string) {
		if (!urls) throw new Error('Error: no url provided');
		const urlList = urls.split('\n');
		this.totalFiles = urlList.length;

		this.uploadStatus = 'in progress';

		for (const [index, url] of urlList.entries()) {
			this.progress = Math.round(((index + 1) / this.totalFiles) * 100);
			if (!url) continue;
			this.currentFile = url.trim();
			const { data, error } = await tryCatch(
				startYTImport({
					url: url.trim(),
					selectedNotebookID: this.selectedNotebookID,
					selectedTagIdArray: this.selectedTagIdArray
				})
			);

			if (error) {
				console.error(error);
				this.failureFiles.push({
					name: url,
					error: error.message
				});
				continue;
			}

			this.successFiles.push(url);
		}
		this.currentFile = '';
		this.uploadStatus = 'completed';
	}
}

export function setImportState(inboxID: string) {
	return setContext('Import', new ImportStateClass(inboxID));
}

export function getImportState() {
	return getContext<ReturnType<typeof setImportState>>('Import');
}
