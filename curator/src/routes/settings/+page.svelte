<script lang="ts">
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Topbar from '$lib/components/Topbar/index';
	import { KBD, DiscoverSetting, Version } from '$lib/components/Settings';
</script>

<Topbar.Root>
	<Topbar.SidebarIcon></Topbar.SidebarIcon>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<ScrollArea class="h-[calc(100vh-60px)]">
	<div class="p-golden-xl mx-auto max-w-5xl">
		<KBD />
		<div class="divider"></div>
		<DiscoverSetting />
		<div class="divider"></div>
		<Version />
	</div>
</ScrollArea>
