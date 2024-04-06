export type Tab = {
	id: number;
	name: { en: string; ar: string };
	slug: string;
	tabSlug: "catalog" | "design" | "drawings" | "gallery";
};
