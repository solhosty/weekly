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
			<script
				src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
				type="module"
			></script>
			<dotlottie-player
				class="flex justify-center m-auto my-2 shadow-lg rounded-lg shadow-white"
				src="https://lottie.host/25827178-de63-48d2-ab2f-73d2139de625/vzsg9NVfgb.json"
				background="transparent"
				speed="1"
				style="width: 200px; height: 200px;"
				loop
				autoplay
			/>
		</div>
	</div>
	<div transition:fade={{ delay: 500 }}>
		<div transition:fly={{ y: 800 }}>
			<div class="btn-container flex-col w-full flex justify-center items-center mt-10 gap-2">
				<a
					href="/auth/log-in"
					class="btn bg-black border-white hover:bg-white hover:text-black btn-primary w-1/4"
				>
					<h2>Log In / Sign Up</h2></a
				>
			</div>
		</div>
	</div>
{/if}
