<script lang="ts">
	import * as Topbar from '$lib/components/Topbar/index';
	import { KBD, DiscoverSetting, Version, NoteSetting, User, APIs } from './index';
	import { Dock } from '$lib/components';

	let { data, form } = $props();
</script>

<Topbar.Root>
	<Topbar.Back />
	<div class="grow"></div>
</Topbar.Root>

<div class="h-[calc(100vh-60px)] overflow-y-auto">
	<div class="p-golden-xl mx-auto mb-10 max-w-5xl">
		<User user={data.user} />
		<div class="divider mb-0"></div>
		<KBD />
		<div class="divider mb-0"></div>
		<DiscoverSetting />
		<div class="divider mb-0"></div>
		<NoteSetting />
		<div class="divider mb-0"></div>
		<APIs {form} />
		<div class="divider mb-0"></div>
		<Version />
	</div>
</div>

<Dock />
