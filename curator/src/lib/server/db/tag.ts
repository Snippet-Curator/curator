import PocketBase from 'pocketbase';

import { tryCatch } from '$lib/utils';
import { viewTagsCollectionName, tagsCollection } from '$lib/server/const';
import { type Tag } from '$lib/types';

export async function getAllTags(pb: PocketBase) {
	// const start = performance.now()
	const { data: records, error } = await tryCatch(
		pb.collection(viewTagsCollectionName).getFullList<Tag>({
			sort: 'name',
			expand: 'parent'
		})
	);

	if (error) {
		console.error('Error while getting all tags: ', error.message);
	}

	if (!records) {
		return;
	}
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
	const { data, error } = await tryCatch(pb.collection(tagsCollection).delete(recordID));

	if (error) {
		console.error('Error while deleting tag: ', error);
	}
}

export async function getOneTag(pb: PocketBase, tagID: string) {
	const { data, error } = await tryCatch(pb.collection(tagsCollection).getOne(tagID));

	if (error) {
		console.error('Error getting tag: ', error);
	}

	return data;
}

export async function createOneTagbyName(pb: PocketBase, newName: string, parentTagID?: string) {
	const { data, error } = await tryCatch(
		pb.collection(tagsCollection).create({
			name: newName,
			parent: parentTagID,
			user: pb.authStore.record?.id
		})
	);
	if (error) {
		console.error('Error while creating new tag: ', error.data);
	}
	return data;
}

export async function updateOneTagByName(pb: PocketBase, recordID: string, newName: string) {
	const { data, error } = await tryCatch(
		pb.collection(tagsCollection).update(recordID, {
			name: newName
		})
	);
	if (error) {
		console.error('Error while updating tag name: ', error.message, error.data);
	}
	return data;
}

export async function updateOneTagByParent(pb: PocketBase, recordID: string, parentTagID: string) {
	const { data, error } = await tryCatch(
		pb.collection(tagsCollection).update(recordID, {
			parent: parentTagID
		})
	);
	if (error) {
		console.error('Error while updating parent tag: ', error.message);
	}
}

export async function pinTag(pb: PocketBase, recordID: string) {
	const { data, error } = await tryCatch(
		pb.collection(tagsCollection).update(recordID, {
			status: 'pinned'
		})
	);
	if (error) {
		console.error('Error pinning tag: ', error.message, error.data);
	}
}

export async function unpinTag(pb: PocketBase, recordID: string) {
	const { data, error } = await tryCatch(
		pb.collection(tagsCollection).update(recordID, {
			status: ''
		})
	);
	if (error) {
		console.error('Error unpin tag: ', error.message, error.data);
	}
}
