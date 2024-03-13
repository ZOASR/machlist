<script lang="ts">
	import { quintInOut, quintOut } from "svelte/easing";
	import inView from "./InView";
	let show = false;

	function slideFromLeft(
		node: Element,
		{
			duration,
			delay,
			easing,
		}: {
			duration: number;
			delay?: number;
			easing: (t: number) => number;
		}
	) {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = easing(t);
				return `
					transform: translateX(-${100 - eased * 100}%);
					opacity: ${eased};
					`;
			},
		};
	}

	const clamp: (low: number, val: number, high: number) => number = (
		low: number,
		val: number,
		high: number
	): number => {
		return Math.min(Math.max(val, low), high);
	};
</script>

<div
	use:inView
	on:enter={() => (show = true)}
	on:exit={() => (show = false)}
	class="relative h-[20rem] md:h-[30rem] md:w-[50rem] w-[80%] mx-auto mb-[5rem]"
>
	{#each [1, 2, 3, 4, 5, 6, 7, 8] as n}
		{#if show}
			<img
				src={`/stats_image_${n}.jpg`}
				alt="Machine Thumbnail"
				class="absolute h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem] rounded-3xl shadow-lg"
				style={`
				left: ${10 * (n - 1)}%;
				z-index: ${8 - n};
				scale: ${clamp(0.2, 1.2 - n / 8, 1)};
				${n === 1 ? "" : `filter: blur(${(n / 8) * 10}px);`}`}
				transition:slideFromLeft={{
					duration: 700,
					delay: 50 * (n - 1),
					easing: quintInOut,
				}}
			/>
		{/if}
	{/each}
</div>
