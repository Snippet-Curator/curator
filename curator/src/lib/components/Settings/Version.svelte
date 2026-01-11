<script lang="ts">
	import { Github, Globe } from 'lucide-svelte';
</script>

<div class="card">
	<div class="gap-golden-md flex items-center justify-end">
		Version {import.meta.env.APP_VERSION}
		<div>
			<a href="https://curator.krxiang.com"><Globe /></a>
		</div>
		<div>
			<a href="https://github.com/Snippet-Curator/curator"><Github /></a>
		</div>
	</div>
</div>
