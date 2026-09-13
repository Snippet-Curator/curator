import { getContext, setContext } from 'svelte';
import type { Filter } from '$lib/types';
import { getAllFilters } from '$lib/api/filter.remote';

export class FilterState {
	filters = $state<Filter[]>([]);

	constructor() {
		this.load();
	}

	async load() {
		this.filters = await getAllFilters();
	}

	async refresh() {
		await getAllFilters().refresh();
		this.filters = await getAllFilters();
	}
}

const FILTER_KEY = Symbol('FILTER');

export function setFilterState() {
	return setContext(FILTER_KEY, new FilterState());
}

export function getFilterState() {
	return getContext<ReturnType<typeof setFilterState>>(FILTER_KEY);
}
