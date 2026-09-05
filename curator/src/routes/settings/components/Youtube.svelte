<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';

	import { getYoutubeSettings, getSetting, changeSetting } from '$lib/api/setting.remote';

	let youtubeSettings = $derived(await getYoutubeSettings());
	let youtubeAPIKey = $derived(await getSetting('youtubeAPIKey'));
	let isEdit = $state(false);
	let newYoutubeAccessToken = $state(youtubeSettings.youtubeAccessToken);
	let newYoutubeRefreshToken = $state(youtubeSettings.youtubeRefreshToken);
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
			<span class="text-base-content/70"
				>The refresh token and access token are displayed here. You'll need to add Google client ID
				and secret under .env file.
			</span>
		</div>

		<div class="gap-y-golden-md col-span-12 flex flex-col justify-end md:col-span-6">
			{#if isEdit}
				<div class="justify-end">
					<div class="gap-y-golden-sm flex flex-col">
						<label for="refresh token" class="label">Refresh Token</label>
						<input
							name="refresh token"
							type="text"
							class="input w-full"
							bind:value={newYoutubeRefreshToken}
						/>

						<label for="access token" class="label">Access Token</label>
						<input
							type="text"
							name="access token"
							class="input w-full"
							bind:value={newYoutubeAccessToken}
						/>
					</div>

					<div class="space-x-golden-sm my-golden-sm flex justify-end">
						<button
							onclick={async () => {
								await changeSetting({
									name: 'youtubeAccessToken',
									newValue: newYoutubeAccessToken
								});
								await changeSetting({
									name: 'youtubeRefreshToken',
									newValue: newYoutubeRefreshToken
								});
								isEdit = false;
							}}
							class="btn btn-primary">Save</button
						>
						<button
							class="btn"
							onclick={() => {
								newYoutubeRefreshToken = youtubeSettings.youtubeRefreshToken;
								newYoutubeAccessToken = youtubeSettings.youtubeAccessToken;
								isEdit = false;
							}}>Cancel</button
						>
					</div>
				</div>
			{:else}
				<div class="gap-y-golden-sm col-span-12 flex flex-col justify-end md:col-span-8">
					{#if newYoutubeRefreshToken}
						<div class="">
							<label for="url" class="label">Refresh Token</label>
							<span class="text-base-content/70 block truncate text-clip"
								>{newYoutubeRefreshToken}</span
							>
						</div>

						<div class="">
							<label for="apiKey" class="label"> Access Token</label>
							<span class="text-base-content/70 block truncate text-clip"
								>{newYoutubeAccessToken}</span
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
