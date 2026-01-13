<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';
	import { KBD, DiscoverSetting, Version, NoteSetting } from './index';
	import { Dock } from '$lib/components';
</script>

<Topbar.Root>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="p-golden-xl mx-auto max-w-5xl">
		<KBD />
		<div class="divider"></div>
		<DiscoverSetting />
		<div class="divider"></div>
		<NoteSetting />
		<div class="divider"></div>
		<Version />
	</div>
</div>

<Dock />
