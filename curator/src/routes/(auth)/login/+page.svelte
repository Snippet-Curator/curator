<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '$lib/components/Layout/Icon.svelte';

	let { form } = $props();
</script>

<section class="bg-base-100 flex min-h-screen w-full items-center justify-center">
	<div
		class=" card border-base-content/20 bg-base-100 flex w-lg flex-col items-center border py-10"
	>
		<div class="space-x-golden-sm flex">
			<Icon /> <span class="text-3xl font-semibold select-none">Curator</span>
		</div>
		<div>
			<form method="POST" action="?/login" class="fieldset rounded-box w-xs p-4" use:enhance>
				<label class="fieldset-legend">Email</label>
				<input type="email" required name="email" class="input validator" placeholder="Email" />

				<label class="fieldset-legend">Password</label>
				<input type="password" name="password" required class="input" placeholder="Password" />

				{#if form?.error}
					<div class="alert alert-soft alert-error mt-2">{form.error}</div>
				{/if}

				<button class="btn btn-neutral mt-4">Login</button>

				<a class="link mt-2 text-right" href="/signup"> Sign Up </a>
			</form>
		</div>
	</div>
</section>
