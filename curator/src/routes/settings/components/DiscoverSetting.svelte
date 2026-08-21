<script lang="ts">
	import { changeSetting, getDefaultSettings } from '$lib/api/setting.remote';

	let allSettings = $derived(await getDefaultSettings());
	let recencyWeight = $derived(allSettings.recencyWeight);
	let ratingWeight = $derived(allSettings.ratingWeight);
	let weightWeight = $derived(allSettings.weightWeight);
	let randomWeight = $derived(allSettings.randomWeight);
	let maxDay = $derived(allSettings.maxDay);
	let fullPenaltyWindow = $derived(allSettings.fullPenaltyWindow);
	let decayWindow = $derived(allSettings.decayWindow);
	let daysOld = $derived(allSettings.daysOld);
	let scoreRefreshHour = $derived(allSettings.scoreRefreshHour);
</script>

{#snippet renderSliderSetting(
	name: string,
	title: string,
	initialValue = 0,
	description = '',
	min = 0,
	max = 10,
	step = 1
)}
	<div class="gap-x-golden-md grid grid-cols-12 content-start">
		<legend class="fieldset-legend col-span-12">{title}</legend>
		<div class="text-base-content/70 col-span-11">
			<p>{description}</p>
		</div>
		<div class="space-x-golden-lg mt-golden-md col-span-11 flex">
			<input
				type="range"
				class="range range-sm w-full text-right"
				required
				{min}
				{max}
				value={initialValue}
				{step}
				oninput={async (event: Event) => {
					const input = event.target as HTMLInputElement;
					let newValue = input.valueAsNumber;
					if (!newValue) newValue = 0;
					await changeSetting({ name, newValue });
					await getDefaultSettings().refresh();
					console.log('Changed setting: ', name, newValue);
				}}
			/>
			<span>{initialValue}</span>
		</div>
	</div>
{/snippet}

{#snippet renderDiscoverSetting(
	name: string,
	title: string,
	initialValue = 0,
	description = '',
	min = 0,
	max = 10,
	step = 1
)}
	<div class="gap-x-golden-md grid grid-cols-12 content-start">
		<legend class="fieldset-legend col-span-12">{title}</legend>
		<div class="text-base-content/70 col-span-9">
			<p>{description}</p>
		</div>
		<input
			type="number"
			class="input col-span-2"
			required
			{min}
			{max}
			value={initialValue}
			{step}
			onchange={async (event: Event) => {
				const input = event.target as HTMLInputElement;
				let newValue = input.valueAsNumber;
				if (!newValue) newValue = 0;
				await changeSetting({ name, newValue });
				await getDefaultSettings().refresh();
				console.log('Changed setting: ', name, newValue);
			}}
		/>
	</div>
{/snippet}

<div class="card">
	<div class="card-body">
		<div class="card-title text-base-content/70 mb-golden-lg text-xl tracking-widest uppercase">
			Discover
		</div>

		<div class="gap-x-golden-md space-y-golden-lg grid grid-cols-1 md:grid-cols-2">
			{@render renderSliderSetting(
				'recencyWeight',
				'Recency Weight',
				recencyWeight,
				'Weight of how recently a note was seen. Older notes will be ranked higher.'
			)}
			{@render renderSliderSetting(
				'ratingWeight',
				'Rating Weight',
				ratingWeight,
				'Weight of note rating in score calculation. Higher rated notes will be ranked higher.'
			)}
			{@render renderSliderSetting(
				'weightWeight',
				'Voting Weight',
				weightWeight,
				'Weight of upvote vs downvote of a note. More upvoted notes will be ranked higher'
			)}
			{@render renderSliderSetting(
				'randomWeight',
				'Random Weight',
				randomWeight,
				'Weight of random modifier. Higher weight means more randomness.'
			)}
			{@render renderDiscoverSetting(
				'maxDay',
				'Max Day Cutoff (Day)',
				maxDay,
				'Notes older than this cutoff will receive the maximum recency score.',
				0,
				365,
				1
			)}
			{@render renderDiscoverSetting(
				'fullPenaltyWindow',
				'Full Penalty Window (Hour)',
				fullPenaltyWindow,
				'Notes seen in this window will be penalized to be ranked less (default 1 hour).',
				1,
				24,
				1
			)}
			{@render renderDiscoverSetting(
				'decayWindow',
				'Penality Recovery Window (Hour)',
				decayWindow,
				'Penalty will gradually reduce during this time period for penalized notes (default 12 hours).',
				1,
				1000,
				1
			)}
			{@render renderDiscoverSetting(
				'daysOld',
				'Refresh Score Cutoff (Day)',
				daysOld,
				'Notes with score older than this will get a score refresh on startup and every few hours to recalculate based on recency. Use 0 to refresh all notes (can increase load time).',
				0,
				365,
				1
			)}
			{@render renderDiscoverSetting(
				'scoreRefreshHour',
				'Score Refresh Frequency (Hour)',
				scoreRefreshHour,
				'Curator will refresh scores in the background. Default refresh is every 6 hours. Changing it to 0 to stop refresh automatically.',
				0,
				24,
				1
			)}
		</div>
	</div>
</div>
