// src/lib/server/youtube.remote.ts
import { query, command } from '$app/server';
import * as v from 'valibot';
import { getValidAccessToken } from '$lib/server/youtube';
import { getPB } from '$lib/server/pocketbase';

export const getMyPlaylists = query(async () => {
	const pb = getPB();
	if (pb.authStore.isValid === false || !pb.authStore.record) {
		throw new Error('User is not authenticated');
	}

	const token = await getValidAccessToken(pb);

	const res = await fetch(
		'https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50',
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	const data = await res.json();
	return data.items;
});
