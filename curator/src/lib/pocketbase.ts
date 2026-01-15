import PocketBase from 'pocketbase';
import { pbURL } from './const';

export const pb = new PocketBase(pbURL);

// This only runs in the browser
if (typeof document !== 'undefined') {
	console.log(document.cookie);
	// 1. Load the session from the cookie created by hooks.server.ts
	pb.authStore.loadFromCookie(document.cookie);

	// 2. Keep the cookie in sync if the user logs out or the token refreshes
	pb.authStore.onChange(() => {
		document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
	}, true);

	console.log('pocket', pb.authStore.isValid);
}
