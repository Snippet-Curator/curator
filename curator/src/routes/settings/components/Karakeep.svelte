<script lang="ts">
	import { enhance } from '$app/forms';
	import { getSettingState } from '$lib/setting.svelte';

	const settingState = getSettingState();

	let url = $state(settingState.karakeepData?.url ?? '');
	let apiKey = $state(settingState.karakeepData?.apiKey ?? '');

	let isEdit = $state(false);

	let { form } = $props();

	async function changeAPI() {
		await settingState.changeJSONSetting('karakeep', { url, apiKey });
		console.log('Changed setting, karaKeep:', url, apiKey);
		isEdit = false;
	}

	$effect(() => {
		console.log(form);
	});
</script>

<div class="gap-x-golden-md gap-y-golden-sm grid grid-cols-12">
	<div class="col-span-12 md:col-span-4">
		<legend class="fieldset-legend">Karakeep</legend>
	</div>
	{#if isEdit}
		<div class="col-span-12 justify-end md:col-span-8">
			<div class="gap-y-golden-sm flex flex-col">
				<label for="server" class="label">Server URL</label>
				<input
					type="text"
					name="server"
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
		<form
			method="POST"
			action="?/getUser"
			use:enhance
			class="gap-y-golden-sm col-span-12 flex flex-col justify-end md:col-span-8"
		>
			{#if url && apiKey}
				<div class="place-self-end">
					<label for="url" class="label">Server URL</label>
					<input type="hidden" name="server" bind:value={url} />
					<span class="text-base-content/70"> {url}</span>
				</div>

				<div class="place-self-end">
					<label for="apiKey" class="label">API Key</label>
					<input type="hidden" name="apiKey" bind:value={apiKey} />
					<span class="text-base-content/70 truncate text-clip">{apiKey}</span>
				</div>
			{/if}

			{#if form?.error}
				<div class="alert alert-soft alert-error my-2">Error! {form.error}.</div>
			{/if}

			{#if form?.success}
				<div class="alert alert-soft alert-success my-2">
					Success! Logged in as {form.user.name}.
				</div>
			{/if}

			<div class="place-self-end">
				<button class="btn" type="submit">Test</button>
				<button onclick={() => (isEdit = true)} class="btn">Edit</button>
			</div>
		</form>
	{/if}
</div>
