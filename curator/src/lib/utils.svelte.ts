import { page } from '$app/state';
import { getContext, setContext } from 'svelte';
import { type NoteQuery } from '$lib/types';
import { goto } from '$app/navigation';

export function categorizeMediabyType(content: string) {
	const mediaMatch =
		/<media\s+src=["']?(?<src>[^"'\s>]+)["']?\s+type=["']?(?<type>[^"'\s>]+)["']?\s*>/g;

	const replaceMedia = (match: string, src: string, type: string) => {
		if (type.includes('image')) {
			return `<img style='max-width: 100%; height: auto' src=${src}>`;
		}

		if (type == 'video/mp4') {
			return `<video style='width:100%' controls class="w-full mx-auto rounded-md shadow-md"><source src=${src} type=${type} />Your browser does not support the video tag.</video>`;
		}
	};

	return content.replace(mediaMatch, replaceMedia);
}

export function getCorrectPage() {
	if (!page.state.previousHistoryPage) return 1;
	return page.state.previousHistoryPage;
}

// function changeSearchTerm() {
//     let searchTerm = $state('');
//     return {
//         get searchTerm() { return searchTerm },
//         set searchTerm(value) { searchTerm = value },
//     }
// }

function signalSavePage() {
	let savedPages = $state(new Map());
	let scrollPositions = $state(new Map());

	return {
		get savedPages() {
			return savedPages;
		},
		set savedPages(value) {
			savedPages = value;
		},
		get scrollPositions() {
			return scrollPositions;
		},
		updatePageData(url: string, currentPage: number) {
			savedPages.set(url, currentPage);
		},
		updateScrollPosition(url: string, scrollY: number) {
			scrollPositions.set(url, scrollY);
		}
	};
}

class MobileState {
	isMobile = $state(false);
	isSidebarOpen = $state(true);
}

export class MouseState {
	isBusy = $state(false);
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

// export const searchState = changeSearchTerm()
export const signalPageState = signalSavePage();
export function setMobileState() {
	return setContext('mobile', new MobileState());
}
export function getMobileState() {
	return getContext<ReturnType<typeof setMobileState>>('mobile');
}
export const saveCurrentPage = (newPage: number) =>
	signalPageState.updatePageData(page.url.pathname, newPage);

export const saveScrollPosition = (scrollY: number) =>
	signalPageState.updateScrollPosition(page.url.pathname, scrollY);

export function setMouseState() {
	return setContext('mouse', new MouseState());
}
export function getMouseState() {
	return getContext<ReturnType<typeof setMouseState>>('mouse');
}
