import { redirect } from '@sveltejs/kit';
import { getYoutubeSettings } from '$lib/api/setting.remote';

export async function GET({ url }) {
	const redirectUri = `${url.origin}/youtube/callback`;

	const youtubeSettings = await getYoutubeSettings();
	const googleClientID = youtubeSettings.GOOGLE_CLIENT_ID;

	const params = new URLSearchParams({
		client_id: googleClientID,
		redirect_uri: redirectUri,
		response_type: 'code',
		access_type: 'offline', // needed to get a refresh_token
		prompt: 'consent', // forces refresh_token on repeat connects
		scope: 'https://www.googleapis.com/auth/youtube'
	});
	throw redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
