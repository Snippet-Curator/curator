import { error, json } from '@sveltejs/kit';

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
const playlistId = '';

export async function load({ locals, url }) {
	// Get the token from your PocketBase user (assuming you linked Google)
	const user = locals.pb.authStore.record;
	const token = '';

	console.log('token:', token);

	if (!token) {
		throw error(401, 'Please link your Google account first');
	}

	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: 'application/json'
			}
		}
	);

	const data = await response.json();
	console.log('data:', data);

	if (!response.ok) {
		return json({ error: data.error.message }, { status: response.status });
	}

	return {
		data
	};
}
