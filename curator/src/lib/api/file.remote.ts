import * as v from 'valibot';
import { command } from '$app/server';

import * as db from '$lib/server/pocketbase';

export const uploadFileToPocketbase = command(
	v.object({
		recordID: v.string(),
		file: v.file()
	}),
	({ recordID, file }) => {
		return db.uploadFileToPocketbase(db.getPB(), recordID, file);
	}
);
