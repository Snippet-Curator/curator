import {
	addFtsCollection,
	getAuth,
	makeDefaultNotebook,
	addNotesToUser,
	addSettingToUser,
	addNotebooksToUser,
	addTagsToUser
} from '$lib/db.svelte';

export async function load() {
	// await getAuth();
	await makeDefaultNotebook();
	// await addNotesToUser();
	// await addSettingToUser();
	// await addNotebooksToUser();
	// await addTagsToUser();
}
