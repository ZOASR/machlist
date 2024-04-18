import js from "@eslint/js";

import globals from "globals";

export default [
	js.configs.recommended,
	{
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"**/build/**",
			"**/.vercel/**/*"
		]
	},
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
