<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';

	import { getYoutubeSettings, getSetting, changeSetting } from '$lib/api/setting.remote';

	let youtubeSettings = $derived(await getYoutubeSettings());
	let youtubeAPIKey = $derived(await getSetting('youtubeAPIKey'));
	let isEdit = $state(false);
	// let newYoutubeAccessToken = $state(youtubeSettings.youtubeAccessToken);
	let newYoutubeRefreshToken = $state(youtubeSettings.youtubeRefreshToken);
	let newGOOGLE_CLIENT_SECRET = $state(youtubeSettings.GOOGLE_CLIENT_ID);
	let newGOOGLE_CLIENT_ID = $state(youtubeSettings.GOOGLE_CLIENT_SECRET);
</script>

<div class="gap-y-golden-lg flex flex-col">
	<div class="gap-x-golden-md grid grid-cols-12 items-start">
		<div class="col-span-12"><legend class="fieldset-legend">Youtube API Key</legend></div>
		<div class="col-span-12 md:col-span-6">
			<span class="text-base-content/70"
				>Add or edit Youtube API key. You only need API key to import youtube videos manually.
			</span>
		</div>

		<div class="gap-y-golden-md col-span-12 flex flex-col justify-end md:col-span-6">
			<InputText
				textInput={youtubeAPIKey}
				action={async (newAPI) => {
					await changeSetting({ name: 'youtubeAPIKey', newValue: newAPI });
					await getSetting('youtubeAPIKey').refresh();
					console.log('Changed setting, youtube API:', newAPI);
				}}
			/>
		</div>
	</div>
	<div class="gap-x-golden-md grid grid-cols-12 items-start">
		<div class="col-span-12"><legend class="fieldset-legend">Connect to Youtube</legend></div>
		<div class="col-span-12 md:col-span-6">
			<span class="text-base-content/70">Add Google Client ID and Secret here. </span>
		</div>

		<div class="gap-y-golden-md col-span-12 flex flex-col justify-end md:col-span-6">
			{#if isEdit}
				<div class="justify-end">
					<div class="gap-y-golden-sm flex flex-col">
						<label for="refresh token" class="label">Client ID</label>
						<input
							name="refresh token"
							type="text"
							class="input w-full"
							bind:value={newGOOGLE_CLIENT_ID}
						/>

						<label for="access token" class="label">Client Secret</label>
						<input
							type="text"
							name="access token"
							class="input w-full"
							bind:value={newGOOGLE_CLIENT_SECRET}
						/>
					</div>

					<div class="space-x-golden-sm my-golden-sm flex justify-end">
						<button
							onclick={async () => {
								await changeSetting({
									name: 'googleClientID',
									newValue: newGOOGLE_CLIENT_ID
								});
								await changeSetting({
									name: 'googleClientSecret',
									newValue: newGOOGLE_CLIENT_SECRET
								});
								isEdit = false;
							}}
							class="btn btn-primary">Save</button
						>
						<button
							class="btn"
							onclick={() => {
								newGOOGLE_CLIENT_ID = youtubeSettings.GOOGLE_CLIENT_ID;
								newGOOGLE_CLIENT_SECRET = youtubeSettings.GOOGLE_CLIENT_SECRET;
								isEdit = false;
							}}>Cancel</button
						>
					</div>
				</div>
			{:else}
				<div class="gap-y-golden-sm col-span-12 flex flex-col justify-end md:col-span-8">
					{#if newYoutubeRefreshToken}
						<div class="">
							<label for="url" class="label">Client ID</label>
							<span class="text-base-content/70 block truncate text-clip"
								>{newGOOGLE_CLIENT_ID}</span
							>
						</div>

						<div class="">
							<label for="apiKey" class="label">Client Secret</label>
							<span class="text-base-content/70 block truncate text-clip"
								>{newGOOGLE_CLIENT_SECRET}</span
							>
						</div>
					{/if}

					<div class="gap-golden-sm flex place-self-end">
						{#if youtubeSettings.youtubeRefreshToken}
							<a href="/youtube"> <button class="btn btn-neutral">Reconnect to Youtube</button></a>
						{:else}
							<a href="/youtube"> <button class="btn w-full">Connect to Youtube</button></a>
						{/if}
						<button onclick={() => (isEdit = true)} class="btn">Edit</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
