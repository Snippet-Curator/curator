import { getContext, setContext } from 'svelte';
import { getAllFilters } from '$lib/api/filter.remote';

export class FilterState {
	filterQuery = getAllFilters();
	filters = $derived(this.filterQuery.current);

	async refresh() {
		await this.filterQuery.refresh();
	}
}

const FILTER_KEY = Symbol('FILTER');

export function setFilterState() {
	return setContext(FILTER_KEY, new FilterState());
}

export function getFilterState() {
	return getContext<ReturnType<typeof setFilterState>>(FILTER_KEY);
}
