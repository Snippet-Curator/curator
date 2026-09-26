import { getContext, setContext } from 'svelte';
import { getAllTags, getTagCounts } from '$lib/api/tag.remote';

export class TagState {
	tagQuery = getAllTags();
	rootTags = $derived(this.tagQuery.current?.rootTags);
	flatTags = $derived(this.tagQuery.current?.flatTags);
	pinnedTags = $derived(this.tagQuery.current?.pinnedTags);

	tagCountsQuery = getTagCounts();
	tagCounts = $derived(
		Object.fromEntries((this.tagCountsQuery.current ?? []).map((c) => [c.id, c.note_count]))
	);

	async refresh() {
		await this.tagQuery.refresh();
	}

	getTagCount(tagID: string) {
		return this.tagCounts[tagID] ?? 0;
	}
}

const TAG_KEY = Symbol('TAG');

export function setTagState() {
	return setContext(TAG_KEY, new TagState());
}

export function getTagState() {
	return getContext<ReturnType<typeof setTagState>>(TAG_KEY);
}
