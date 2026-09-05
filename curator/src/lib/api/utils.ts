import * as v from 'valibot';

export const noteQuerySchema = v.object({
	page: v.number(),
	search: v.optional(v.string()),
	tagIDs: v.optional(v.array(v.string())),
	excludedTagIDs: v.optional(v.array(v.string())),
	notebookID: v.optional(v.string()),
	starred: v.optional(v.boolean()),
	status: v.string(),
	fullContent: v.boolean(),
	fullTextSearch: v.boolean(),
	sort: v.string()
});
