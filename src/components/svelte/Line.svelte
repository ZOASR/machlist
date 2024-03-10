<script lang="ts">
	import Saos from "saos";
	import BulletPoint from "./BulletPoint.svelte";
</script>

<Saos animation={"scale-up-top 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<div
		class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-1 rounded-lg"
		data-aos=" scale-up"
	></div>
</Saos>
<Saos animation={"slide-right 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<BulletPoint
		dir="right"
		title="You choose"
		order={1}
		description="Choose from a wide collection of machine designs"
	/>
</Saos>
<Saos animation={"scale-up-top 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<div
		class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-2 rounded-lg"
		data-aos=" scale-up"
	></div>
</Saos>
<Saos animation={"slide-left 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<BulletPoint
		dir="left"
		title="We design"
		order={2}
		description="With over 20 years of experience in the industry, we can help you create the design that meets your needs"
	/>
</Saos>
<Saos animation={"scale-up-top 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<div
		class="w-4 h-[10rem] bg-gradient-to-b from-skin-accent/0 to-skin-accent-3 rounded-lg"
		data-aos=" scale-up"
	></div>
</Saos>
<Saos animation={"slide-right 1s cubic-bezier(0.785, 0.135, 0.15, 0.86) both"}>
	<BulletPoint
		dir="right"
		title="You profit"
		order={3}
		description="With an effecient machine design, you can profit from the time and money you save"
	/>
</Saos>

<style>
	@keyframes -global-scale-up-top {
		0% {
			transform: scaleY(0.5);
			transform-origin: 50% 0%;
		}
		100% {
			transform: scaleY(2);
			transform-origin: 50% 0%;
		}
	}
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

	@media (width <= 768px) {
		@keyframes -global-slide-right {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes -global-slide-left {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes -global-scale-up-top {
			0% {
				transform: scaleY(0.5);
				transform-origin: 50% 0%;
			}
			100% {
				transform: scaleY(1);
				transform-origin: 50% 0%;
			}
		}
	}
</style>
