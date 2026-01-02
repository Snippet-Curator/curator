import PocketbaseQuery from '@emresandikci/pocketbase-query';

import { getContext, setContext } from 'svelte';

import type { Notebook, Tag } from '$lib/types';
import { tryCatch } from '$lib/utils.svelte';
import pb from '$lib/db.svelte';
import { viewNotebooksCollection, viewTagsCollectionName } from '$lib/const';

export class SearchState {
	searchTerm = $state('');
	searchInput = $state('');
	selectedTagIdArray = $state<string[]>([]);
	selectedExcludeTagIdArray = $state<string[]>([]);
	searchedTagID = $state<string>('');
	searchNotebookID = $state<string>('');
	customFilter = $state(`(status="active" || status="archived")`);
	tagFilter = $state('');
	query = PocketbaseQuery.getInstance<{
		title: string;
		content: string;
		tags: Tag;
		notebook: Notebook;
		status: 'active' | 'archived' | 'deleted';
	}>();

	resetCustomFilter() {
		this.customFilter = `(status="active" || status="archived")`;
	}

	getTagFilter(selectedTagIdArray: string[]) {
		return selectedTagIdArray.map((tagId) => `tags~"${tagId}"`).join(' && ');
	}

	getTagExcludeFilter(selectedTagIdArray: string[]) {
		return selectedTagIdArray.map((tagId) => `tags!~"${tagId}"`).join(' && ');
	}

	async getSearchTags(searchInput: string) {
		if (!searchInput) {
			this.searchedTagID = '';
			return;
		}

		const { data, error } = await tryCatch(
			pb.collection(viewTagsCollectionName).getFirstListItem(`name~"${searchInput}"`)
		);

		if (error || !data) {
			console.error('Error getting search tags: ', error.data);
			this.searchedTagID = '';
			return;
		}

		this.searchedTagID = data.id;
	}

	async getSearchNotebook(searchInput: string) {
		if (!searchInput) {
			this.searchNotebookID = '';
			return;
		}

		const { data, error } = await tryCatch(
			pb.collection(viewNotebooksCollection).getFirstListItem(`name~"${searchInput}"`)
		);

		if (error || !data) {
			console.error('Error getting search notebook: ', error.data);
			this.searchNotebookID = '';
			return;
		}

		this.searchNotebookID = data.id;
	}

	makeSearchQuery(searchInput: string) {
		this.customFilter = this.query
			.openBracket()
			.like('title', this.searchInput)
			.or()
			.like('content', searchInput)
			.or()
			.like('tags', this.searchedTagID)
			.or()
			.equal('notebook', this.searchNotebookID)
			.closeBracket()
			.and()
			.openBracket()
			.equal('status', 'active')
			.or()
			.equal('status', 'archived')
			.closeBracket()
			.build();
	}

	makeFilterQuery(searchInput: string) {
		const tagFilter = this.getTagFilter(this.selectedTagIdArray);
		const tagExcludeFilter = this.getTagExcludeFilter(this.selectedExcludeTagIdArray);
		this.customFilter = this.query
			.openBracket()
			.like('title', searchInput)
			.or()
			.like('content', searchInput)
			.closeBracket()
			.and()
			.customFilter(tagFilter)
			.and()
			.customFilter(tagExcludeFilter)
			.and()
			.equal('notebook', this.searchNotebookID)
			.and()
			.openBracket()
			.equal('status', 'active')
			.or()
			.equal('status', 'archived')
			.closeBracket()
			.build();
	}
}

export function setSearchState() {
	return setContext('search', new SearchState());
}

export function getSearchState() {
	return getContext<ReturnType<typeof setSearchState>>('search');
}
