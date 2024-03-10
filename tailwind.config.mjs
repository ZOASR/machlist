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
	theme: {
		extend: {
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
					muted: withOpacity("--color-text-muted"),
				},
			},
		},
	},
	plugins: [],
};
