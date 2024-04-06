/** @type {import('tailwindcss').Config} */

function withOpacity(varName) {
	return ({ opacityValue }) => {
		if (opacityValue) {
			return `hsla(var(${varName}), ${opacityValue})`;
		}
		return `hsl(var(${varName}))`;
	};
}
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: [
		"variant",
		[
			"&:where([data-theme='dark'], [data-theme='dark'] *) ",
			"@media (prefers-color-scheme: dark){ &:not([data-theme='light'] *) }"
		]
		// "selector",
		// "[data-theme='dark']"
	],
	theme: {
		extend: {
			keyframes: {
				"bounce-down": {
					"0%, 100%": {
						transform:
							"translateY(calc(-1 * var(--bounce-distance)))",
						"animation-timing-function":
							"cubic-bezier(0.8, 0, 1, 1)"
					},
					"50%": {
						transform: "translateY(0)",
						"animation-timing-function":
							"cubic-bezier(0, 0, 0.2, 1)"
					}
				},
				"bounce-up": {
					"0%, 100%": {
						transform: "translateY(var(--bounce-distance))",
						"animation-timing-function":
							"cubic-bezier(0.8, 0, 1, 1)"
					},
					"50%": {
						transform: "translateY(0)",
						"animation-timing-function":
							"cubic-bezier(0, 0, 0.2, 1)"
					}
				}
			},
			animation: {
				"bounce-down": "bounce-down var(--bounce-timing) infinite",
				"bounce-up": "bounce-up var(--bounce-timing) infinite"
			},
			colors: {
				skin: {
					primary: withOpacity("--color-primary"),
					secondary: withOpacity("--color-secondary"),
					neutral: withOpacity("--color-neutral"),
					accent: withOpacity("--color-accent"),
					"accent-1": withOpacity("--color-accent-1"),
					"accent-2": withOpacity("--color-accent-2"),
					"accent-3": withOpacity("--color-accent-3"),
					purple: withOpacity("--color-purple"),
					teal: withOpacity("--color-teal"),
					magenta: withOpacity("--color-magenta"),
					background: withOpacity("--color-background"),
					base: withOpacity("--color-text-base"),
					"text-dark": withOpacity("--color-text-dark"),
					muted: withOpacity("--color-text-muted")
				}
			}
		}
	},
	plugins: []
};
