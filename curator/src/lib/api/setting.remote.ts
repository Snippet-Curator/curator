import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/setting';
import { getPB } from './utils';

const primitive = v.union([v.string(), v.number(), v.boolean()]);

export const getDefaultSettings = query(() => {
	return db.getDefaultSettings(getPB());
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
	({ name, newValue }) => {
		return db.changeJSONSetting(getPB(), name, newValue);
	}
);

export const getJsonSetting = query(v.string(), (name) => {
	return db.getJsonReadOnlySetting(getPB(), name);
});
