<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';

	import { setImportState } from './import.svelte';

	import File from './File.svelte';
	import Youtube from './Youtube.svelte';
	import Status from './Status.svelte';
	import Instagram from './Instagram.svelte';

	import { getNotebookState, getTagState } from '$lib/db.svelte';
	let { form } = $props();

	const notebookState = getNotebookState();
	const tagState = getTagState();
	const notebooks = $derived(notebookState.flatNotebooks);
	const tags = $derived(tagState.flatTags);

	setImportState(notebookState.inboxID);
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="mx-auto mb-20 max-w-5xl">
		<File {notebookState} {tagState} />
		<Youtube {notebooks} {tags} />
		<div class="divider"></div>
		<Instagram {form} />
		<Status />
	</div>
</div>
