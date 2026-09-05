import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/setting';
import { getPB } from '$lib/server/pocketbase';

const primitive = v.union([v.string(), v.number(), v.boolean()]);

export const getDefaultSettings = query(async () => {
	return await db.getDefaultSettings(getPB());
});

export const getYoutubeSettings = query(async () => {
	const youtubeAccessToken = await db.getSetting(getPB(), 'youtubeAccessToken', '');
	const youtubeRefreshToken = await db.getSetting(getPB(), 'youtubeRefreshToken', '');
	const youtubeTokenExpiry = await db.getSetting(
		getPB(),
		'youtubeTokenExpiry',
		new Date(Date.now()).toISOString()
	);

	return {
		youtubeAccessToken,
		youtubeRefreshToken,
		youtubeTokenExpiry
	};
});

export const getSetting = query(v.string(), async (name) => {
	return await db.getReadOnlySetting(getPB(), name);
});

export const changeSetting = command(
	v.object({
		name: v.string(),
		newValue: v.union([v.string(), v.number(), v.boolean()])
	}),
	async ({ name, newValue }) => {
		return await db.changeSetting(getPB(), name, newValue);
	}
);

export const changeJSONSetting = command(
	v.object({
		name: v.string(),
		newValue: v.record(v.string(), primitive)
	}),
	async ({ name, newValue }) => {
		return await db.changeJSONSetting(getPB(), name, newValue);
	}
);

export const getJsonSetting = query(v.string(), async (name) => {
	return await db.getJsonReadOnlySetting(getPB(), name);
});
