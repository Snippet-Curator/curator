import * as v from 'valibot';
import { command } from '$app/server';
import { processImport } from '$lib/server/imports/processor';
import { getPB } from '$lib/server/pocketbase';
import { createImport, updateImport } from '$lib/server/db/imports';

export const startImport = command(v.file(), async (file) => {
	const importRecord = await createImport(getPB(), file);

	await processImport(getPB(), importRecord.id).catch(async (error) => {
		await updateImport(getPB(), importRecord.id, { error: error });
	});

	return importRecord.id;
});
