export function getLocaledName(name: string, locale: string) {
	return name
		.replace("catalog", locale === "en" ? "Catalog" : "كاتالوج")
		.replace("design", locale === "en" ? "Design" : "التصميم")
		.replace("drawings", locale === "en" ? "Drawings" : "الرسومات")
		.replace("gallery", locale === "en" ? "Gallery" : "الصور");
}

export type Tab = {
	id: number;
	name: { en: string; ar: string };
	slug: string;
	tabSlug: string;
};
