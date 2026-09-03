import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export function GET({ url }) {
	const redirectUri = `${url.origin}/youtube/callback`;
	const params = new URLSearchParams({
		client_id: env.GOOGLE_CLIENT_ID!,
		redirect_uri: redirectUri,
		response_type: 'code',
		access_type: 'offline', // needed to get a refresh_token
		prompt: 'consent', // forces refresh_token on repeat connects
		scope: 'https://www.googleapis.com/auth/youtube'
	});
	throw redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params}`);
}
