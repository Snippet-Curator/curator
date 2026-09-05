<script lang="ts">
	import { enhance } from '$app/forms';
	import { getJsonSetting, changeJSONSetting } from '$lib/api/setting.remote';

	let karakeep = $derived(await getJsonSetting('karakeep'));

	let url = $derived(karakeep['url'] ?? '');
	let apiKey = $derived(karakeep['apiKey'] ?? '');

	let newURL = $state(url ?? '');
	let newApiKey = $state(apiKey ?? '');

	let isEdit = $state(false);

	let { form } = $props();

	async function changeAPI(url: string, apiKey: string) {
		await changeJSONSetting({
			name: 'karakeep',
			newValue: { url, apiKey }
		});
		console.log('Changed setting, karaKeep:', url, apiKey);
		isEdit = false;
	}

	$effect(() => {
		// console.log(form);
	});
</script>

<div class="gap-x-golden-md gap-y-golden-sm grid grid-cols-12 items-start">
	<div class="col-span-12 md:col-span-6">
		<legend class="fieldset-legend">Karakeep</legend>
	</div>

	{#if isEdit}
		<div class="col-span-12 justify-end md:col-span-6">
			<div class="gap-y-golden-sm flex flex-col">
				<label for="server" class="label">Server URL</label>
				<input
					type="text"
					name="server"
					placeholder="http://localhost:3022"
					class="input w-full"
					bind:value={newURL}
				/>

				<label for="apiKey" class="label">API Key</label>
				<input name="apiKey" type="text" class="input w-full" bind:value={newApiKey} />
			</div>

			<div class="space-x-golden-sm my-golden-sm flex justify-end">
				<button onclick={() => changeAPI(newURL, newApiKey)} class="btn btn-primary">Save</button>
				<button
					class="btn"
					onclick={() => {
						newURL = url;
						newApiKey = apiKey;
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
			class="gap-y-golden-sm col-span-12 flex flex-col justify-end md:col-span-6"
		>
			{#if newURL && newApiKey}
				<div class="place-self-end">
					<label for="url" class="label">Server URL</label>
					<input type="hidden" name="server" bind:value={newURL} />
					<span class="text-base-content/70"> {newURL}</span>
				</div>

				<div class="place-self-end">
					<label for="apiKey" class="label">API Key</label>
					<input type="hidden" name="apiKey" bind:value={newApiKey} />
					<span class="text-base-content/70 truncate text-clip">{newApiKey}</span>
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
				<button class="btn btn-neutral" type="submit">Test</button>
				<button onclick={() => (isEdit = true)} class="btn">Edit</button>
			</div>
		</form>
	{/if}
</div>
