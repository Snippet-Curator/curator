import { Import, Notebook as NotebookIcon, Settings, WalletCards } from 'lucide-svelte';

export const bottomPages: {
	name: string;
	icon: any;
	url: string;
}[] = [
	{
		name: 'Organize',
		icon: WalletCards,
		url: '/organize'
	},
	{
		name: 'Import',
		icon: Import,
		url: '/import'
	},
	{
		name: 'Settings',
		icon: Settings,
		url: '/settings'
	}
	// {
	// 	name: 'Test',
	// 	icon: Settings,
	// 	url: '/test'
	// }
];
