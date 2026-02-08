import pb from '$lib/db.svelte';
import { tryCatch } from '$lib/utils.svelte';
import { type PError, type Setting } from '$lib/types';
import { settingCollection } from '$lib/const';
import { getContext, setContext } from 'svelte';

export class settingState {
	ratingWeight = $state<number>();
	recencyWeight = $state<number>();
	weightWeight = $state<number>();
	randomWeight = $state<number>();
	fullPenaltyWindow = $state<number>();
	decayWindow = $state<number>();
	maxDay = $state<number>();
	daysOld = $state<number>();
	scoreRefreshHour = $state<number>();
	youtubeAPIKey = $state<string>();
	nsfwBlur = $state<boolean>();
	karakeepData = $state<{ url: string; apiKey: string }>();

	/**
	 * return setting values by type
	 */
	stringToTyped(value: string) {
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
	typedToString(value: number | string | boolean) {
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

	async makeDefaultValue<T extends string | number | boolean>(name: string, defaultValue: T) {
		const stringValue = this.typedToString(defaultValue);

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

	async makeDefaultJSONValue<T>(name: string, defaultValue: T) {
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

	async changeSetting<T extends number | string | boolean>(name: string, newValue: T) {
		const { data: settingRecord, error } = await tryCatch<Setting, PError>(
			pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
		);

		if (error || !settingRecord) {
			console.error('Error getting setting: ', name, error.message);
			return;
		}

		const stringValue = this.typedToString(newValue);

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

	async changeJSONSetting<T>(name: string, newValue: T) {
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

		console.log(settingUpdate.jsonValue);

		return settingUpdate.jsonValue;
	}

	async getJsonSetting<T>(name: string, defaultValue: T) {
		const { data, error } = await tryCatch<Setting, PError>(
			pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
		);

		if (error || !data) {
			console.error('Error getting setting: ', name, error.message);
			await this.makeDefaultJSONValue(name, defaultValue);
			return defaultValue;
		}

		return data.jsonValue as T;
	}

	async getSetting<T extends string | number | boolean>(name: string, defaultValue: T) {
		const { data, error } = await tryCatch<Setting, PError>(
			pb.collection(settingCollection).getFirstListItem(`name="${name}"`)
		);

		if (error || !data) {
			console.error('Error getting setting: ', name, error.message);
			await this.makeDefaultValue(name, defaultValue);
			return defaultValue;
		}

		return this.stringToTyped(data.value) as T;
	}

	async getDefaultSettings() {
		this.ratingWeight = await this.getSetting('ratingWeight', 3);
		this.recencyWeight = await this.getSetting('recencyWeight', 3);
		this.weightWeight = await this.getSetting('weightWeight', 3);
		this.randomWeight = await this.getSetting('randomWeight', 3);
		this.maxDay = await this.getSetting('maxDay', 60);
		this.fullPenaltyWindow = await this.getSetting('fullPenaltyWindow', 1);
		this.decayWindow = await this.getSetting('decayWindow', 12);
		this.daysOld = await this.getSetting('daysOld', 0);
		this.scoreRefreshHour = await this.getSetting('scoreRefreshHour', 6);
		this.youtubeAPIKey = await this.getSetting('youtubeAPIKey', '');
		this.nsfwBlur = await this.getSetting('nsfwBlur', false);
		this.karakeepData = await this.getJsonSetting('karakeep', { url: '', apiKey: '' });
	}
}

const SETTING_KEY = Symbol('SETTING');

export function setSettingState() {
	return setContext(SETTING_KEY, new settingState());
}

export function getSettingState() {
	return getContext<ReturnType<typeof setSettingState>>(SETTING_KEY);
}
