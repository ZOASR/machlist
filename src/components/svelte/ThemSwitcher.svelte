<script lang="ts">
	import { Switch } from "bits-ui";
	import clsx from "clsx";
	import { onDestroy, onMount } from "svelte";

	const changeTheme = (checked: boolean) => {
		isChecked = checked;
		document.documentElement.dataset.theme = checked ? "dark" : "light";
		localStorage.setItem("theme", checked ? "dark" : "light");
	};
	let isChecked: boolean;

	onMount(() => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			isChecked = theme === "dark";
		} else {
			console.log("Hello");
			isChecked = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
		}
		window.matchMedia("(prefers-color-scheme: dark)").onchange = (e) => {
			isChecked = e.matches;
		};
	});
	onDestroy(() => {
		window.matchMedia("(prefers-color-scheme: dark)").onchange = null;
	});
</script>

<div class="flex items-center space-x-3">
	<Switch.Root
		class={clsx(
			"inline-flex h-[2.6rem] min-h-[2.6rem] w-[6rem] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-all",
			"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
			"data-[state=checked]:bg-white data-[state=unchecked]:bg-black/30 shadow-[inset_0_0_5px_#0008] dark:data-[state=checked]:bg-white",
			"hover:ring-4 ring-black/50 dark:hover:ring-white/50"
		)}
		dir="ltr"
		checked={isChecked}
		onCheckedChange={(checked) => changeTheme(checked)}
	>
		<Switch.Thumb asChild let:attrs>
			<span
				{...attrs}
				class={clsx(
					"[&_svg]:scale-75",
					"pointer-events-none block size-[2rem] shrink-0 rounded-full transition-transform",
					"data-[state=checked]:translate-x-[3.4rem] data-[state=unchecked]:translate-x-0",
					"border-2 border-black/30 dark:data-[state=unchecked]:border bg-skin-accent dark:bg-slate-600"
				)}
			>
				{#if isChecked}
					<slot name="dark" />
				{:else}
					<slot name="light" />
				{/if}
			</span>
		</Switch.Thumb>
	</Switch.Root>
</div>
