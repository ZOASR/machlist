<script lang="ts">
	import { Select, RadioGroup, Label } from "bits-ui";
	import { quintInOut } from "svelte/easing";
	import ProductCard from "./ProductCard.svelte";
	import { fadeAndScale, type Product, type uiObject } from "./utils";

	export let products: Product[];
	export let locale: "en" | "ar";

	export let ui: uiObject;

	let lineFilter = "all";
	let modelFilter: string | unknown = "";
	let textFilter: string;

	const t = (key: string) => ui[locale][key];

	const models = products.map((product) => product.model);
	const types = [
		{ label: t("filter.all"), value: "all" },
		{ label: t("filter.machine"), value: "machine" },
		{ label: t("filter.line"), value: "line" }
	];

	let filteredProducts = products.sort((a, b) => a.order - b.order);

	$: if (lineFilter === "machine")
		filteredProducts = products.filter((product) => !product.isLine);
	$: if (lineFilter === "line")
		filteredProducts = products.filter((product) => product.isLine);
	$: if (lineFilter === "all") filteredProducts = products;
	$: if (modelFilter)
		filteredProducts = products.filter(
			(product) => product.model === modelFilter
		);
	$: if (textFilter)
		filteredProducts = products.filter((product) =>
			textFilter !== "" || textFilter === undefined
				? product.title
						.toLowerCase()
						.includes(textFilter.toLowerCase()) ||
					product.model
						?.toLowerCase()
						.includes(textFilter.toLowerCase())
				: true
		);
	$: if (textFilter) console.log(textFilter);
</script>

<form
	class="flex flex-col md:flex-row flex-wrap gap-8 justify-center items-center w-11/12 max-w-[1200px] mx-auto rounded-lg shadow-lg px-10 py-8 font-semibold bg-gradient-to-r from-skin-accent to-skin-accent-1"
	on:submit={(event) => event.preventDefault()}
>
	<h1 class="text-4xl">{t("filter.search")}...</h1>

	<label
		class="flex items-center justify-between rounded-lg p-4 bg-skin-primary has-[:focus]:ring-4 has-[:focus]:ring-black/20 transition-all shadow-xl"
	>
		<input
			type="text"
			bind:value={textFilter}
			placeholder={t("filter.search")}
			class="bg-transparent outline-none placeholder:text-skin-base/50"
		/>
		<slot name="search-icon" />
	</label>

	<span
		class="bg-skin-neutral/50 rounded-full size-4 ring-2 ring-skin-neutral/60"
	></span>

	<RadioGroup.Root
		class="flex gap-8 text-[2rem] items-center font-medium"
		onValueChange={(value) => (lineFilter = value)}
	>
		{#each types as type}
			<div
				class="group flex gap-4 select-none items-center transition-all"
			>
				<RadioGroup.Item
					id={type.value}
					value={type.value}
					class="size-10 shrink-0 cursor-default rounded-full border border-solid border-skin-primary/50 bg-slate-800 transition-all duration-100 ease-in-out hover:border-skin-primary data-[state='checked']:border-8 data-[state='checked']:border-skin-primary"
				/>
				<Label.Root for={type.value} class="pl-3">
					{type.label}
				</Label.Root>
			</div>
		{/each}
	</RadioGroup.Root>

	<span
		class="bg-skin-neutral/50 rounded-full size-4 ring-2 ring-skin-neutral/60"
	></span>

	<div class="flex gap-4 items-center">
		<span>{t("product.model")}:</span>
		<Select.Root
			preventScroll={false}
			onSelectedChange={(value) => (modelFilter = value?.value)}
		>
			<Select.Trigger
				class="flex justify-between w-[20rem] bg-skin-primary py-4 px-8 rounded-lg shadow-xl data-[escapee]:ring-4 data-[escapee]:ring-black/20 transition-all"
			>
				<Select.Value placeholder={t("filter.emptyModel")} />
				<slot name="caret-icon" />
			</Select.Trigger>

			<Select.Content
				class="rounded-xl h-[20rem] p-2 space-y-4 shadow-xl outline-none bg-skin-neutral z-40 my-4 overflow-y-auto"
				transition={fadeAndScale}
				transitionConfig={{ duration: 250, easing: quintInOut }}
			>
				{#each models as model}
					<Select.Item
						value={model}
						label={model}
						class="flex w-full select-none justify-center text-center font-bold items-center px-8 py-4 cursor-pointer rounded-lg outline-none transition-all duration-75 data-[highlighted]:bg-skin-primary text-white data-[highlighted]:text-skin-base"
					>
						{model}
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
				data={{ ...product }}
				{locale}
				{t}
				slug={`/products/${product.slug}`}
			/>
		{/key}
	{/each}
</div>
