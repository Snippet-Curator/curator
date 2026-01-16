<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	import { Import, Notebook as NotebookIcon, Settings, Tags, WalletCards } from 'lucide-svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';

	import { getNotebookState, getTagState, setNotebookState, setTagState } from '$lib/db.svelte';
	import { pb } from '$lib/pocketbase';
	import { getSettingState, setSettingState } from '$lib/setting.svelte';
	import { getMobileState, getMouseState, setMobileState, setMouseState } from '$lib/utils.svelte';

	import { Command, Dock, Icon, NotebookList, Pinned, TagList } from '$lib/components';

	let { children } = $props();

	if (typeof document !== 'undefined') {
		pb.authStore.loadFromCookie(document.cookie);
	}

	setTagState();
	setNotebookState();
	setMobileState();
	setMouseState();

	const tagState = getTagState();
	const notebookState = getNotebookState();
	const mobileState = getMobileState();
	const settingState = getSettingState();
	const mouseState = getMouseState();

	let screenWidth = 100;

	async function getDefaultNotebooks() {
		await notebookState.getInbox();
		await notebookState.getAllCounts();
	}

	const updateScreenWidth = () => {
		screenWidth = window.innerWidth;
		mobileState.isMobile = screenWidth < 768 ? true : false;
		// mobileState.isSidebarOpen = screenWidth < 768 ? false : true;
		if (screenWidth < 768) {
			mobileState.isSidebarOpen = false;
		}
	};

	type LayoutPage = {
		name: string;
		icon: any;
		url: string;
	};

	const bottomPages: LayoutPage[] = [
		{
			name: 'Organize',
			icon: WalletCards,
			url: '/organize'
		},
		{
			name: 'Import',
			icon: Import,
			url: '/import'
		},
		{
			name: 'Settings',
			icon: Settings,
			url: '/settings'
		}
		// {
		// 	name: 'Test',
		// 	icon: Settings,
		// 	url: '/test'
		// }
	];

	let defaultNotebooks = $state();

	onMount(async () => {
		updateScreenWidth();
		defaultNotebooks = getDefaultNotebooks();
		await settingState.getDefaultSettings();
	});

	$effect(() => {
		window.addEventListener('resize', updateScreenWidth);
	});
</script>

<Command />

{#if browser}
	<Resizable.PaneGroup
		direction="horizontal"
		class="{mouseState.isBusy ? 'cursor-progress' : ''} max-h-screen min-h-screen w-full"
	>
		<Resizable.Pane
			class="{mobileState.isSidebarOpen
				? '-motion-translate-x-in-100 motion-duration-200'
				: 'hidden'} menu bg-base-200 border-base-content/10 space-y-2 border-r"
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
						: ''} flex w-full justify-between"
					href="/"
				>
					<span>Search</span> {notebookState.totalNoteCount}</a
				>
			</li>
			{#await defaultNotebooks then}
				<li>
					<a
						class="{page.url.pathname == `/notebook/${notebookState.inboxID}` &&
							'menu-active'} flex w-full justify-between"
						href="/notebook/{notebookState.inboxID}"
						><span>Inbox</span> {notebookState.inboxCount}</a
					>
				</li>
			{/await}

			<div class="divider my-0 py-0"></div>

			<div class="h-10 grow overflow-y-auto">
				<Pinned />

				<span class="menu-title flex max-h-60 items-center gap-2 overflow-y-auto"
					><NotebookIcon size={18} />Notebooks</span
				>

				<NotebookList notebooks={notebookState.notebooks} />

				<span class="menu-title flex items-center gap-2"><Tags size={18} /> Tags</span>

				<TagList tags={tagState.tags} />
			</div>

			{#snippet renderBottomPages(name: string, url: string, icon: any)}
				{@const Icon = icon}
				<li>
					<a class={page.url.pathname == url ? 'menu-active' : ''} href={url}>
						<Icon size={18} />
						{name}</a
					>
				</li>
			{/snippet}

			{#each bottomPages as page}
				{@render renderBottomPages(page.name, page.url, page.icon)}
			{/each}
		</Resizable.Pane>

		<Resizable.Handle />
		<Resizable.Pane>
			{@render children()}
		</Resizable.Pane>
	</Resizable.PaneGroup>

	<Dock />
{/if}
