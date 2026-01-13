<script lang="ts">
	import Icon from '$lib/components/Layout/Icon.svelte';
</script>

<section class="bg-base-100 flex min-h-screen w-full items-center justify-center">
	<div
		class=" card border-base-content/20 bg-base-100 flex w-lg flex-col items-center border py-10"
	>
		<div class="space-x-golden-sm flex">
			<Icon /> <span class="text-3xl font-semibold select-none">Curator</span>
		</div>
		<div>
			<fieldset class="fieldset rounded-box w-xs p-4">
				<label class="fieldset-legend">Email</label>
				<input type="email" class="input" placeholder="Email" />

				<label class="fieldset-legend">Password</label>
				<input type="password" class="input" placeholder="Password" />

				<button class="btn btn-neutral mt-4">Sign Up</button>

				<a class="link mt-2 text-right" href="/login"> Login </a>
			</fieldset>
		</div>
	</div>
</section>
