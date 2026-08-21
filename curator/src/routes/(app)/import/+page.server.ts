import { getInbox } from '$lib/api/notebook.remote';

export async function load() {
	const inbox = await getInbox();

	return {
		inboxID: inbox?.id
	};
}
