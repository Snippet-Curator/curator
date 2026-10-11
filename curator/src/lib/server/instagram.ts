import PocketBase from 'pocketbase';
import { getInstagramPosts } from '$lib/server/karakeep';

export async function syncInstagram(
	pb: PocketBase,
	options: { maxPerRun?: number; maxPages?: number } = {}
) {
	const { maxPerRun = 10, maxPages = 2 } = options;

	const result = { saved: 0, skipped: 0, failed: [] as string[] };

	try {
		const userId = pb.authStore.record!.id;

		const posts = await getInstagramPosts(env.KARAKEEP_URL, env.KARAKEEP_API_KEY, maxPages);

		let processed = 0;

		for (const [shortcode, url] of posts) {
			if (processed >= maxPerRun) break;

			// Dedup by shortcode so /p/ vs /reel/ URL variants still match
			const exists = await pb
				.collection('saves')
				.getFirstListItem(pb.filter('url ~ {:code}', { code: shortcode }))
				.catch(() => null);

			if (exists) {
				result.skipped++;
				continue;
			}

			try {
				const response = await fetch(`${env.IG_SERVICE_URL}/render`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ url: url })
				});

				if (!response.ok) throw new Error(await response.text());
				const data = await response.json();

				const form = new FormData();
				form.append('title', data.title);
				form.append('url', data.url); // canonical /p/ or /reel/ URL from the service
				form.append('user', userId);
				form.append('file', new File([data.html], `${shortcode}.html`, { type: 'text/html' }));
				await pb.collection('saves').create(form);

				result.saved++;
				processed++;

				// Be gentle with Instagram between downloads
				await new Promise((resolve) => setTimeout(resolve, 20_000));
			} catch (e) {
				result.failed.push(`${shortcode}: ${(e as Error).message}`);
			}
		}
	} finally {
		running = false;
	}

	return result;
}
