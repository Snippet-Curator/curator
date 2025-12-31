import { EnImport, fileImport, htmlImport, youtubeImport } from '$lib/parser';
import { tryCatch } from "$lib/utils.svelte"
import { getContext, setContext } from 'svelte';

type UploadStatus = 'stopped' | 'in progress' | 'error' | 'completed'
type FailureFile = {
    name: string
    error: string
}

const decoder = new TextDecoder('utf-8');

export class ImportStateClass {
    uploadStatus = $state<UploadStatus>('stopped')
    successFiles = $state<string[]>([])
    failureFiles = $state<FailureFile[]>([])
    successYTs = $state<string[]>([])
    failureYTs = $state([])
    totalFiles = $state(0);
    progress = $state(0);
    currentFile = $state('');
    filesToUpload = $state<File[]>([])
    selectedNotebookID = $state<string>('')
    selectedTagIdArray = $state<string[]>([])
    inboxID = $state<string>()

    constructor(inboxID: string) {
        this.inboxID = inboxID
    }

    getSelectedNotebookID(newID: string | undefined) {
        if (!this.inboxID) throw new Error('Error: no inbox provided')
        if (!newID || newID.startsWith('Import')) {
            this.selectedNotebookID = this.inboxID
            return this.inboxID
        }
        this.selectedNotebookID = newID
        return newID
    }

    async getDecodedText(file: File) {
        const decodedText = decoder.decode(await file.arrayBuffer());
        if (!decodedText) throw new Error('Error decoding text')
        return decodedText
    }

    handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (!input.files) return new Error('Error: no input files')

        this.filesToUpload = Array.from(input.files);
        this.totalFiles = this.filesToUpload.length;
    }

    async uploadSingleFile(file: File, type: 'html' | 'enex' | 'file') {
        if (type === 'html') {
            const decodedText = await this.getDecodedText(file)
            const parsedHTML = new htmlImport(decodedText, this.selectedNotebookID, this.selectedTagIdArray);
            const { data, error } = await tryCatch(parsedHTML.uploadToDB())

            if (error) {
                console.error(error)
                this.failureFiles.push({
                    name: file.name,
                    error: error.message
                })
                return
            }

            this.successFiles.push(file.name);
            return
        }

        if (type === 'enex') {
            const decodedText = await this.getDecodedText(file)
            const parsedXML = new EnImport(decodedText, this.selectedNotebookID, this.selectedTagIdArray);

            const { data, error } = await tryCatch(parsedXML.uploadToDB())

            if (error) {
                console.error(error)
                this.failureFiles.push({
                    name: file.name,
                    error: error.message
                })
                return
            }

            this.successFiles.push(file.name);
            return
        }

        if (type === 'file') {
            const imageFile = new fileImport(file, this.selectedNotebookID, this.selectedTagIdArray);

            const { data, error } = await tryCatch(imageFile.uploadToDB())

            if (error) {
                console.error(error)
                this.failureFiles.push({
                    name: file.name,
                    error: error.message
                })
                return
            }

            this.successFiles.push(file.name);
            return
        }
    }

    async uploadYoutube(url: string, selectedNotebookID: string, selectedTagIdArray: string[], APIKey: string) {

        const youtubeFile = new youtubeImport(
            url,
            selectedNotebookID,
            selectedTagIdArray,
            APIKey)

        const { data, error } = await tryCatch(youtubeFile.uploadToDB())

        if (error) {
            console.error(error)
            this.failureFiles.push({
                name: url,
                error: error.message
            })
            return
        }

        this.successFiles.push(url);
        return
    }

    async uploadFileByType(file: File) {

        if (file.type == 'text/html') {
            await this.uploadSingleFile(file, 'html')
        } else if (file.name.includes('.enex')) {
            await this.uploadSingleFile(file, 'enex')
        } else {
            await this.uploadSingleFile(file, 'file')
        }
    }

    async importFiles() {
        this.uploadStatus = 'in progress';

        for (const [index, file] of this.filesToUpload.entries()) {
            this.currentFile = file.name;
            await this.uploadFileByType(file);
            this.progress = Math.round(((index + 1) / this.totalFiles) * 100);
        }
        this.currentFile = '';
        this.uploadStatus = 'completed';
    }

    async importYoutube(urls: string, API: string | undefined) {
        if (!urls || !API) return;
        const urlList = urls.split('\n');
        this.totalFiles = urlList.length

        this.uploadStatus = 'in progress';

        for (const [index, url] of urlList.entries()) {
            this.progress = Math.round(((index + 1) / this.totalFiles) * 100);
            if (!url) continue
            this.currentFile = url.trim()
            await this.uploadYoutube(url.trim(), this.selectedNotebookID, this.selectedTagIdArray, API)
        }
        this.currentFile = '';
        this.uploadStatus = 'completed';
    }
}



export function setImportState(inboxID: string) {
    return setContext('Import', new ImportStateClass(inboxID))
}

export function getImportState() {
    return getContext<ReturnType<typeof setImportState>>('Import')
}

