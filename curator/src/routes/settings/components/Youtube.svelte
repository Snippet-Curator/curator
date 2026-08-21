<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';

	import { getSetting, changeSetting } from '$lib/api/setting.remote';

	let youtubeAPI = $derived(await getSetting('youtubeAPIKey'));
</script>

<div class="gap-x-golden-md grid grid-cols-12 items-center">
	<div class="col-span-12 md:col-span-4">
		<legend class="fieldset-legend">Youtube API Key</legend>
		<span class="text-base-content/70"> Used to add youtube videos.</span>
	</div>

	<div class="col-span-12 md:col-span-8">
		<InputText
			textInput={youtubeAPI}
			action={async (newAPI) => {
				await changeSetting({ name: 'youtubeAPIKey', newValue: newAPI });
				await getSetting('youtubeAPIKey').refresh();
				console.log('Changed setting, youtube API:', newAPI);
			}}
		/>
	</div>
</div>
