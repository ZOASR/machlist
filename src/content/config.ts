// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const productsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			cover: image(),
			order: z.number(),
			production_rate: z.number().optional(),
			model: z.string().optional(),
			nested: z.boolean().optional(),
			isLine: z.boolean().optional()
		})
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	products: productsCollection
};
