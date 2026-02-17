<script lang="ts">
	import { Github, Globe } from 'lucide-svelte';
</script>

<div class="card">
	<div class="gap-golden-md flex items-center justify-end">
		Version {import.meta.env.APP_VERSION}
		<div>
			<a
				href="https://curator.krxiang.com"
				class="text-base-content/70 hover:text-base-content/90 transition-colors duration-200"
				><Globe /></a
			>
		</div>
		<div>
			<a
				href="https://github.com/Snippet-Curator/curator"
				class="text-base-content/70 hover:text-base-content/90 transition-colors duration-200"
				><Github /></a
			>
		</div>
	</div>
</div>
