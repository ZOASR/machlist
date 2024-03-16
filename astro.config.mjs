import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "server",
	integrations: [
		tailwind({
			nesting: true
		}),
		svelte(),
		icon(),
		mdx()
	],
	adapter: vercel(),
	i18n: {
		defaultLocale: "ar",
		locales: ["en", "ar"],
		routing: {
			prefixDefaultLocale: true
		}
	}
});
