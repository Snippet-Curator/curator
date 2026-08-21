<script lang="ts">
	import { getSetting, changeSetting } from '$lib/api/setting.remote';

	let nsfwBlur = $derived(await getSetting('nsfwBlur'));
	let toggleNsfwBlur = $state<boolean>(nsfwBlur);
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
				bind:checked={toggleNsfwBlur}
				onchange={async () => {
					await changeSetting({
						name: 'nsfwBlur',
						newValue: toggleNsfwBlur
					});
					await getSetting('nsfwBlur').refresh();
					console.log('Changed setting, nsfwBlur:', toggleNsfwBlur);
				}}
			/>
		</div>
	</div>
</div>
