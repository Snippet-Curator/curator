import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/tag';
import { getPB } from './utils';

export const getAllTags = query(() => {
	return db.getAllTags(getPB());
});

export const getOneTag = query(v.string(), (tagID) => {
	return db.getOneTag(getPB(), tagID);
});

export const pinTag = command(v.string(), (recordID) => {
	db.pinTag(getPB(), recordID);
});

export const unpinTags = command(v.string(), (recordID) => {
	db.unpinTag(getPB(), recordID);
});

export const createOneTagbyName = command(
	v.object({
		newName: v.string(),
		parentTagID: v.optional(v.string())
	}),
	({ newName, parentTagID }) => {
		return db.createOneTagbyName(getPB(), newName, parentTagID);
	}
);

export const updateOneTagByName = command(
	v.object({
		tagID: v.string(),
		newName: v.string()
	}),
	({ tagID, newName }) => {
		db.updateOneTagByName(getPB(), tagID, newName);
	}
);

export const updateOneTagByParent = command(
	v.object({
		tagID: v.string(),
		parentTagID: v.string()
	}),
	({ tagID, parentTagID }) => {
		db.updateOneTagByParent(getPB(), tagID, parentTagID);
	}
);

export const deleteTag = command(v.string(), (recordID) => {
	db.deleteTag(getPB(), recordID);
});
