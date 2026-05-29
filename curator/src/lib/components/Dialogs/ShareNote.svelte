<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index';
	import type { Note } from '$lib/types';

	type Props = {
		isOpen: boolean;
		unshare: () => void;
		note: Note | undefined;
	};

	let { isOpen = $bindable(), unshare, note }: Props = $props();

	function unshareNote() {
		unshare();
		isOpen = false;
	}

	async function copyURL() {
		const URL = `${window.location.origin}/share/${note?.share_token}`;

		if (navigator.clipboard) {
			await navigator.clipboard.writeText(URL);
		} else {
			const input = document.createElement('input');
			input.value = URL;
			document.body.appendChild(input);
			input.select();
			document.execCommand('copy');
			input.remove();
		}
	}
</script>

<Dialog.Root open={isOpen}>
	<Dialog.Content
		onCloseAutoFocus={(e) => {
			e.preventDefault();
			isOpen = false;
		}}
		class="mx-auto max-h-full max-w-5xl overflow-y-auto"
	>
		<Dialog.Header>
			<Dialog.Title>Share Note</Dialog.Title>
		</Dialog.Header>

		<div>
			<legend class="fieldset-legend">URL</legend>

			<span>{window.location.origin}/share/{note?.share_token}</span>
		</div>

		<div class="flex justify-end gap-x-2">
			<button onclick={copyURL} class="btn btn-primary">Copy URL</button>
			<button onclick={unshareNote} class="btn">Unshare</button>
			<button onclick={() => (isOpen = false)} class="btn">Close</button>
		</div>
	</Dialog.Content>
</Dialog.Root>
