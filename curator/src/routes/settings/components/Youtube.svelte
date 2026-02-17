<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';

	import { getSettingState } from '$lib/setting.svelte';

	const settingState = getSettingState();
</script>

<div class="gap-x-golden-md grid grid-cols-12 items-center">
	<div class="col-span-12 md:col-span-4">
		<legend class="fieldset-legend">Youtube API Key</legend>
		<span class="text-base-content/70"> Used to add youtube videos.</span>
	</div>

	<div class="col-span-12 md:col-span-8">
		<InputText
			textInput={settingState.youtubeAPIKey ?? ''}
			action={async (newAPI) => {
				await settingState.changeSetting('youtubeAPIKey', newAPI);
				console.log('Changed setting, youtube API:', newAPI);
			}}
		/>
	</div>
</div>
