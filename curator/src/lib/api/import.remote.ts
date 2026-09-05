import * as v from 'valibot';
import { command } from '$app/server';
import { processImport } from '$lib/server/imports/processor';
import { getPB } from '$lib/server/pocketbase';
import {
	getValidAccessToken,
	getOrCreateStatusPlaylists,
	fetchAllPlaylistItems,
	movePlaylistItem
} from '$lib/server/youtube';

export const startImport = command(
	v.object({
		file: v.file(),
		selectedNotebookID: v.string(),
		selectedTagIdArray: v.array(v.string())
	}),
	async ({ file, selectedNotebookID, selectedTagIdArray }) => {
		await processImport({ file, type: 'file', selectedNotebookID, selectedTagIdArray });
	}
);

export const startYTImport = command(
	v.object({
		url: v.string(),
		selectedNotebookID: v.string(),
		selectedTagIdArray: v.array(v.string())
	}),
	async ({ url, selectedNotebookID, selectedTagIdArray }) => {
		await processImport({ type: 'youtube', url, selectedNotebookID, selectedTagIdArray });
	}
);

export const importPlaylist = command(v.string(), async (playlistId) => {
	const pb = getPB();
	console.log('getting access tokens');
	const token = await getValidAccessToken(pb);
	console.log('getting or creating playlists');
	const { successId, errorId } = await getOrCreateStatusPlaylists(pb, token);
	const items = await fetchAllPlaylistItems(token, playlistId);

	const results = { total: items.length, succeeded: 0, failed: 0 };
	console.log(`getting ${results.total} items`);

	for (const item of items) {
		const videoId = item.contentDetails.videoId;
		const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
		let succeeded = false;
		console.log(`Importing ${videoUrl}`);

		try {
			await processImport({
				type: 'youtube',
				url: videoUrl,
				selectedNotebookID: '',
				selectedTagIdArray: []
			});
			succeeded = true;
		} catch (e) {
			console.error(`DB import failed for ${videoUrl}`, e);
		}

		try {
			console.log(`Moving ${videoUrl} item`);
			await movePlaylistItem(token, {
				playlistItemId: item.id,
				videoId,
				destinationPlaylistId: succeeded ? successId : errorId
			});
		} catch (e) {
			console.error(`YouTube move failed for ${videoId}`, e);
		}

		succeeded ? results.succeeded++ : results.failed++;
	}
	console.log('Finished importing videos');
	return results;
});
