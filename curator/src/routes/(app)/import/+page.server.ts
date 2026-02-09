import { fail } from '@sveltejs/kit';
import { tryCatch } from '$lib/utils.svelte';
import { getInstagramPosts } from '$lib/server/karakeep';
import { pb } from '$lib/pocketbase';

export const actions = {
	importInstagram: async ({ request }) => {
		// const data = await request.formData();
		// const server = data.get('server') as string;
		// const apiKey = data.get('apiKey') as string;

		// if (!server || !apiKey) {
		//     return fail(400, { error: 'Missing server URL or API key' });
		// }
		console.log('server side');

		// const { data: user, error } = await tryCatch(getInstagramPosts(server, apiKey));

		//         if (error) {
		//             console.log(error);
		//             return fail(400, {
		//                 error: 'Failed to connect to API'
		//             });
		//         }

		return {
			success: true,
			message: 'hi'
		};
	}
};
