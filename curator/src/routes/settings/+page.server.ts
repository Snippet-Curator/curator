import { getKarakeepUser } from '$lib/server/karakeep';
import { Server } from 'lucide-svelte';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { tryCatch } from '$lib/utils.svelte';

export const load: PageServerLoad = ({ locals }) => {
	const user = locals.user;
	return {
		user
	};
};

export const actions = {
	getUser: async ({ request }) => {
		const data = await request.formData();
		const server = data.get('server') as string;
		const apiKey = data.get('apiKey') as string;

		if (!server || !apiKey) {
			return fail(400, { error: 'Missing server URL or API key' });
		}

		console.log('server:', server, apiKey);

		const { data: user, error } = await tryCatch(getKarakeepUser(server, apiKey));

		if (error) {
			console.log(error);
			return fail(400, {
				error: 'Failed to connect to API'
			});
		}

		return {
			success: true,
			user
		};
	}
};
