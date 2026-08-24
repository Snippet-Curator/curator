<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import * as Resizable from '$lib/components/ui/resizable/index.js';

	import { Command, Dock, Icon, NotebookList, Pinned, TagList } from '$lib/components';

	import { setSavedSearch } from '$lib/search.svelte';

	import { setNotebookState, setTagState } from '$lib/db.svelte';
	import { getMobileState, getMouseState, setMobileState, setMouseState } from '$lib/utils.svelte';

	import { getAllNotebooks, getInbox, getTotalNotecount } from '$lib/api/notebook.remote';
	import { getAllTags } from '$lib/api/tag.remote';
	import { getDefaultSettings } from '$lib/api/setting.remote';

	import { bottomPages } from './links';

	let { children } = $props();

	// not sure what this does
	if (typeof document !== 'undefined') {
		pb.authStore.loadFromCookie(document.cookie);
	}

	setTagState();
	setNotebookState();
	setMobileState();
	setMouseState();
	setSavedSearch();

	const mobileState = getMobileState();
	const mouseState = getMouseState();

	let screenWidth = 100;

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth;
		mobileState.isMobile = screenWidth < 768 ? true : false;
		// mobileState.isSidebarOpen = screenWidth < 768 ? false : true;
		if (screenWidth < 768) {
			mobileState.isSidebarOpen = false;
		}
	};

	await getDefaultSettings();
	let allNotebooks = $derived(await getAllNotebooks());
	let notebooks = $derived(allNotebooks?.rootNotebooks ?? []);
	let allTags = $derived(await getAllTags());
	let tags = $derived(allTags?.rootTags ?? []);
	let inbox = $derived(await getInbox());
	let inboxCount = $derived(inbox?.count ?? 0);
	let inboxID = $derived(inbox?.id);

	$effect(() => {
		window.addEventListener('resize', updateScreenWidth);
	});
</script>

<Command {inboxID} {notebooks} {tags} />

{#if browser}
	<Resizable.PaneGroup
		direction="horizontal"
		class="{mouseState.isBusy ? 'cursor-progress' : ''} max-h-screen min-h-screen w-full"
	>
		<Resizable.Pane
			class={`${
				mobileState.isSidebarOpen ? '-motion-translate-x-in-100 motion-duration-200' : 'hidden'
			} menu bg-base-200 border-base-content/10 space-y-2 border-r`}
			defaultSize={16}
			minSize={10}
			maxSize={30}
			collapsible={true}
			collapsedSize={0}
		>
			<div class="mt-2 mb-5 ml-1 flex h-6 items-center gap-x-1">
				<Icon /> <span class="text-2xl font-semibold select-none">Curator</span>
			</div>

			<li>
				<a class={page.url.pathname == '/discover' ? 'menu-active' : ''} href="/discover"
					>Discover</a
				>
			</li>
			<li>
				<a
					class="{page.url.pathname == '/' || !page.url.pathname
						? 'menu-active'
						: ''} group flex w-full justify-between"
					href="/"
				>
					<span>Search</span>
					<span class="group-hover:text-base-content/70 text-base-content/50"
						>{await getTotalNotecount()}</span
					></a
				>
			</li>

			<li>
				<a
					class="{page.url.pathname == `/notebook/${inboxID}` &&
						'menu-active'} group flex w-full justify-between"
					href="/notebook/{inboxID}"
					><span>Inbox</span>
					<span class="group-hover:text-base-content/70 text-base-content/50">{inboxCount}</span></a
				>
			</li>

			<div class="divider my-0 py-0"></div>

			<div class="h-10 grow overflow-y-auto">
				<Pinned
					pinnedNotebooks={allNotebooks?.pinnedNotebooks ?? []}
					pinnedTags={allTags?.pinnedTags ?? []}
				/>

				<span
					class="menu-title flex max-h-60 items-center gap-2 overflow-y-auto text-xs tracking-widest uppercase"
					>Notebooks</span
				>

				<NotebookList {notebooks} />

				<span class="menu-title flex items-center gap-2 text-xs tracking-widest uppercase">
					Tags</span
				>

				<TagList {tags} />
			</div>

			{#snippet renderBottomPages(name: string, url: string, icon: any)}
				{@const Icon = icon}
				<li>
					<a class={page.url.pathname == url ? 'menu-active' : ''} href={url}>
						<span class="group-hover:text-base-content/70 text-base-content/50"
							><Icon size={18} /></span
						>

						{name}</a
					>
				</li>
			{/snippet}

			{#each bottomPages as page}
				{@render renderBottomPages(page.name, page.url, page.icon)}
			{/each}
		</Resizable.Pane>

		<Resizable.Handle />
		<Resizable.Pane defaultSize={84}>
			<div class="bg-base-100">{@render children()}</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>

	<Dock />
{/if}
