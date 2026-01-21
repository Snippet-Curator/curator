<script lang="ts">
	type Props = {
		textInput: string;
		action: (textInput: string) => void;
	};

	let { textInput, action }: Props = $props();

	let isEdit = $state(false);

	function changeInput() {
		action(textInput);
		isEdit = false;
	}
</script>

{#if isEdit}
	<div class="space-x-golden-md col-span-8 flex">
		<input type="text" class="input w-full text-right" bind:value={textInput} />
		<div class="space-x-golden-sm flex">
			<button onclick={changeInput} class="btn btn-primary">Save</button>
			<button
				class="btn"
				onclick={() => {
					isEdit = false;
				}}>Cancel</button
			>
		</div>
	</div>
{:else}
	<div class="space-x-golden-lg col-span-8 flex items-center justify-end">
		<span>{textInput}</span>
		<button onclick={() => (isEdit = true)} class="btn">Edit</button>
	</div>
{/if}
