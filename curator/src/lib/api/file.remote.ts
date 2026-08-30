import * as v from 'valibot';
import { command } from '$app/server';
import { getPB } from '$lib/server/pocketbase';

import * as db from '$lib/server/pocketbase';
import * as utils from '$lib/server/utils';

const resourceSchema = v.object({
	name: v.string(),
	size: v.number(),
	hash: v.string(),
	type: v.string(),
	lastUpdated: v.string(),
	fileURL: v.string(),
	oldFileURL: v.optional(v.string()),
	sourceURL: v.optional(v.string()),
	width: v.optional(v.number()),
	height: v.optional(v.number()),
	timestamp: v.optional(v.string()),
	latitude: v.optional(v.number()),
	longitude: v.optional(v.number()),
	cameraMake: v.optional(v.string())
});

export const uploadFileToPocketbase = command(
	v.object({
		recordID: v.string(),
		file: v.file()
	}),
	async ({ recordID, file }) => {
		return await db.uploadFileToPocketbase(db.getPB(), recordID, file);
	}
);

export const addMediaToContent = command(
	v.object({
		mimeType: v.string(),
		fileURL: v.string(),
		fileName: v.string()
	}),
	({ mimeType, fileURL, fileName }) => {
		return utils.addMediaToContent(mimeType, fileURL, fileName);
	}
);

export const addResourcesToRecord = command(
	v.object({
		recordID: v.string(),
		resource: resourceSchema
	}),
	async ({ recordID, resource }) => {
		return await utils.addResourcesToRecord(getPB(), recordID, resource);
	}
);

export const addThumbnailToRecord = command(
	v.object({
		recordID: v.string(),
		thumbURL: v.string()
	}),
	async ({ recordID, thumbURL }) => {
		return await utils.addThumbnailToRecord(getPB(), recordID, thumbURL);
	}
);

export const getFileHash = command(v.file(), async (file) => {
	return await utils.getFileHash(file);
});

export const getResourceforThumbGen = command(v.array(resourceSchema), (resources) => {
	return utils.getResourceforThumbGen(resources);
});

export const makeResourceFromFile = command(
	v.object({
		file: v.file(),
		hash: v.string(),
		url: v.string()
	}),
	({ file, hash, url }) => {
		return utils.makeResourceFromFile(file, hash, url);
	}
);
