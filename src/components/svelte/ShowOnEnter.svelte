<script lang="ts">
	import inView from "./InView";

	let show = false;
	export let classes = "";
</script>

<div use:inView on:enter={() => (show = true)} class={classes}>
	{#if show}
		<slot />
	{:else}
		<div style="opacity: 0">
			<slot />
		</div>
	{/if}
</div>
