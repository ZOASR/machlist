<script lang="ts">
	import { Select } from "bits-ui";
	import { quintInOut } from "svelte/easing";
	import { navigate } from "astro:transitions/client";

	export let locale: string = "ar";

	export let items: any[] = [
		{
			value: "en",
			label: "English",
			href: "#"
		},
		{
			value: "ar",
			label: "العربية",
			href: "#"
		}
	];

	const fadeAndScale = (
		node: Element,
		{
			duration,
			delay,
			easing
		}: {
			duration: number;
			delay?: number;
			easing: (t: number) => number;
		}
	) => {
		return {
			delay,
			duration,
			css: (t: number) => {
				const eased = easing(t);
				return `
					transform: scale(${eased});
					opacity: ${eased};
					`;
			}
		};
	};
</script>

<Select.Root
	{items}
	onSelectedChange={(item) => {
		const { value } = item ? item : { value: "ar" };
		navigate(items.find((i) => i.value === value).href, {
			history: "replace"
		});
	}}
	selected={{
		value: locale,
		label: locale == "en" ? "اللغة " : "Language"
	}}
>
	<Select.Trigger
		class="inline-flex justify-center h-input w-full items-center rounded-9px border-2 border-skin-base px-8 transition-colors placeholder:text-skin-base/50 focus:outline-none hover:bg-gradient-to-r from-skin-accent/50 to-skin-accent-1/50 hover:shadow-md rounded-lg py-2"
		aria-label="Select a language"
	>
		<Select.Value
			class=""
			placeholder={locale == "en" ? "العربية" : "English"}
		/>
		<slot />
	</Select.Trigger>
	<Select.Content
		class="rounded-xl p-2 space-y-4 text-white shadow-xl outline-none bg-skin-neutral z-40"
		transition={fadeAndScale}
		transitionConfig={{ duration: 100, easing: quintInOut }}
		style="transform-origin: top center;"
	>
		{#each items as item}
			<Select.Item
				class="flex gap-4 h-10 w-full select-none rounded-lg justify-between items-center py-8 px-4 text-center outline-none transition-all duration-75 data-[highlighted]:text-skin-base data-[highlighted]:bg-gradient-to-r from-skin-accent to-skin-accent-1 cursor-pointer"
				value={item.value}
				label={item.label}
			>
				{item.label}
				<Select.ItemIndicator asChild={false}>
					<slot name="check" />
				</Select.ItemIndicator>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
