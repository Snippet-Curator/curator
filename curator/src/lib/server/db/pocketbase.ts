import PocketBase from 'pocketbase';

import { pbURL } from '$lib/const';

export function createPB(cookie: string) {
	const pb = new PocketBase(pbURL);
	pb.authStore.loadFromCookie(cookie);

	return pb;
}
