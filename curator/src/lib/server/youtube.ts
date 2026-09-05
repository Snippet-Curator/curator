import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { changeSetting, getReadOnlySetting, getSetting } from './db/setting';
import type { Note } from '$lib/types';

export function extractVideoId(url: string): string | null {
	const match = url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([a-zA-Z0-9_-]{11})/);
	return match ? match[1] : null;
}

export function getYoutubeUrlsFromNote(note: Note): string[] {
	if (!note.sources) return [];

	return note.sources.filter((s) => extractVideoId(s.source_url) !== null).map((s) => s.source_url);
}

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
	let youtubeSuccessPlaylistID = await getReadOnlySetting<string>(pb, 'youtubeSuccessPlaylistID');
	let youtubeErrorPlaylistID = await getReadOnlySetting<string>(pb, 'youtubeErrorPlaylistID');
	let discoverPlaylistID = await getReadOnlySetting<string>(pb, 'discoverPlaylistID');

	if (!youtubeSuccessPlaylistID) {
		youtubeSuccessPlaylistID = await createPlaylist(token, 'Curator Imported ✅');
		await changeSetting(pb, 'youtubeSuccessPlaylistID', youtubeSuccessPlaylistID);
	}

	if (!youtubeErrorPlaylistID) {
		youtubeErrorPlaylistID = await createPlaylist(token, 'Curator Errors ⚠️');
		await changeSetting(pb, 'youtubeErrorPlaylistID', youtubeErrorPlaylistID);
	}

	if (!discoverPlaylistID) {
		discoverPlaylistID = await createPlaylist(token, 'Curated Playlist');
		await changeSetting(pb, 'discoverPlaylistID', discoverPlaylistID);
	}

	return {
		successId: youtubeSuccessPlaylistID,
		errorId: youtubeErrorPlaylistID,
		discoverID: discoverPlaylistID
	};
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

export async function clearPlaylist(token: string, playlistId: string) {
	const items = await fetchAllPlaylistItems(token, playlistId); // from earlier
	for (const item of items) {
		const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?id=${item.id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` }
		});
		if (!res.ok) console.error(`Failed to delete item ${item.id}`, await res.text());
	}
}

export async function addVideoToPlaylist(token: string, playlistId: string, videoId: string) {
	const res = await fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet', {
		method: 'POST',
		headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		body: JSON.stringify({
			snippet: { playlistId, resourceId: { kind: 'youtube#video', videoId } }
		})
	});
	if (!res.ok) throw new Error(await res.text());
	return res.json();
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
	await addVideoToPlaylist(token, destinationPlaylistId, videoId);
	await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?id=${playlistItemId}`, {
		method: 'DELETE',
		headers: { Authorization: `Bearer ${token}` }
	});
}
