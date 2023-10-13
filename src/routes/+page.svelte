<script>
	import { fade, fly } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';

	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 0);
	});
</script>

{#if loaded}
	<div transition:fade>
		<Header />
	</div>
	<div transition:fade={{ delay: 500 }}>
		<div transition:fly={{ y: 800 }}>
			<h2 class="text-center my-4 text-2xl">Create a league now!</h2>
		</div>
	</div>
	<div transition:fade={{ delay: 500 }}>
		<div transition:fly={{ y: 800 }}>
			<div class="btn-container flex-col w-full flex justify-center items-center mt-10 gap-2">
				<a
					href="/auth/log-in"
					class="btn bg-black border-white hover:bg-white hover:text-black btn-primary w-full lg:w-1/4 md:w-1/4"
				>
					<h2>Log In / Sign Up</h2></a
				>
			</div>
		</div>
	</div>
{/if}
