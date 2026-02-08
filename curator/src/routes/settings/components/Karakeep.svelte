<script lang="ts">
	import { getSettingState } from '$lib/setting.svelte';

	const settingState = getSettingState();

	let url = $state(settingState.karakeepData?.url ?? '');
	let apiKey = $state(settingState.karakeepData?.apiKey ?? '');

	let isEdit = $state(false);

	async function changeAPI() {
		await settingState.changeJSONSetting('karakeep', { url, apiKey });
		console.log('Changed setting, karaKeep:', url, apiKey);
		isEdit = false;
	}
</script>

<div class="gap-x-golden-md gap-y-golden-sm grid grid-cols-12">
	<div class="col-span-4">
		<legend class="fieldset-legend">Karakeep</legend>
	</div>
	{#if isEdit}
		<div class="col-span-8 justify-end">
			<div class="gap-y-golden-sm flex flex-col">
				<label for="url" class="label">Server URL</label>
				<input
					type="text"
					name="url"
					placeholder="http://localhost:3022"
					class="input w-full"
					bind:value={url}
				/>

				<label for="apiKey" class="label">API Key</label>
				<input name="apiKey" type="text" class="input w-full" bind:value={apiKey} />
			</div>
			<div class="space-x-golden-sm my-golden-sm flex justify-end">
				<button onclick={changeAPI} class="btn btn-primary">Save</button>
				<button
					class="btn"
					onclick={() => {
						url = settingState.karakeepData?.url ?? '';
						apiKey = settingState.karakeepData?.apiKey ?? '';
						isEdit = false;
					}}>Cancel</button
				>
			</div>
		</div>
	{:else}
		<div class="gap-y-golden-sm col-span-8 flex flex-col items-end justify-end">
			<!-- {#if url && apiKey} -->
			<div>
				<label for="url" class="label">Server URL</label>
				<span> {url}</span>
			</div>

			<div>
				<label for="apiKey" class="label">API Key</label>
				<span>{apiKey}</span>
			</div>
			<!-- {/if} -->

			<div class="place-self-end">
				<button onclick={() => (isEdit = true)} class="btn">Edit</button>
			</div>
		</div>
	{/if}
</div>
