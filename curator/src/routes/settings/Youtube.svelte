<script lang="ts">
	import InputText from '$lib/components/Layout/InputText.svelte';
	import { getSettingState } from '$lib/setting.svelte';
	InputText;
	const settingState = getSettingState();
</script>

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-xl">APIs</div>
		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-4">
				<legend class="fieldset-legend">Youtube API Key</legend>
				Used to add youtube videos.
			</div>

			<InputText
				textInput={settingState.youtubeAPIKey ?? ''}
				action={async (newAPI) => {
					await settingState.changeSetting('youtubeAPIKey', newAPI);
					console.log('Changed setting, youtube API:', newAPI);
				}}
			/>
		</div>
	</div>
</div>
