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
			<form method="POST" action="?/signup" class="fieldset rounded-box w-xs p-4" use:enhance>
				<label class="fieldset-legend">Name</label>
				<input
					type="name"
					value={form?.name ?? ''}
					class="input"
					name="name"
					required
					placeholder="Name"
				/>

				<label class="fieldset-legend">Email</label>
				<input type="email" class="input validator" name="email" required placeholder="Email" />

				<label class="fieldset-legend">Password</label>
				<input
					name="password"
					type="password"
					class="input"
					value={form?.password ?? ''}
					required
					placeholder="Password"
				/>

				<label class="fieldset-legend">Confirm Password</label>
				<input
					type="password"
					class="input"
					value={form?.passwordConfirm ?? ''}
					name="password_confirmation"
					placeholder="Password"
				/>

				{#if form?.error}
					<div class="alert alert-soft alert-error mt-2">{form.error}</div>
				{/if}

				<button class="btn btn-neutral mt-4">Sign Up</button>

				<a class="link mt-2 text-right" href="/login"> Login </a>
			</form>
		</div>
	</div>
</section>
