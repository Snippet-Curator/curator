import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/tag';
import { getPB } from '$lib/server/pocketbase';

export const getAllTags = query(async () => {
	return await db.getAllTags(getPB());
});

export const getOneTag = query(v.string(), async (tagID) => {
	return await db.getOneTag(getPB(), tagID);
});

export const getOneTagByName = query(v.string(), async (tagName) => {
	return await db.getOneTagByName(getPB(), tagName);
});

export const pinTag = command(v.string(), async (recordID) => {
	await db.pinTag(getPB(), recordID);
});

export const unpinTags = command(v.string(), async (recordID) => {
	await db.unpinTag(getPB(), recordID);
});

export const createOneTagbyName = command(
	v.object({
		newName: v.string(),
		parentTagID: v.optional(v.string())
	}),
	async ({ newName, parentTagID }) => {
		return await db.createOneTagbyName(getPB(), newName, parentTagID);
	}
);

export const updateOneTagByName = command(
	v.object({
		tagID: v.string(),
		newName: v.string()
	}),
	async ({ tagID, newName }) => {
		await db.updateOneTagByName(getPB(), tagID, newName);
	}
);

export const updateOneTagByParent = command(
	v.object({
		tagID: v.string(),
		parentTagID: v.string()
	}),
	async ({ tagID, parentTagID }) => {
		await db.updateOneTagByParent(getPB(), tagID, parentTagID);
	}
);

export const deleteTag = command(v.string(), async (recordID) => {
	await db.deleteTag(getPB(), recordID);
});
