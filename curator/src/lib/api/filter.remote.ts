import * as v from 'valibot';
import { command, query } from '$app/server';

import * as db from '$lib/server/db/filter';
import { getPB } from '$lib/server/pocketbase';

export const getAllFilters = query(async () => {
	return await db.getAllFilters(getPB());
});

export const createFilter = query(
	v.object({
		name: v.string(),
		queryString: v.string()
	}),
	async ({ name, queryString }) => {
		return await db.createFilter(getPB(), name, queryString);
	}
);

export const deleteFilter = command(v.string(), async (filterID) => {
	return await db.deleteFilter(getPB(), filterID);
});

export const updateFilter = command(
	v.object({
		filterID: v.string(),
		updates: v.object({
			name: v.optional(v.string()),
			query_string: v.optional(v.string())
		})
	}),
	async ({ filterID, updates }) => {
		return await db.updateFilter(getPB(), filterID, updates);
	}
);
