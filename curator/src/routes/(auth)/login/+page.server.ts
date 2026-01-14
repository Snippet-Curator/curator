import { tryCatch } from '$lib/utils.svelte';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const loginFormData = await request.formData();
		const email = loginFormData.get('email') ?? '';
		const password = loginFormData.get('password') ?? '';

		const { data, error } = await tryCatch(
			locals.pb.collection('users').authWithPassword(email, password)
		);

		if (error) {
			console.error('Error: ', error);
			console.log(error.data);
			return fail(400, {
				error: `Wrong email or password`
			});
		}

		throw redirect(303, '/');
	}
};
