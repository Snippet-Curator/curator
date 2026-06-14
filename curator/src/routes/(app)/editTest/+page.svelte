<script lang="ts">
	import type { Content, Editor } from '@tiptap/core';
	import { EdraEditor, EdraToolBar, EdraDragHandleExtended } from '$lib/components/edra/shadcn';

	// Editor states
	let content = $state<Content>('hello');
	let editor = $state<Editor>();

	function onUpdate() {
		content = editor?.getJSON();
	}
</script>

<div class="py-4 text-center text-xl font-bold">
	Shadcn Example
	<div class="bg-background z-50 mt-12 size-full max-w-5xl rounded-md border border-dashed">
		{#if editor && !editor.isDestroyed}
			<EdraToolBar
				class="bg-secondary/50 flex w-full items-center overflow-x-auto border-b border-dashed p-0.5"
				{editor}
			/>
			<EdraDragHandleExtended {editor} />
		{/if}
		<EdraEditor
			bind:editor
			{content}
			class="h-120 max-h-screen overflow-y-scroll pr-2 pl-6"
			{onUpdate}
		/>
	</div>
</div>
