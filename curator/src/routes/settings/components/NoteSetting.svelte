<script lang="ts">
	import { getSettingState } from '$lib/setting.svelte';

	const settingState = getSettingState();
</script>

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-base-content/70 mb-golden-lg text-xl tracking-widest uppercase">
			Note List
		</div>

		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-10">
				<legend class="fieldset-legend">Blur NSFW Notes</legend>
				<span class="text-base-content/70">
					Notes tagged with 'nsfw' will have blurred thumbnails.</span
				>
			</div>
			<input
				type="checkbox"
				class="toggle col-span-2 justify-self-end"
				bind:checked={settingState.nsfwBlur}
				onchange={async () => {
					const newValue = await settingState.changeSetting('nsfwBlur', settingState.nsfwBlur);
					console.log('Changed setting, nsfwBlur:', newValue);
				}}
			/>
		</div>
	</div>
</div>
