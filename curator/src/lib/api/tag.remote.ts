import * as v from 'valibot';
import { query } from '$app/server';

import * as db from '$lib/server/db/tag';
import { getPB } from './utils';

export const getAllTags = query(() => {
	return db.getAllTags(getPB());
});
