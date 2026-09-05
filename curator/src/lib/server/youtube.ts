import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { changeSetting, getSetting } from './db/setting';

export async function getValidAccessToken(pb: PocketBase) {
	const youtubeAccessToken = await getSetting(pb, 'youtubeAccessToken', '');
	const youtubeRefreshToken = await getSetting(pb, 'youtubeRefreshToken', '');
	const youtubeTokenExpiry = await getSetting(
		pb,
		'youtubeTokenExpiry',
		new Date(Date.now()).toISOString()
	);

	if (new Date(youtubeTokenExpiry) > new Date(Date.now() + 60_000)) {
		return youtubeAccessToken; // still valid
	}

	// get refreshed tokens
	const res = await fetch('https://oauth2.googleapis.com/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			refresh_token: youtubeRefreshToken,
			client_id: env.GOOGLE_CLIENT_ID!,
			client_secret: env.GOOGLE_CLIENT_SECRET!,
			grant_type: 'refresh_token'
		})
	});
	const fresh = await res.json();
	await changeSetting(pb, 'youtubeAccessToken', fresh.access_token);
	await changeSetting(
		pb,
		'youtubeTokenExpiry',
		new Date(Date.now() + fresh.expires_in * 1000).toISOString()
	);

	return fresh.access_token;
}

export async function getOrCreateStatusPlaylists(pb: PocketBase, token: string) {
	let youtubeSuccessPlaylistID = await getSetting<string>(pb, 'youtubeSuccessPlaylistID', '');
	let youtubeErrorPlaylistID = await getSetting<string>(pb, 'youtubeErrorPlaylistID', '');

	if (!youtubeSuccessPlaylistID)
		youtubeSuccessPlaylistID = await createPlaylist(token, 'Curator Imported ✅');
	await changeSetting(pb, 'youtubeSuccessPlaylistID', youtubeSuccessPlaylistID);
	if (!youtubeErrorPlaylistID)
		youtubeErrorPlaylistID = await createPlaylist(token, 'Curator Errors ⚠️');
	await changeSetting(pb, 'youtubeErrorPlaylistID', youtubeErrorPlaylistID);

	return { successId: youtubeSuccessPlaylistID, errorId: youtubeErrorPlaylistID };
}

async function createPlaylist(token: string, title: string) {
	const res = await fetch('https://www.googleapis.com/youtube/v3/playlists?part=snippet,status', {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({ snippet: { title }, status: { privacyStatus: 'private' } })
	});
	const data = await res.json();
	return data.id as string;
}

export async function fetchAllPlaylistItems(token: string, playlistId: string) {
	const items = [];
	let pageToken: string | undefined;
	do {
		const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
		url.searchParams.set('part', 'snippet,contentDetails');
		url.searchParams.set('playlistId', playlistId);
		url.searchParams.set('maxResults', '50');
		if (pageToken) url.searchParams.set('pageToken', pageToken);

		const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
		const data = await res.json();
		items.push(...data.items);
		pageToken = data.nextPageToken;
	} while (pageToken);
	return items; // each item has .id (playlistItem id, needed to delete) and .contentDetails.videoId
}

export async function movePlaylistItem(
	token: string,
	{
		playlistItemId,
		videoId,
		destinationPlaylistId
	}: {
		playlistItemId: string;
		videoId: string;
		destinationPlaylistId: string;
	}
) {
	await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			snippet: { playlistId: destinationPlaylistId, resourceId: { kind: 'youtube#video', videoId } }
		})
	});
	await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	});
}
