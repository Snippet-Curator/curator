<script lang="ts">
	let version = $derived.by(async () => {
		return await window.electronAPI.getAppVersion();
	});
</script>

<div class="card">
	<div class="card-body">
		<div class="card-title text-xl">App Version</div>
		<div>
			{#await version then version}
				Version: {version}
			{/await}
		</div>
	</div>
</div>
