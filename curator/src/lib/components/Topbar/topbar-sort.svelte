<script lang="ts">
	import { goto } from '$app/navigation';
	import { page as pageState } from '$app/state';
	import { ArrowDownWideNarrow } from 'lucide-svelte';

	type Props = {
		scrollToTop: () => void;
	};

	let { scrollToTop }: Props = $props();

	const currentSort = $derived(pageState.url.searchParams.get('sort') ?? '-created');

	const sortOptions = [
		{
			name: 'Newest First',
			sort: '-created'
		},
		{
			name: 'Oldest First',
			sort: 'created'
		},
		{
			name: 'Highest Score First',
			sort: '-score'
		},
		{
			name: 'Lowest Score First',
			sort: 'score'
		}
	];

	async function changePage(sort: string) {
		const url = new URL(pageState.url);
		url.searchParams.set('sort', String(sort));
		const popover = document.getElementById('popover-1') as HTMLElement | null;
		popover?.hidePopover();
		await goto(url);
		scrollToTop();
	}
</script>

<div class="tooltip text-base-content/70 tooltip-bottom z-30" data-tip="Sort">
	<button
		popovertarget="popover-1"
		style="anchor-name:--anchor-1"
		class="btn btn-ghost flex items-center gap-x-2"
	>
		<ArrowDownWideNarrow size={18} />
	</button>

	<ul
		class="dropdown menu text-base-content bg-base-100 space-y-golden-sm w-52 rounded-md text-base shadow-sm"
		popover
		id="popover-1"
		style="position-anchor:--anchor-1"
	>
		{#each sortOptions as option}
			<li class={option.sort === currentSort ? 'bg-base-200 rounded-md' : ''}>
				<button onclick={() => changePage(option.sort)}>{option.name}</button>
			</li>
		{/each}
	</ul>
</div>
