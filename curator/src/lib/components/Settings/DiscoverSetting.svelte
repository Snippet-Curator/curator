<script lang="ts">
	import { getSettingState } from '$lib/db.svelte';
	const settingState = getSettingState();
</script>

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
		<div class="col-span-9">
			<p>{description}</p>
		</div>
		<input
			type="number"
			class="input col-span-2 text-right"
			required
			{min}
			{max}
			value={initialValue}
			{step}
			onchange={(event: Event) => {
				const input = event.target as HTMLInputElement;
				let newValue = input.valueAsNumber;
				if (!newValue) newValue = 0;
				settingState[name] = newValue;
				console.log('Changed setting: ', name, newValue);
				settingState.changeSetting(name, newValue);
			}}
		/>
	</div>
{/snippet}

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-xl">Discover Settings</div>
		<p>Settings are updated on restart.</p>

		<div class="gap-x-golden-md space-y-golden-lg grid grid-cols-1 md:grid-cols-2">
			{@render renderDiscoverSetting(
				'recencyWeight',
				'Recency Weight',
				settingState.recencyWeight,
				'Weight of how recently a note was seen. Older notes will be ranked higher.'
			)}
			{@render renderDiscoverSetting(
				'ratingWeight',
				'Rating Weight',
				settingState.ratingWeight,
				'Weight of note rating in score calculation. Higher rated notes will be ranked higher.'
			)}
			{@render renderDiscoverSetting(
				'weightWeight',
				'Voting Weight',
				settingState.weightWeight,
				'Weight of upvote vs downvote of a note. More upvoted notes will be ranked higher'
			)}
			{@render renderDiscoverSetting(
				'randomWeight',
				'Random Weight',
				settingState.randomWeight,
				'Weight of random modifier. Higher weight means more randomness.'
			)}
			{@render renderDiscoverSetting(
				'maxDay',
				'Max Day Cutoff (Day)',
				settingState.maxDay,
				'Notes older than this cutoff will receive the maximum recency score.',
				0,
				365,
				1
			)}
			{@render renderDiscoverSetting(
				'fullPenaltyWindow',
				'Full Penalty Window (Hour)',
				settingState.fullPenaltyWindow,
				'Notes seen in this window will be penalized to be ranked less (default 1 hour).',
				1,
				24,
				1
			)}
			{@render renderDiscoverSetting(
				'decayWindow',
				'Penality Recovery Window (Hour)',
				settingState.decayWindow,
				'Penalty will gradually reduce during this time period for penalized notes (default 12 hours).',
				1,
				1000,
				1
			)}
			{@render renderDiscoverSetting(
				'daysOld',
				'Refresh Score Cutoff (Day)',
				settingState.daysOld,
				'Notes with score older than this will get a score refresh on startup to recalculate based on recency. Use 0 to refresh all notes (can increase load time).',
				0,
				365,
				1
			)}
			{@render renderDiscoverSetting(
				'scoreRefreshHour',
				'Score Refresh Frequency When Open (Hour)',
				settingState.scoreRefreshHour,
				'Curator will refresh scores when open. Default refresh is every 6 hours. Changing it to 0 to stop refresh automatically.',
				0,
				24,
				1
			)}
		</div>

		<div class="divider"></div>
		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-3">
				<legend class="fieldset-legend">Youtube API Key</legend>
				Used to add youtube videos.
			</div>
			<input
				type="text"
				class="input col-span-9 w-full text-right"
				bind:value={settingState.youtubeAPIKey}
				onchange={async () => {
					const newValue = await settingState.changeSetting(
						'youtubeAPIKey',
						settingState.youtubeAPIKey
					);
					console.log('Changed setting, youtube API:', newValue);
				}}
			/>
		</div>
	</div>
</div>
