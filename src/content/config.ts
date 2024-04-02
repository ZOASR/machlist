// 1. Import utilities from `astro:content`
import { z, defineCollection, type SchemaContext } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const productsCollection = defineCollection({
	type: "content",
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			cover: image(),
			order: z.number(),
			production_rate: z.number().optional(),
			production_unit: z
				.union([
					z.literal("Kg/h"),
					z.literal("m/min"),
					z.literal("pieces/min"),
					z.literal("كغ/ساعة"),
					z.literal("متر/دقيقة"),
					z.literal("قطعة/دقيقة")
				])
				.optional(),
			model: z.string().optional(),
			nested: z.boolean().optional(),
			isLine: z.boolean().optional()
		})
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	products: productsCollection
};
