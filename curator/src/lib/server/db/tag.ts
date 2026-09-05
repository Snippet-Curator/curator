import PocketBase from 'pocketbase';

import { viewTagsCollectionName, tagsCollection } from '$lib/server/const';
import { type Tag } from '$lib/types';

export async function getAllTags(pb: PocketBase) {
	// const start = performance.now()

	const records = await pb.collection(viewTagsCollectionName).getFullList<Tag>({
		sort: 'name',
		expand: 'parent'
	});

	// const mid = performance.now()
	// console.log(`after db: ${mid - start} ms`)

	const flatTags = records;
	const pinnedTags: Tag[] = [];

	const tagMap = new Map();
	records.forEach((tag) => {
		tagMap.set(tag.id, { ...tag, children: [] });
		if (tag.status === 'pinned') {
			pinnedTags.push(tag);
		}
	});

	let rootTags: Tag[] = [];
	tagMap.forEach((tag) => {
		if (tag.expand.parent) {
			const parent = tagMap.get(tag.expand.parent.id);
			parent.children.push(tag);
		} else {
			rootTags.push(tag);
		}
	});

	// const end = performance.now()
	// console.log('tags updated in: ', end - start, 'ms')
	return {
		flatTags,
		pinnedTags,
		rootTags
	};
}

export async function deleteTag(pb: PocketBase, recordID: string) {
	await pb.collection(tagsCollection).delete(recordID);
}

export async function getOneTag(pb: PocketBase, tagID: string) {
	return await pb.collection(tagsCollection).getOne(tagID);
}

export async function createOneTagbyName(pb: PocketBase, newName: string, parentTagID = '') {
	await pb.collection(tagsCollection).create({
		name: newName,
		parent: parentTagID,
		user: pb.authStore.record?.id
	});
}

export async function updateOneTagByName(pb: PocketBase, recordID: string, newName: string) {
	await pb.collection(tagsCollection).update(recordID, {
		name: newName
	});
}

export async function updateOneTagByParent(pb: PocketBase, recordID: string, parentTagID: string) {
	await pb.collection(tagsCollection).update(recordID, {
		parent: parentTagID
	});
}

export async function pinTag(pb: PocketBase, recordID: string) {
	await pb.collection(tagsCollection).update(recordID, {
		status: 'pinned'
	});
}

export async function unpinTag(pb: PocketBase, recordID: string) {
	await pb.collection(tagsCollection).update(recordID, {
		status: ''
	});
}
