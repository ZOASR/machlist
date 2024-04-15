import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [
		tailwind({
			nesting: true
		}),
		svelte(),
		icon(),
		mdx()
	],
	i18n: {
		defaultLocale: "ar",
		locales: ["en", "ar"],
		routing: {
			prefixDefaultLocale: true
		}
	}
});
