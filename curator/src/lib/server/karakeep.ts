import PocketBase from 'pocketbase';
import { getJsonReadOnlySetting } from '$lib/server/db/setting';

/**
 * Fetches current user information from Karakeep
 */
export async function getKarakeepUser(serverUrl: string, apiKey: string) {
	// Removes trailing slash and adds api path
	const baseUrl = serverUrl.replace(/\/$/, '') + '/api/v1';

	const response = await fetch(`${baseUrl}/users/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Error: ${response.status}`);
	}

	return await response.json();
}

/**
 * Fetches all Karakeep bookmarks with instagram source
 */
export async function getInstagramPosts(pb: PocketBase, maxPages = Infinity) {
	const karakeep = await getJsonReadOnlySetting(pb, 'karakeep');

	const serverURL = karakeep['url'];
	const apiKey = karakeep['apiKey'];

	const instagramQuery = /instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/;
	const posts = new Map<string, string>(); // map for post short code and URL

	let cursor: string | undefined;
	let page = 0;

	// paginate with 100 bookmarks per page and limit to maxPages. By default this would include all bookmarks.
	do {
		const url = new URL('/api/v1/bookmarks', serverURL);
		url.searchParams.set('limit', '100');
		url.searchParams.set('archived', 'false');
		if (cursor) url.searchParams.set('cursor', cursor);

		const response = await fetch(url, {
			headers: { Authorization: `Bearer ${apiKey}` }
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || `Error: ${response.status}`);
		}

		const jsonData = await response.json();

		for (const bookmark of jsonData.bookmarks ?? []) {
			const url = bookmark.content?.url;
			if (url && instagramQuery.test(url)) {
				posts.set(url, bookmark.id);
			}
		}

		cursor = jsonData.nextCursor ?? undefined;
		page++;
	} while (cursor && page < maxPages);

	return posts;
}

export async function archiveKarakeepBookmark(pb: PocketBase, bookmarkId: string) {
	const karakeep = await getJsonReadOnlySetting(pb, 'karakeep');

	console.log('Archiving post:', bookmarkId);

	const response = await fetch(new URL(`/api/v1/bookmarks/${bookmarkId}`, karakeep['url']), {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${karakeep['apiKey']}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ archived: true })
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `Error: ${response.status}`);
	}
}
