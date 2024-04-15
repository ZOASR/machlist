<script lang="ts">
	import { Select, RadioGroup, Label, type Selected } from "bits-ui";
	import { quintInOut } from "svelte/easing";
	import ProductCard from "./ProductCard.svelte";
	import { fadeAndScale, type Product, type uiObject } from "./utils";
	import clsx from "clsx";
	import type { defaultLang } from "src/i18n/ui";

	export let products: Product[];
	export let locale: "en" | "ar";

	export let ui: uiObject;
	const t = (key: keyof (typeof ui)[typeof defaultLang]) => ui[locale][key];

	type Filters = ["all" | "machine" | "line", string, string];
	let filters: Filters = ["all", "", ""];

	const models = products.map((product) => product.data.model);
	const types = [
		{ label: t("filter.all"), value: "all" },
		{ label: t("filter.machine"), value: "machine" },
		{ label: t("filter.line"), value: "line" }
	];

	let filteredProducts = products.sort((a, b) => a.data.order - b.data.order);

	const setFilters = (
		key: "type" | "model" | "search",
		value: Filters[0] | Filters[1] | Filters[2]
	) => {
		if (key === "type")
			filters = [value as Filters[0], filters[1], filters[2]];
		if (key === "model") filters = [filters[0], value, filters[2]];
		if (key === "search") filters = [filters[0], filters[1], value];
	};

	const changeProducts = (filters: Filters) => {
		const [type, model, search] = filters;
		filteredProducts = products.filter((product) => {
			const isValidModel =
				model && !(model === "all")
					? product.data.model === model
					: true;
			const isValidType =
				type === "all" || !type
					? true
					: type === "machine"
						? !product.data.isLine
						: type === "line"
							? product.data.isLine
							: true;
			const isValidSearch = search
				? product.data.model
						?.toLowerCase()
						.includes(search.toLowerCase()) ||
					product.data.title
						.toLowerCase()
						.includes(search.toLowerCase())
				: true;

			return isValidModel && isValidType && isValidSearch;
		});
	};

	const handleInputChange = (event: Event) => {
		const { value } = event.target as HTMLInputElement;
		setFilters("search", value);
	};

	const handleSelectedCahnge = (item: Selected<Filters[1]> | undefined) => {
		setFilters("model", item?.value || "all");
	};

	$: if (filters) changeProducts(filters);
</script>

<form
	class="flex flex-col md:flex-row flex-wrap gap-8 overflow-auto justify-center items-center w-11/12 max-w-[1200px] mx-auto rounded-lg shadow-lg px-10 py-8 font-semibold bg-gradient-to-r from-skin-accent to-skin-accent-1 dark:text-skin-text-dark"
	on:submit={(event) => event.preventDefault()}
>
	<h1 class="text-4xl">{t("filter.search")}...</h1>

	<label
		class="flex items-center justify-between rounded-lg text-skin-base p-4 bg-skin-primary has-[:focus]:ring-4 has-[:focus]:ring-black/20 transition-all shadow-xl"
	>
		<input
			type="text"
			on:input={handleInputChange}
			placeholder={t("filter.placeholder")}
			class="bg-transparent outline-none placeholder:text-skin-base/50"
		/>
		<slot name="search-icon" />
	</label>

	<span
		class="bg-skin-text-dark/50 rounded-full size-4 ring-2 ring-skin-text-dark/60"
	></span>

	<RadioGroup.Root
		class="flex flex-wrap gap-8 text-[2rem] justify-center items-center font-medium"
		onValueChange={(value) => setFilters("type", value)}
	>
		{#each types as type}
			<div
				class="group flex gap-4 select-none items-center transition-all"
			>
				<RadioGroup.Item
					id={type.value}
					value={type.value}
					class={clsx(
						"size-10 shrink-0 rounded-full border cursor-pointer border-solid border-skin-primary/50 bg-slate-800 transition-all duration-100 ease-in-out",
						"hover:border-skin-primary data-[state='checked']:border-8 data-[state='checked']:border-skin-primary data-[state='checked']:ring-4 data-[state='checked']:ring-black/20",
						"data-[state='checked']:dark:border-skin-base dark:bg-skin-primary hover:dark:border-skin-base dark:border-skin-base/50"
					)}
				/>
				<Label.Root for={type.value} class="cursor-pointer">
					{type.label}
				</Label.Root>
			</div>
		{/each}
	</RadioGroup.Root>

	<span
		class="bg-skin-text-dark/50 rounded-full size-4 ring-2 ring-skin-text-dark/60"
	></span>

	<div class="flex gap-4 items-center">
		<span>{t("product.model")}:</span>
		<Select.Root
			preventScroll={false}
			onSelectedChange={handleSelectedCahnge}
		>
			<Select.Trigger
				class="flex justify-between w-[20rem] bg-skin-primary text-skin-base py-4 px-8 rounded-lg shadow-xl data-[escapee]:ring-4 data-[escapee]:ring-black/20 transition-all"
			>
				<Select.Value placeholder={t("filter.emptyModel")} />
				<slot name="caret-icon" />
			</Select.Trigger>

			<Select.Content
				class="rounded-xl h-[20rem] p-2 space-y-4 shadow-xl outline-none bg-skin-neutral z-40 my-4 overflow-y-auto"
				transition={fadeAndScale}
				transitionConfig={{ duration: 250, easing: quintInOut }}
			>
				{#each ["all", ...models] as model}
					<Select.Item
						value={model}
						label={model === "all" ? t("filter.allModels") : model}
						class="flex w-full select-none justify-center text-center font-bold items-center px-8 py-4 cursor-pointer rounded-lg outline-none transition-all duration-75 data-[highlighted]:bg-skin-primary text-white dark:text-skin-text-dark data-[highlighted]:text-skin-base dark:data-[highlighted]:text-skin-base"
					>
						{model === "all" ? t("filter.allModels") : model}
					</Select.Item>
				{/each}

				<Select.Arrow />
			</Select.Content>
		</Select.Root>
	</div>
</form>

{#if filteredProducts.length === 0}
	<p class="text-[5rem] my-8 font-bold text-center">
		{t("filter.noProducts")}
	</p>
{/if}

<div
	dir={locale == "ar" ? "rtl" : "ltr"}
	class="grid md:grid-cols-3 sm:grid-cols-2 overflow-x-clip grid-cols-1 gap-8 max-w-[1200px] w-[95%] md:w-full px-12 mx-auto my-[5rem]"
>
	{#each filteredProducts as product}
		{#key product.slug}
			<ProductCard
				data={{ ...product.data }}
				{locale}
				{t}
				slug={`/products/${product.slug}`}
			/>
		{/key}
	{/each}
</div>
