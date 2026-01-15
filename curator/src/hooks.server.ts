import PocketBase from 'pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const handle: Handle = async ({ event, resolve }) => {
	// 1. Get the dynamic URL (fallback to localhost for safety)
	const pbUrl = env.PUBLIC_INTERNAL_POCKETBASE_URL || 'http://localhost:8090';

	// Initialize pocketbase
	event.locals.pb = new PocketBase(pbUrl);

	const cookie = event.request.headers.get('cookie') || '';
	event.locals.pb.authStore.loadFromCookie(cookie);

	try {
		// 3. Get latest user data if the session is valid
		if (event.locals.pb.authStore.isValid) {
			await event.locals.pb.collection('users').authRefresh();
			event.locals.user = event.locals.pb.authStore.record;
		} else {
			event.locals.user = null;
		}
	} catch (_) {
		// Clear auth store if the token is invalid/expired
		event.locals.pb.authStore.clear();
		event.locals.user = null;
	}

	const isLoginPath = event.url.pathname === '/login';
	const isSignupPath = event.url.pathname.startsWith('/signup');

	if (!event.locals.user && !isLoginPath && !isSignupPath) {
		throw redirect(303, '/login');
	}

	// 2. Resolve the request
	const response = await resolve(event);

	// Define the CSP policy
	// 'self' allows the app to talk to its own origin (homenas:3003)
	// ${pbUrl} allows the browser to talk to PocketBase
	const csp = [
		"default-src 'self'",
		`connect-src 'self' http://127.0.0.1:8090 ${pbUrl} http://localhost:8090 https://www.googleapis.com https://i.ytimg.com https://www.youtube.com`,
		`img-src 'self' https://i.ytimg.com data: http://127.0.0.1:8090 http://localhost:8090 ${pbUrl} blob:${pbUrl}`,
		`media-src 'self' data: http://127.0.0.1:8090 http://pocketbase:8090 http://localhost:8090 ${pbUrl}`,
		"script-src 'self' 'unsafe-inline'", // Svelte needs inline scripts for hydration
		"style-src 'self' 'unsafe-inline' http://127.0.0.1:8090 https://fonts.googleapis.com/ http://localhost:8090",
		`font-src 'self' data: http://127.0.0.1:8090  https://fonts.googleapis.com https://fonts.gstatic.com http://localhost:8090 ${pbUrl}`,
		"object-src 'none'",
		"frame-ancestors 'none'",
		`frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com http://127.0.0.1:8090 http://localhost:8090`
	].join('; ');

	// 4. Set the header
	response.headers.set('Content-Security-Policy', csp);

	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ httpOnly: false, secure: false })
	);

	return response;
};
