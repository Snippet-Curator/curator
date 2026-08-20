import { getRequestEvent } from '$app/server';

export function getPB() {
	return getRequestEvent().locals.pb;
}
