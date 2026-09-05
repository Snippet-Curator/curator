// src/lib/server/youtube.remote.ts
import { query, command } from '$app/server';
import * as v from 'valibot';
import {
	addVideoToPlaylist,
	clearPlaylist,
	extractVideoId,
	getOrCreateStatusPlaylists,
	getValidAccessToken,
	getYoutubeUrlsFromNote
} from '$lib/server/youtube';
import { getPB } from '$lib/server/pocketbase';
import { getNotes } from '$lib/server/db/notes';
import { noteQuerySchema } from './utils';
import { updateNotes } from './note.remote';

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

export const makeDiscoverPlaylist = command(noteQuerySchema, async (query) => {
	const pb = getPB();
	const token = await getValidAccessToken(pb);

	const urlRecords = await getNotes(pb, query);

	const urlList = urlRecords.items.flatMap(getYoutubeUrlsFromNote);
	const discoverID = (await getOrCreateStatusPlaylists(pb, token)).discoverID;

	console.log('Clearing existing playlist');
	await clearPlaylist(token, discoverID);

	const results = { added: 0, skipped: [] as string[], failed: [] as string[] };

	for (const url of urlList) {
		const videoId = extractVideoId(url);
		if (!videoId) {
			results.skipped.push(url); // not a valid/parseable YouTube URL
			continue;
		}
		try {
			console.log(`Adding ${videoId}`);
			await addVideoToPlaylist(token, discoverID, videoId);
			results.added++;
		} catch (e) {
			console.error(`Failed to add ${videoId}`, e);
			results.failed.push(url);
		}
	}
	const urlRecordsItemsIDS = urlRecords.items.map((item) => item.id);
	console.log('Update last opened dates');
	await updateNotes({
		noteIDs: urlRecordsItemsIDS,
		updates: {
			last_opened: new Date()
		}
	});
	return results;
});
