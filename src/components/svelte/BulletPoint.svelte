<script lang="ts">
	export let title: string;
	export let description: string;
	export let dir: "left" | "right";
	export let order = 1;
</script>

<div
	class="w-full mx-auto my-10 flex flex-col-reverse gap-8 justify-center items-center"
	class:md:flex-row-reverse={dir === "left"}
	class:md:flex-row={dir === "right"}
>
	<div
		class="size-[5rem] -z-10 rounded-full"
		class:order-1={order === 1}
		class:order-2={order === 2}
		class:order-3={order === 3}
	></div>
	<div class="text-[5rem] text-center md:text-start">
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

<style>
	.order-1 {
		@apply bg-skin-accent-1;
		box-shadow: 0 0 0 10px hsla(var(--color-accent-1), 0.5);
	}
	.order-2 {
		@apply bg-skin-accent-2;
		box-shadow: 0 0 0 10px hsla(var(--color-accent-2), 0.5);
	}
	.order-3 {
		@apply bg-skin-accent-3;
		box-shadow: 0 0 0 10px hsla(var(--color-accent-3), 0.5);
	}
</style>
