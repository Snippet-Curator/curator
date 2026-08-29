import { env } from '$env/dynamic/public';

import { browser } from '$app/environment';

// Pocketbase login
export const superUser = 'admin@pocketbase.com';
export const superUserPass = 'amiodarone';

// Pocketbase urls
export const baseURL = 'http://127.0.0.1:8090/api/files';

const isDev = import.meta.env.DEV;
// console.log('isDev:', isDev);
// console.log('browser', browser);

export function getPbURL() {
	const pbURL = isDev
		? env.PUBLIC_POCKETBASE_URL // Browser sees localhost
		: browser
			? env.PUBLIC_POCKETBASE_URL
			: env.PUBLIC_INTERNAL_POCKETBASE_URL; // Server sees Docker name
	return pbURL;
}

// Determine the correct URL based on where the code is executing
export const pbURL = getPbURL();

// console.log('pocketbase public:', env.PUBLIC_POCKETBASE_URL);
// console.log('pocketbase internal', env.PUBLIC_INTERNAL_POCKETBASE_URL);
// console.log('pbURL:', pbURL);
