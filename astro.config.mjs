import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [
		tailwind({
			nesting: true,
		}),
		svelte(),
	],
	adapter: vercel({
		imageService: true,
	}),
});
