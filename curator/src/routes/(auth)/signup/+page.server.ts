import { tryCatch } from '$lib/utils.svelte';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	signup: async ({ request, locals }) => {
		const form = await request.formData();
		const email = form.get('email');
		const name = form.get('name');
		const password = form.get('password');
		const passwordConfirm = form.get('password_confirmation');

		if (password !== passwordConfirm) {
			return fail(400, {
				name: name,
				password: password,
				passwordConfirm: passwordConfirm,
				error: 'Passwords do not match'
			});
		}

		const userData = {
			name,
			email,
			password,
			passwordConfirm
		};

		const { data, error } = await tryCatch(locals.pb.collection('users').create(userData));

		if (error) {
			console.error('Error creating user: ', error);
			console.log(error.data);
			return fail(400, {
				error: `Error: ${error.data}`
			});
		}

		await locals.pb.collection('users').authWithPassword(email, password);

		throw redirect(303, '/');
	}
};
