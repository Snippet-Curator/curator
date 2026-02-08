<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';
	import { KBD, DiscoverSetting, Version, NoteSetting } from './index';
	import { Dock } from '$lib/components';
	import User from './User.svelte';
	import APIs from './APIs.svelte';

	let { data, form } = $props();
</script>

<Topbar.Root>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="p-golden-xl mx-auto mb-10 max-w-5xl">
		<User user={data.user} />
		<div class="divider"></div>
		<KBD />
		<div class="divider"></div>
		<DiscoverSetting />
		<div class="divider"></div>
		<NoteSetting />
		<div class="divider"></div>
		<APIs {form} />
		<div class="divider"></div>
		<Version />
	</div>
</div>

<Dock />
