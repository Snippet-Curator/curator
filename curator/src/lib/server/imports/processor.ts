import { getPB } from '$lib/server/pocketbase';
import { FileImport } from '$lib/server/imports/parsers/file';
import { ENEXImport } from '$lib/server/imports/parsers/evernote';
import { HtmlImport } from '$lib/server/imports/parsers/html';
import { YoutubeImport } from '$lib/server/imports/parsers/youtube';
import type { ImportOptions } from '$lib/types';

const decoder = new TextDecoder('utf-8');

async function getDecodedText(file: File) {
	const decodedText = decoder.decode(await file.arrayBuffer());
	if (!decodedText) throw new Error('Error decoding text');
	return decodedText;
}

async function importFile(file: File, selectedNotebookID: string, selectedTagIdArray: string[]) {
	const fileContent = await getDecodedText(file);

	if (file.type == 'text/html') {
		const parsedHTML = new HtmlImport(getPB(), fileContent, selectedNotebookID, selectedTagIdArray);
		await parsedHTML.uploadToDB();
	} else if (file.name.includes('.enex')) {
		const parsedXML = new ENEXImport(getPB(), fileContent, selectedNotebookID, selectedTagIdArray);
		await parsedXML.uploadToDB();
	} else {
		const imageFile = new FileImport(getPB(), file, selectedNotebookID, selectedTagIdArray);
		await imageFile.uploadToDB();
	}
}

async function importYoutube(
	url: string,
	selectedNotebookID: string,
	selectedTagIdArray: string[]
) {
	const ytImport = new YoutubeImport(getPB(), url, selectedNotebookID, selectedTagIdArray);
	await ytImport.uploadToDB();
}

export async function processImport(options: ImportOptions) {
	if (options.type === 'file') {
		await importFile(options.file, options.selectedNotebookID, options.selectedTagIdArray);
	} else if (options.type === 'youtube') {
		await importYoutube(options.url, options.selectedNotebookID, options.selectedTagIdArray);
	}
}
