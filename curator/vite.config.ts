import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFileSync } from 'fs';
import tailwindcss from '@tailwindcss/vite';

const json = readFileSync(new URL('./package.json', import.meta.url), 'utf-8');
const pkg = JSON.parse(json);

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		fs: {
			allow: ['..']
		}
	},
	define: {
		'import.meta.env.APP_VERSION': JSON.stringify(pkg.version)
	}
});
