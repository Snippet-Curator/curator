
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/archive" | "/discover" | "/import" | "/notebook" | "/notebook/[slug]" | "/note" | "/note/[slug]" | "/organize" | "/settings" | "/tags" | "/tags/[slug]" | "/test" | "/trash";
		RouteParams(): {
			"/notebook/[slug]": { slug: string };
			"/note/[slug]": { slug: string };
			"/tags/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/archive": Record<string, never>;
			"/discover": Record<string, never>;
			"/import": Record<string, never>;
			"/notebook": { slug?: string };
			"/notebook/[slug]": { slug: string };
			"/note": { slug?: string };
			"/note/[slug]": { slug: string };
			"/organize": Record<string, never>;
			"/settings": Record<string, never>;
			"/tags": { slug?: string };
			"/tags/[slug]": { slug: string };
			"/test": Record<string, never>;
			"/trash": Record<string, never>
		};
		Pathname(): "/" | "/archive" | "/archive/" | "/discover" | "/discover/" | "/import" | "/import/" | "/notebook" | "/notebook/" | `/notebook/${string}` & {} | `/notebook/${string}/` & {} | "/note" | "/note/" | `/note/${string}` & {} | `/note/${string}/` & {} | "/organize" | "/organize/" | "/settings" | "/settings/" | "/tags" | "/tags/" | `/tags/${string}` & {} | `/tags/${string}/` & {} | "/test" | "/test/" | "/trash" | "/trash/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/concourse_3_bold.woff2" | "/concourse_3_bold_italic.woff2" | "/concourse_3_italic.woff2" | "/concourse_3_regular.woff2" | "/concourse_4_bold.woff2" | "/concourse_4_regular.woff2" | "/favicon.svg" | "/icon.png" | "/icon.svg" | string & {};
	}
}