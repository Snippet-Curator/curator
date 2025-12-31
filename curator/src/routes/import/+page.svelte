<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Topbar from '$lib/components/Topbar/index';

	import { setImportState } from '$lib/components/Import/import.svelte';

	import File from '$lib/components/Import/File.svelte';
	import Youtube from '$lib/components/Import/Youtube.svelte';
	import Status from '$lib/components/Import/Status.svelte';

	import { getNotebookState, getTagState } from '$lib/db.svelte';

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

<ScrollArea class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="mx-auto mb-20 max-w-5xl">
		<File {notebookState} {tagState} />
		<Youtube {notebooks} {tags} />
		<div class="divider"></div>
		<Status />
	</div>
</ScrollArea>
