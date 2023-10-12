<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 0);
	});
</script>

{#if loaded}
	<div transition:fade={{ delay: 100 }}>
		<h1>Hello</h1>
	</div>
	<div transition:fade={{ delay: 300 }}>
		<div transition:fly={{ y: 200 }}>
			<h2>Welcome to the page</h2>
		</div>
	</div>
{/if}
