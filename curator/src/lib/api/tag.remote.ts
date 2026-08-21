import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/tag';
import { getPB } from './utils';

export const getAllTags = query(() => {
	return db.getAllTags(getPB());
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
		db.createOneTagbyName(getPB(), newName, parentTagID);
	}
);
