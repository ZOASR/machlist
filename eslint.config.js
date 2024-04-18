import js from "@eslint/js";
import globals from "globals";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
	js.configs.recommended,
	{
		ignores: [
			"node_modules/**",
			"dist/**",
			"build/**",
			".vercel/**/*",
			".astro/**/*",
			"src/env.d.ts"
		]
	},
	...eslintPluginAstro.configs["flat/recommended"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		rules: {
			"no-unused-vars": "warn",
			"no-undef": "warn"
		}
	}
];
