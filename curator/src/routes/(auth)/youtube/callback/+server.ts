import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { userCollection } from '$lib/server/const';
import { getPB } from '$lib/server/pocketbase';

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const redirectUri = `${url.origin}/youtube/callback`;

	console.log('client ID', env.GOOGLE_CLIENT_ID);
	console.log('client secret', env.GOOGLE_CLIENT_SECRET);

	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code,
			client_id: env.GOOGLE_CLIENT_ID!,
			client_secret: env.GOOGLE_CLIENT_SECRET!,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	});

	const tokens = await res.json(); // { access_token, refresh_token, expires_in, ... }
	console.log('tokens', tokens);

	const pb = getPB();
	const record = pb.authStore.record;

	if (!pb.authStore.isValid || !record) {
		throw redirect(302, '/login');
	}

	await pb.collection(userCollection).update(record.id, {
		youtube_access_token: tokens.access_token,
		youtube_refresh_token: tokens.refresh_token,
		youtube_token_expiry: new Date(Date.now() + tokens.expires_in * 1000).toISOString()
	});

	throw redirect(302, '/settings');
}
