<script lang="ts">
	type KBD = {
		displays: string[];
		description: string;
	};

	const notes: KBD[] = [
		{
			displays: ['0', 'h'],
			description: 'no star'
		},
		{
			displays: ['1', 'j'],
			description: '1 star'
		},
		{
			displays: ['2', 'k'],
			description: '2 stars'
		},
		{
			displays: ['3', 'l'],
			description: '3 stars'
		},
		{
			displays: ['4', ';'],
			description: '4 stars'
		},
		{
			displays: ['5', "'"],
			description: '5 stars'
		},
		{
			displays: ['shift + a'],
			description: 'Archive note'
		},
		{
			displays: ['del'],
			description: 'Delete note'
		},
		{
			displays: ['e'],
			description: 'Edit note'
		},
		{
			displays: ['n'],
			description: 'Edit notebook'
		},
		{
			displays: ['t'],
			description: 'Edit tags'
		},
		{
			displays: ['b'],
			description: 'Bulk edit'
		}
	];
	const discover: KBD[] = [
		{
			displays: ['→', 'd', 'space'],
			description: 'Next note'
		},
		{
			displays: ['←', 'a'],
			description: 'Previous note'
		},
		{
			displays: ['↑', 'w'],
			description: 'See more'
		},
		{
			displays: ['↓', 's'],
			description: 'See less'
		}
	];
	const navigations: KBD[] = [
		{
			displays: ['ctrl + l'],
			description: 'Navigation box'
		},
		{
			displays: ['→'],
			description: 'Next page'
		},
		{
			displays: ['←'],
			description: 'Previous page'
		},
		{
			displays: ['Backspace'],
			description: 'Go back'
		}
	];
</script>

{#snippet renderKBD(kbds: KBD[], title: string)}
	<div class="gap-golden-md flex flex-col">
		<span class="text-lg">{title}</span>
		{#each kbds as kbd}
			<div class="grid grid-cols-2">
				{kbd.description}
				<div class="gap-golden-md flex">
					{#each kbd.displays as display}
						<kbd class="kbd">{display}</kbd>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/snippet}

<div class="card">
	<div class="card-body">
		<div class="card-title text-xl">Keyboard Shortcuts</div>
		<div class="gap-golden-md grid md:grid-cols-2">
			{@render renderKBD(navigations, 'Navigation')}
			<div class="row-span-2">
				{@render renderKBD(notes, 'Editing Notes')}
			</div>
			{@render renderKBD(discover, 'Discover Navigation')}
		</div>
	</div>
</div>
