import {
	makeDefaultNotebook,
	addNotesToUser,
	addSettingToUser,
	addNotebooksToUser,
	addTagsToUser
} from '$lib/db.svelte';

export async function load() {
	await makeDefaultNotebook();
}
