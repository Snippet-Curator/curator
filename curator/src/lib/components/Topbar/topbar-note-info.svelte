<script lang="ts">
	import type { Note } from '$lib/types';
	import dayjs from 'dayjs';
	import { Info } from 'lucide-svelte';
	import * as Popover from '$lib/components/ui/popover/index';

	type Props = {
		note: Note;
	};

	let { note }: Props = $props();
	const lastOpened = $derived(
		note.last_opened ? dayjs(note.last_opened).format('MMM DD YYYY, hh:ss a') : 'Never'
	);
	const created = $derived(dayjs(note.added).format('MMM DD YYYY, hh:ss a'));
	const modified = $derived(dayjs(note.updated).format('MMM DD YYYY, hh:ss a'));
	const size = $derived.by(() => {
		const sizeInBytes = note.resources?.reduce((total, current) => {
			return total + current.size;
		}, 0);
		if (!sizeInBytes) return null;
		const sizeInMB = (sizeInBytes / 1048576).toFixed(2);
		return sizeInMB;
	});

	function openURL(e: MouseEvent) {
		const target = e.currentTarget as HTMLAnchorElement;
		e.preventDefault();
		window.open(target.href);
	}
</script>

<Popover.Root>
	<Popover.Trigger><div class="btn btn-ghost"><Info size={18} /></div></Popover.Trigger>
	<Popover.Content>
		<div class="gap-golden-md grid grid-cols-3">
			<div>Last Opened</div>
			<div class="col-span-2">{lastOpened}</div>
			<div>Created</div>
			<div class="col-span-2">{created}</div>
			<div>Modified</div>
			<div class="col-span-2">{modified}</div>

			{#each note.sources as source}
				<div>Source</div>
				<div class="col-span-2">{source.source}</div>

				<div>URL</div>
				<div class="col-span-2 break-all">
					<a class="link line-clamp-2" href={source.source_url} onclick={openURL}
						>{source.source_url}</a
					>
				</div>
			{/each}

			{#if size}
				<div class="text-nowrap">Size</div>
				<div>{size} MB</div>
			{/if}
		</div>
	</Popover.Content>
</Popover.Root>

<!-- <div class="dropdown dropdown-end"> -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- <div class="tooltip tooltip-bottom z-30" data-tip="Info">
		<div tabindex="0" class="btn btn-ghost"><Info size={18} /></div>
	</div> -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- <div
		tabindex="0"
		class="dropdown-content border-base-content/20 bg-base-100 rounded-box p-golden-md min-w-80 border shadow-sm"
	>
		<div class="gap-golden-md grid grid-cols-3 p-2">
			<div>Last Opened</div>
			<div class="col-span-2">{lastOpened}</div>
			<div>Created</div>
			<div class="col-span-2">{created}</div>
			<div>Modified</div>
			<div class="col-span-2">{modified}</div>

			{#each note.sources as source}
				<div>Source</div>
				<div class="col-span-2">{source.source}</div>

				<div>URL</div>
				<div class="col-span-2 break-all">
					<a class="link line-clamp-2" href={source.source_url} onclick={openURL}
						>{source.source_url}</a
					>
				</div>
			{/each}

			{#if size}
				<div class="text-nowrap">Size</div>
				<div>{size} MB</div>
			{/if}
		</div>
	</div> -->
<!-- </div> -->
