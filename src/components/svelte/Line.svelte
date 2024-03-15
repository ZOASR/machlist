<script lang="ts">
	import BulletPoint from "./BulletPoint.svelte";
	import { quintInOut } from "svelte/easing";
	import ShowOnEnter from "./ShowOnEnter.svelte";
	import type { AnimationProps } from "./utils";

	function grow(node: Element, { duration, delay, easing }: AnimationProps) {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = easing(t);
				return `
					transform-origin: 50% 0%;
					transform: scaleY(${eased});
					`;
			},
		};
	}
</script>

<div
	class="relative mt-[5rem] flex flex-col items-center justify-center w-full md:w-[69rem] mx-auto overflow-x-clip
	[mask-image:linear-gradient(90deg,_#0005_0%,_#000_10%,_#000_50%,_#000_90%,_#0005_100%)]"
>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-1 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut,
			}}
		></div>
	</ShowOnEnter>

	<ShowOnEnter classes="md:self-start">
		<BulletPoint
			dir="right"
			title="You choose"
			order={1}
			description="Choose from a wide collection of machine designs"
		/>
	</ShowOnEnter>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-2 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut,
			}}
		></div>
	</ShowOnEnter>
	<ShowOnEnter classes="md:self-end">
		<BulletPoint
			dir="left"
			title="We design"
			order={2}
			description="With over 20 years of experience in the industry, we can help you create the design that meets your needs"
		/>
	</ShowOnEnter>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-3 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut,
			}}
		></div>
	</ShowOnEnter>
	<ShowOnEnter classes="md:self-start">
		<BulletPoint
			dir="right"
			title="You profit"
			order={3}
			description="With an effecient machine design, you can profit from the time and money you save"
		/>
	</ShowOnEnter>
</div>

<style>
	@keyframes -global-slide-right {
		0% {
			transform: translateX(0);
			opacity: 0;
		}
		100% {
			opacity: 1;
			transform: translateX(-43.5%);
		}
	}
	@keyframes -global-slide-left {
		0% {
			opacity: 0;
			transform: translateX(0);
		}
		100% {
			opacity: 1;
			transform: translateX(43.5%);
		}
	}
</style>
