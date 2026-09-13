import PocketBase from 'pocketbase';

import { filterCollection } from '$lib/server/const';
import type { Filter } from '$lib/types';

export async function createFilter(pb: PocketBase, name: string, queryString: string) {
	return await pb.collection(filterCollection).create<Filter>({
		name: name,
		query_string: queryString,
		user: pb.authStore.record?.id
	});
}

export async function deleteFilter(pb: PocketBase, filterID: string) {
	await pb.collection(filterCollection).delete(filterID);
}

export async function getAllFilters(pb: PocketBase) {
	return await pb.collection(filterCollection).getFullList<Filter>({
		sort: 'name'
	});
}

export async function updateFilter(
	pb: PocketBase,
	filterID: string,
	updates: Partial<{
		name: string;
		query_string: string;
	}>
) {
	return await pb.collection(filterCollection).update<Filter>(filterID, updates);
}
