import { getContext, setContext } from 'svelte';
import type { Tag } from '$lib/types';
import { getAllTags } from '$lib/api/tag.remote';

export class TagState {
	rootTags = $state<Tag[]>([]);
	flatTags = $state<Tag[]>([]);
	pinnedTags = $state<Tag[]>([]);

	constructor() {
		this.load();
	}

	async load() {
		const allTags = await getAllTags();
		this.flatTags = allTags?.flatTags ?? [];
		this.rootTags = allTags?.rootTags ?? [];
		this.pinnedTags = allTags?.pinnedTags ?? [];
	}
}

const TAG_KEY = Symbol('TAG');

export function setTagState() {
	return setContext(TAG_KEY, new TagState());
}

export function getTagState() {
	return getContext<ReturnType<typeof setTagState>>(TAG_KEY);
}
