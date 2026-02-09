<script lang="ts">
	import { enhance } from '$app/forms';
	import { getSettingState } from '$lib/setting.svelte';
	import { getMouseState } from '$lib/utils.svelte';
	import { getImportState } from './import.svelte';

	let { form } = $props();

	const settingState = getSettingState();
	const importState = getImportState();
	const mouseState = getMouseState();
</script>

<section class="card mx-auto">
	<div class="card-body">
		<h2 class="card-title">Import Instagram Posts</h2>
		<div class="gap-golden-xl grid grid-cols-12">
			<div class="prose col-span-12 md:col-span-6">
				<p>
					This will import instagram posts from Karakeep saves. You must add the api to Karakeep
					first. Imported posts will be moved to Archived list in Karakeep.
				</p>
			</div>

			<div class="gap-golden-md col-span-12 flex flex-col md:col-span-6">
				<form method="POST" action="?/importInstagram" use:enhance>
					{#if form?.error}
						<div class="alert alert-soft alert-error my-2">Error! {form.error}</div>
					{/if}

					{#if form?.success}
						<div class="alert alert-soft alert-success my-golden-md">
							Success! {form.message}
						</div>
					{/if}
					<button type="submit" class="btn btn-neutral w-full">Import</button>
				</form>
			</div>
		</div>
	</div>
</section>
