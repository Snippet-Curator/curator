import { error, redirect } from '@sveltejs/kit';
import { getPB } from '$lib/server/pocketbase';
import { changeSetting } from '$lib/server/db/setting';
import { getYoutubeSettings } from '$lib/api/setting.remote';

export async function GET({ url }) {
	const code = url.searchParams.get('code');
	const redirectUri = `${url.origin}/youtube/callback`;

	const youtubeSettings = await getYoutubeSettings();
	const googleClientID = youtubeSettings.GOOGLE_CLIENT_ID;
	const googleClientSecret = youtubeSettings.GOOGLE_CLIENT_SECRET;

	console.log('client ID', googleClientID);
	console.log('client secret', googleClientSecret);

	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			code,
			client_id: googleClientID,
			client_secret: googleClientSecret,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	});

	const tokens = await res.json();
	const pb = getPB();
	const record = pb.authStore.record;

	if (!pb.authStore.isValid || !record) {
		throw redirect(302, '/login');
	}

	if (!res.ok || !tokens.access_token) {
		if (tokens.error === 'invalid_grant') {
			// if refresh token expires itself
			await changeSetting(pb, 'youtubeAccessToken', '');
			await changeSetting(pb, 'youtubeRefreshToken', '');
			await changeSetting(pb, 'youtube_token_expiry', '');

			error(401, 'YouTube connection expired — please reconnect.');
		}
		error(500, `YouTube token refresh failed: ${tokens.error}`);
	}

	await changeSetting(pb, 'youtubeAccessToken', tokens.access_token);
	await changeSetting(pb, 'youtubeRefreshToken', tokens.refresh_token);
	await changeSetting(
		pb,
		'youtube_token_expiry',
		new Date(Date.now() + tokens.expires_in * 1000).toISOString()
	);

	throw redirect(302, '/settings');
}
