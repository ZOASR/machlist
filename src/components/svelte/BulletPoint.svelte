<script lang="ts">
	import { quintInOut } from "svelte/easing";
	import type { AnimationProps } from "./utils";

	export let title: string;
	export let description: string;
	export let dir: "left" | "right";
	export let order = 1;

	export function slide(
		node: Element,
		{ duration, delay, easing, dir }: AnimationProps
	) {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = easing(t);
				return `
					transform: translateX(${dir === "left" ? "" : "-"}${100 - eased * 100}%);
					`;
			}
		};
	}
</script>

<div
	class="w-full mx-auto my-5 md:my-0 flex flex-col-reverse gap-8 justify-center items-center"
	class:md:flex-row-reverse={dir === "left"}
	class:md:flex-row={dir === "right"}
	in:slide={{
		duration: 1000,
		easing: quintInOut,
		dir
	}}
>
	<div
		class="size-[5rem] -z-10 rounded-full"
		class:order-1={order === 1}
		class:order-2={order === 2}
		class:order-3={order === 3}
	></div>
	<div
		class="text-[5rem] text-center md:text-start [text-shadow:_0_0_0_10px_hsla(var(--color-primary),_1)]"
	>
		<span
			class="font-bold"
			class:text-skin-accent-1={order === 1}
			class:text-skin-accent-2={order === 2}
			class:text-skin-accent-3={order === 3}>{title}</span
		>
		<p class="text-skin-muted text-3xl text-pretty md:w-[30rem]">
			{description}
		</p>
	</div>
</div>

<style lang="scss">
	@for $i from 1 to 4 {
		.order-#{$i} {
			box-shadow:
				0 0 0 10px hsla(var(--color-accent-#{$i}), 0.5),
				0 0 0 20px hsla(var(--color-accent-#{$i}), 0.25);
			animation: pulsate-#{$i} 3s infinite both ease-in-out;
			background-color: hsl(var(--color-accent-#{$i}));
		}

		@keyframes pulsate-#{$i} {
			0%,
			100% {
				box-shadow:
					0 0 0 10px hsla(var(--color-accent-#{$i}), 0.5),
					0 0 0 20px hsla(var(--color-accent-#{$i}), 0.25);
			}

			50% {
				box-shadow:
					0 0 0 5px hsla(var(--color-accent-#{$i}), 0.5),
					0 0 0 10px hsla(var(--color-accent-#{$i}), 0.25);
			}
		}
	}
</style>
