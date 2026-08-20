import * as v from 'valibot';
import { query } from '$app/server';

import * as db from '$lib/server/db/notebook';
import { getPB } from './utils';

export const getAllNotebooks = query(() => {
	return db.getAllNotebooks(getPB());
});

export const getTotalNotecount = query(() => {
	return db.getTotalNotecount(getPB());
});

export const getInbox = query(() => {
	return db.getInbox(getPB());
});
