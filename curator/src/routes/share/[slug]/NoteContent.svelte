<script lang="ts">
	import { ImageViewer } from 'svelte-image-viewer';
	import { fade, scale } from 'svelte/transition';

	import { CaseSensitive, CircleX } from 'lucide-svelte';

	import { replacePbUrl } from '$lib/utils';
	import { type Note } from '$lib/types';

	type Props = {
		note: Note;
	};

	let { note }: Props = $props();

	let content = $derived(replacePbUrl(note?.content ?? ''));
	let noteTitle = $state(note?.title ?? '');
	let textContent = $state('');
	let editor: Element;

	let iframe = $state();

	let isOpen = $state(false);
	let isEditHTML = $state(false);
	let selectedImage = $state('');
	let fontScale = $state(1);
	let customStyles = $derived(`
            :root {
                  --color-base-100: oklch(100% 0 0);
                  --color-base-content: oklch(27.807% 0.029 256.847);
              }
              @media (prefers-color-scheme: dark) {
                :root {
                      --color-base-100: oklch(25.33% 0.016 252.42);
                      --color-base-content: oklch(97.807% 0.029 256.847); 
               }
            }
              html, body {
                  margin: 0 !important;
                  height: 100% !important;
              }
              * {
                  font-size: ${fontScale * 100}% !important;
                  line-height: 1.4 !important;
             }
              html, body, main, section, p, pre, div {
                  background-color: var(--color-base-100) !important;
                  background: var(--color-base-100) !important; 
                  color: var(--color-base-content) !important;
              }
              img {
                  max-width: 100% !important;
                  height: auto !important;
              }
              .img-wrapper {
                  display: flex;
                  justify-content: center;
                  margin-bottom: 1rem;
              }
              video {
                  max-height: 800px; !important;
              }
              `);

	function closeModal() {
		isOpen = false;
	}

	function onImageClick(src: string) {
		selectedImage = src;
		isOpen = true;
	}

	function manipulateIframe(doc) {
		// click link opens browser
		const links = doc.querySelectorAll('a');
		links.forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault(); // Prevent default navigation
				window.open(link.href);
			});
		});
		// remove image links
		const imgLinks = doc.querySelectorAll('a img');
		imgLinks.forEach((img) => {
			const link = img.parentElement;
			try {
				link.parentNode.insertBefore(img, link);
				link.parentNode.removeChild(link);
			} catch (e) {
				console.log(e);
			}
		});
		// add image viewing clicks
		const images = doc.querySelectorAll('img');
		images.forEach((img) => {
			img.addEventListener('click', () => {
				onImageClick(img.src);
			});
		});
	}

	function handler(event: KeyboardEvent) {
		document.dispatchEvent(new KeyboardEvent(event.type, event));
	}

	function initializeIframe(el) {
		const doc = el.contentDocument;
		doc.open();
		doc.write(`<!DOCTYPE html>${content}`);
		doc.close();

		manipulateIframe(doc);

		const styleTag = doc.createElement('style');
		styleTag.setAttribute('id', 'custom-style');
		styleTag.textContent = customStyles;
		doc.head.appendChild(styleTag);

		doc.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}

	function loadHeight(el) {
		el.style.height = '0px';
		const doc = el.contentDocument;
		const height = doc.body.scrollHeight;
		el.style.height = `${height + 100}px`;

		el.onload = () => {
			el.style.height = '0px';
			const doc = el.contentDocument;
			const height = doc.body.scrollHeight;
			el.style.height = `${height + 100}px`;
		};
	}

	function changeFontSize(el) {
		const doc = el.contentDocument;

		let styleTag = doc.getElementById('custom-style');

		if (!styleTag) {
			styleTag = doc.createElement('style');
			styleTag.id = 'custom-style';
			doc.head.appendChild(styleTag);
		}
		styleTag.textContent = customStyles;
	}
</script>

<div class="bg-base-100/90 p-golden-sm md:p-golden-md z-20 flex w-full px-4 md:sticky md:top-0">
	<div class="flex w-full">
		<span
			class="card-title focus:ring-base-content/40 bg-base-100/90 mr-2 grow truncate rounded-md border-0"
			>{noteTitle}</span
		>
		<div
			class="text-base-content/20 hover:text-base-content hidden items-center gap-x-4 transition-colors duration-300 md:flex"
		>
			<input
				type="range"
				class="range range-xs"
				min="0.96"
				max="1.1"
				step="0.01"
				bind:value={fontScale}
			/>
			<CaseSensitive size={32} />
		</div>
	</div>
</div>

<div class="mb-20 h-full overflow-y-auto">
	<div class="card mx-auto mt-10 max-w-3xl px-2 pb-40 md:px-10 lg:max-w-5xl">
		<iframe
			title="content"
			class="bg-base-100 mb-10"
			scrolling="no"
			bind:this={iframe}
			{@attach initializeIframe}
			{@attach loadHeight}
			{@attach changeFontSize}
		></iframe>
	</div>
</div>

{#if isOpen}
	<div
		class="bg-base-100 fixed top-0 left-0 z-30 flex h-screen w-screen items-center justify-center"
		transition:fade={{ duration: 100 }}
	>
		<button class="absolute top-10 right-15 z-30 hover:cursor-pointer" onclick={closeModal}>
			<CircleX size={42} class="stroke-base-content fill-base-100  drop-shadow-lg " />
		</button>
		<button onclick={(event) => event.stopPropagation()} in:scale={{ start: 0.8, duration: 200 }}>
			<ImageViewer src={selectedImage} />
		</button>
	</div>
{/if}
