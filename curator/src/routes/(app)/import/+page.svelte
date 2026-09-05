<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';

	import { setImportState } from './import.svelte';

	import File from './File.svelte';
	import Youtube from './Youtube.svelte';
	import Status from './Status.svelte';

	import { getAllNotebooks } from '$lib/api/notebook.remote';
	import { getAllTags } from '$lib/api/tag.remote';
	import YoutubePlaylist from './YoutubePlaylist.svelte';

	let { data } = $props();
	const inboxID = $derived(data.inboxID ?? '');

	setImportState(inboxID);

	const allNotebooks = $derived(await getAllNotebooks());
	const flatNotebooks = $derived(allNotebooks?.flatNotebooks ?? []);
	const allTags = $derived(await getAllTags());
	const flatTags = $derived(allTags?.flatTags);
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="mx-auto mb-20 max-w-5xl">
		<File {flatNotebooks} {flatTags} />
		<Youtube notebooks={flatNotebooks} tags={flatTags} />
		<YoutubePlaylist notebooks={flatNotebooks} tags={flatTags} />
		<div class="divider"></div>
		<!-- <Instagram {form} /> -->
		<Status />
	</div>
</div>
