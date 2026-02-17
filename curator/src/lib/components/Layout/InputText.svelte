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
	<div class="space-x-golden-md flex justify-end">
		<input type="text" class="input" bind:value={textInput} />
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
	<div class="space-x-golden-lg text-base-content/70 flex items-center justify-end">
		<span class="truncate">{textInput}</span>
		<button onclick={() => (isEdit = true)} class="btn">Edit</button>
	</div>
{/if}
