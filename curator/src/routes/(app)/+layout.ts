import { makeDefaultNotebook } from '$lib/api/notebook.remote';

export async function load() {
	await makeDefaultNotebook();
}
