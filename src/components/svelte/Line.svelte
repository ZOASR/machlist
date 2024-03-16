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

	export let locale: string = "en";
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
			title={locale === "en" ? "We design" : "اختر "}
			order={1}
			description={locale === "en"
				? "Choose from a wide collection of machine designs"
				: "اختر من مجموعة من تصميمات الماكينات و خطوط الإنتاج"}
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
			title={locale === "en" ? "We design" : "نحن نصمم"}
			order={2}
			description={locale == "en"
				? "With over 20 years of experience in the industry, we can help you create the design that meets your needs"
				: "مع مهارات عالية من الخبرة في الصناعة، يمكننا مساعدتك على انشاء التصميم الذي يلبي  احتياجك"}
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
			title={locale === "en" ? "You profit" : "ابدأ بالكسب"}
			order={3}
			description={locale === "en"
				? "With an effecient machine design, you can profit from the time and money you save"
				: "مع تصميم ذو كفائة عالية لماكيناتنا، يمكن تحقيق أرباح من الوقت والمال الذي توفره"}
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
