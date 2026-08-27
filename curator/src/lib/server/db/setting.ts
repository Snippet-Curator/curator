import PocketBase from 'pocketbase';

import { tryCatch } from '$lib/utils';
import { type PError, type Setting } from '$lib/types';
import { settingCollection } from '$lib/const';

/**
 * return setting values by type
 */
function stringToTyped(value: string) {
	// booleans
	const normalized = String(value).toLowerCase().trim();
	if (normalized === 'true') return true;
	if (normalized === 'false') return false;

	// numbers
	// check if the string is not empty and is a valid number
	if (value !== '' && !isNaN(value)) {
		return Number(value);
	}

	// fallback to string
	return value;
}

/**
 * returns setting strings as typed values
 */
function typedToString(value: number | string | boolean) {
	if (value === null || value === undefined) {
		return '';
	}

	if (typeof value === 'boolean') {
		return value ? 'true' : 'false';
	}

	if (typeof value === 'number') {
		return value.toString();
	}

	return value;
}

async function makeDefaultValue<T extends string | number | boolean>(
	pb: PocketBase,
	name: string,
	defaultValue: T
) {
	const stringValue = typedToString(defaultValue);

	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).create({
			name: name,
			value: stringValue,
			user: pb.authStore.record?.id
		})
	);

	if (error || !data) {
		throw new Error(`Error making default setting: ${name}`);
	}

	return defaultValue;
}

async function makeDefaultJSONValue<T>(pb: PocketBase, name: string, defaultValue: T) {
	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).create({
			name: name,
			jsonValue: defaultValue,
			user: pb.authStore.record?.id
		})
	);

	if (error || !data) {
		throw new Error(`Error making default setting: ${name}`);
	}

	return defaultValue;
}

export async function changeSetting<T extends number | string | boolean>(
	pb: PocketBase,
	name: string,
	newValue: T
) {
	const { data: settingRecord, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !settingRecord) {
		console.error('Error getting setting: ', name, error.message);
		return;
	}

	const stringValue = typedToString(newValue);

	const { data: settingUpdate, error: errorUpdate } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).update(settingRecord.id, {
			value: stringValue
		})
	);

	if (errorUpdate || !settingUpdate) {
		console.error('Error making setting: ', name, errorUpdate.message);
		return;
	}

	return settingUpdate.value;
}

export async function changeJSONSetting<T>(pb: PocketBase, name: string, newValue: T) {
	const { data: settingRecord, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !settingRecord) {
		console.error('Error getting setting: ', name, error.message);
		return;
	}

	const { data: settingUpdate, error: errorUpdate } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).update(settingRecord.id, {
			jsonValue: newValue
		})
	);

	if (errorUpdate || !settingUpdate) {
		console.error('Error making setting: ', name, errorUpdate.message);
		return;
	}

	return settingUpdate.jsonValue;
}

export async function getJsonSetting<T>(pb: PocketBase, name: string, defaultValue: T) {
	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !data) {
		console.error('Error getting setting: ', name, error.message);
		await makeDefaultJSONValue(pb, name, defaultValue);
		return defaultValue;
	}

	return data.jsonValue as T;
}

export async function getJsonReadOnlySetting<T>(pb: PocketBase, name: string) {
	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !data) {
		console.error('Error getting setting: ', name, error.message);
	}

	return data.jsonValue as T;
}

export async function getSetting<T extends string | number | boolean>(
	pb: PocketBase,
	name: string,
	defaultValue: T
) {
	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !data) {
		console.error('Error getting setting: ', name, error.message);
		await makeDefaultValue(pb, name, defaultValue);
		return defaultValue;
	}

	return stringToTyped(data.value) as T;
}

export async function getReadOnlySetting<T extends string | number | boolean>(
	pb: PocketBase,
	name: string
) {
	const { data, error } = await tryCatch<Setting, PError>(
		pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
	);

	if (error || !data) {
		console.error('Error getting setting: ', name, error.message);
	}

	return stringToTyped(data.value) as T;
}

export async function getDefaultSettings(pb: PocketBase) {
	const ratingWeight = await getSetting(pb, 'ratingWeight', 3);
	const recencyWeight = await getSetting(pb, 'recencyWeight', 3);
	const weightWeight = await getSetting(pb, 'weightWeight', 3);
	const randomWeight = await getSetting(pb, 'randomWeight', 3);
	const maxDay = await getSetting(pb, 'maxDay', 60);
	const fullPenaltyWindow = await getSetting(pb, 'fullPenaltyWindow', 1);
	const decayWindow = await getSetting(pb, 'decayWindow', 12);
	const daysOld = await getSetting(pb, 'daysOld', 0);
	const scoreRefreshHour = await getSetting(pb, 'scoreRefreshHour', 6);
	const youtubeAPIKey = await getSetting(pb, 'youtubeAPIKey', '');
	const nsfwBlur = await getSetting(pb, 'nsfwBlur', false);
	const karakeepData = await getJsonSetting(pb, 'karakeep', { url: '', apiKey: '' });

	return {
		ratingWeight,
		recencyWeight,
		weightWeight,
		randomWeight,
		maxDay,
		fullPenaltyWindow,
		decayWindow,
		daysOld,
		scoreRefreshHour,
		youtubeAPIKey,
		nsfwBlur,
		karakeepData
	};
}
