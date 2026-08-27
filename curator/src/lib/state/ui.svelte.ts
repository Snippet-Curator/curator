import { page } from '$app/state';
import { getContext, setContext } from 'svelte';

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

export const guiUpdate = $state({
	suppressRefresh: false
});

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
