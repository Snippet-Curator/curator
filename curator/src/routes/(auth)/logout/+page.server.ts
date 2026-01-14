import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, cookies }) => {
		locals.pb.authStore.clear();
		locals.user = null;

		const emptyCookie = locals.pb.authStore.exportToCookie({ secure: true });

		// 3. Redirect
		throw redirect(303, '/login');
	}
};
