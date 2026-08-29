import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { pbURL } from './const';

import { type NoteQuery } from '$lib/types';
import { goto } from '$app/navigation';

// ─────────────────────────────
//          Tailwind
// ─────────────────────────────

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// ─────────────────────────────
//          Pocketbase
// ─────────────────────────────

/**
 * Replaces local url with remote url if different
 */
export function replacePbUrl(content: string) {
	if (!content) return '';
	if (pbURL == 'http://127.0.0.1:8090') return content;
	return content.replace(/http:\/\/127\.0\.0\.1:8090/g, pbURL);
}

// ─────────────────────────────
//      Front End
// ─────────────────────────────

/**
 * creates custom styels for note content
 */
export function getCustomStyles(fontScale: number) {
	return `
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
			  `;
}

/**
 * gets share url token
 */
export function getShareURL(shareToken: string) {
	return `${window.location.origin}/share/${shareToken}`;
}

// Types for the result object with discriminated union
type Success<T> = {
	data: T;
	error: null;
};

type Failure<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}

// debounce
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
	let timeout: ReturnType<typeof setTimeout>;
	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), delay);
	};
}

// debounced search
export const debouncedSearch = debounce(async (searchInput: string) => {
	await goto(`?search=${encodeURIComponent(searchInput)}&page=1`, {
		replaceState: true,
		keepFocus: true,
		noScroll: true
	});
}, 300);

// updates url parameters based on query
export function updateQueryParams(url: URL, updates: Record<string, string | string[] | null>) {
	for (const [key, value] of Object.entries(updates)) {
		url.searchParams.delete(key);

		if (value == null) continue;

		if (Array.isArray(value)) {
			for (const item of value) {
				url.searchParams.append(key, item);
			}
		} else {
			url.searchParams.set(key, value);
		}
	}

	return url;
}

type Status = 'active' | 'archived' | 'deleted';
type Sort = '-created' | '-score';
// getSearchQuery
export function getQueryFromURL(url: URL): NoteQuery {
	return {
		page: Number(url.searchParams.get('page') ?? 1),
		search: url.searchParams.get('search') ?? '',
		tagIDs: url.searchParams.getAll('tagIDs'),
		excludedTagIDs: url.searchParams.getAll('excludedTagIDs'),
		notebookID: url.searchParams.get('notebookID') ?? '',
		status: (url.searchParams.get('status') ?? 'active') as Status,
		sort: (url.searchParams.get('sort') ?? '-created') as Sort,
		fullContent: url.searchParams.get('fullContent') === 'true',
		fullTextSearch: url.searchParams.get('fullTextSearch') === 'true'
	};
}
