<script lang="ts">
	import BulletPoint from "./BulletPoint.svelte";
	import { quintInOut } from "svelte/easing";
	import ShowOnEnter from "./ShowOnEnter.svelte";
	import type { AnimationProps } from "./utils";
	import { useTranslations } from "@i18n/utils";

	export let locale: "en" | "ar" = "en";

	const t = useTranslations(locale);

	function grow(_: Element, { duration, delay, easing }: AnimationProps) {
		return {
			duration,
			delay,
			css: (t: number) => {
				const eased = easing(t);
				return `
					transform-origin: 50% 0%;
					transform: scaleY(${eased});
					`;
			}
		};
	}
</script>

<div
	class="relative mt-[5rem] flex flex-col items-center justify-center w-full md:w-[69rem] mx-auto overflow-x-clip"
>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-1 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut
			}}
		></div>
	</ShowOnEnter>

	<ShowOnEnter classes="md:self-start">
		<BulletPoint
			dir="right"
			title={t("steps.first.title")}
			order={1}
			description={t("steps.first.description")}
		/>
	</ShowOnEnter>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-2 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut
			}}
		></div>
	</ShowOnEnter>
	<ShowOnEnter classes="md:self-end">
		<BulletPoint
			dir="left"
			title={t("steps.second.title")}
			order={2}
			description={t("steps.second.description")}
		/>
	</ShowOnEnter>
	<ShowOnEnter>
		<div
			class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-3 rounded-lg"
			style="transform-origin: 50% 0%"
			in:grow={{
				duration: 1000,
				easing: quintInOut
			}}
		></div>
	</ShowOnEnter>
	<ShowOnEnter classes="md:self-start">
		<BulletPoint
			dir="right"
			title={t("steps.third.title")}
			order={3}
			description={t("steps.third.description")}
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
