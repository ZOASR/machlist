export type Tab = {
	id: number;
	name: { en: string; ar: string };
	link: string;
};

export const augerTabs: Tab[] = [
	{
		id: 1,
		name: { en: 'Catalog', ar: 'كاتالوج' },
		link: '/auger_conveyor/catalog'
	},
	{
		id: 2,
		name: { en: 'Design', ar: 'التصميم' },
		link: '/auger_conveyor/design'
	},
	{
		id: 3,
		name: { en: 'Gallery', ar: 'الصور' },
		link: '/auger_conveyor/gallery'
	}
];
