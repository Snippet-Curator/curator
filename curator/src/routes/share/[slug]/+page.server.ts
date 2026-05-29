import { error } from '@sveltejs/kit';

export async function load({ params, locals }) {
	const token = params.slug;

	try {
		const note = await locals.pb
			.collection('notes')
			.getFirstListItem(`share_token="${token}" && is_shared=true`);

		return {
			note
		};
	} catch {
		throw error(404, 'Shared note not found');
	}
}
