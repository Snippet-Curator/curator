import PocketBase from 'pocketbase';
import { userCollection } from '$lib/server/const';
import { env } from '$env/dynamic/private';

export async function getValidAccessToken(pb: PocketBase, userId: string) {
	const user = await pb.collection(userCollection).getOne(userId);
	if (new Date(user.youtube_token_expiry) > new Date(Date.now() + 60_000)) {
		return user.youtube_access_token; // still valid
	}
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			refresh_token: user.youtube_refresh_token,
			client_id: env.GOOGLE_CLIENT_ID!,
			client_secret: env.GOOGLE_CLIENT_SECRET!,
			grant_type: 'refresh_token'
		})
	});
	const fresh = await res.json();
	await pb.collection(userCollection).update(userId, {
		youtube_access_token: fresh.access_token,
		youtube_token_expiry: new Date(Date.now() + fresh.expires_in * 1000).toISOString()
	});
	return fresh.access_token;
}
