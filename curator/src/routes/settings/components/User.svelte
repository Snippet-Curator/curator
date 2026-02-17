<script lang="ts">
	let { user } = $props();
</script>

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-base-content/70 mb-golden-lg text-xl tracking-widest uppercase">
			User
		</div>
		<div class="gap-x-golden-md grid grid-cols-12 items-center">
			<div class="col-span-8">
				{#if user}
					<legend class="fieldset-legend">{user.name}</legend>
					<span class="text-base-content/70"> {user.email}</span>
				{/if}
			</div>
			<form method="POST" action="/logout" class="col-span-4">
				<button type="submit" class="btn w-full">Logout</button>
			</form>
		</div>
	</div>
</div>
