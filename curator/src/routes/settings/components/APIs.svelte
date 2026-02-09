<script lang="ts">
	import Karakeep from './Karakeep.svelte';
	import Youtube from './Youtube.svelte';

	let { form } = $props();
</script>

<div class="card mb-20">
	<div class="card-body">
		<div class="card-title text-xl">APIs</div>
		<div class="gap-y-golden-md flex flex-col">
			<Youtube />
			<Karakeep {form} />
		</div>
	</div>
</div>
