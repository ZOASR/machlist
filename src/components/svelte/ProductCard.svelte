<script lang="ts">
	import type { ProductData } from "./utils";

	export let data: ProductData;
	export let slug: string;
	export let t: (key: string) => string;

	export let locale: "en" | "ar";

	const { title, cover, production_rate, production_unit, model, isLine } =
		data;
</script>

<a
	href={`/${locale}${slug}`}
	aria-label={title}
	class="product-card hover:ring-4 focus:ring-4 ring-skin-neutral text-start p-8 flex flex-col max-h-[500px] w-full max-w-[400px] mx-auto gap-10 justify-between text-skin-text-dark items-center bg-gradient-to-br from-skin-accent to-skin-accent-1 shadow-md transition-all duration-150 \
							hover:-translate-y-4 hover:shadow-lg hover:shadow-[hsla(var(--color-neutral),0.3)] hover:rounded-lg
							focus:-translate-y-4 focus:shadow-lg focus:shadow-[hsla(var(--color-neutral),0.3)] focus:rounded-lg focus:outline-dashed"
>
	<img
		class="w-full h-1/2 max-h-[30rem] object-cover rounded-lg"
		src={cover.src}
		alt={title}
	/>
	<h2
		class="text-[clamp(1.5rem,5dvw,3rem)] font-extrabold"
		dir={locale === "ar" ? "rtl" : "ltr"}
	>
		{title}
	</h2>

	{#if production_rate}
		<p class=" text-nowrap">
			{t("product.productionRate")}:
			<span
				class="font-bold bg-skin-neutral p-2 rounded-lg text-skin-accent shadow-lg dark:text-skin-text-dark"
			>
				{production_rate}{" "}
				{production_unit
					? production_unit
					: t("product.productionUnit")}
			</span>
		</p>
	{/if}
	<p class="">
		{t("product.model")}:
		<span
			class="font-bold bg-skin-neutral px-8 py-2 rounded-lg text-skin-accent shadow-lg text-nowrap dark:text-skin-text-dark"
			>{model}</span
		>
	</p>
	<span
		class="py-2 px-4 rounded-lg shadow-xl text-base font-bold self-start"
		class:isLine
		class:isMachine={!isLine}
	>
		{isLine ? t("product.line") : t("product.machine")}
	</span>
</a>

<style>
	.product-card {
		animation: slide-up 1s ease-in-out alternate;
		animation-timeline: view(block);
		animation-range: cover 0% cover 25%;
	}

	.isLine {
		@apply bg-green-200 text-green-800 ring-2 ring-green-800;
	}
	.isMachine {
		@apply bg-blue-200 text-blue-800 ring-2 ring-blue-800;
	}

	@keyframes slide-up {
		from {
			translate: 0 25%;
			opacity: 0.4;
		}
		to {
			translate: 0 0;
			opacity: 1;
		}
	}

	@media (width <= 768px) {
		.product-card {
			animation: none;
		}
		.product-card:not(:nth-child(1)) {
			animation: slide-up 1s ease-in-out alternate;
			animation-timeline: view(block);
			animation-range: cover 0% cover 30%;
		}

		@keyframes slide-up {
			from {
				translate: 25% 0;
				opacity: 0;
			}
			to {
				translate: 0 0;
				opacity: 1;
			}
		}
	}
</style>
