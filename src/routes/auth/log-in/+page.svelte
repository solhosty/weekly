<script lang="ts">
	//@ts-nocheck
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	let email = '';
	let signupEmail = '';
	let signUpPassword = '';
	let password = '';
	let errorMessage = '';
	let successMessage = '';
	let loaded = false;

	onMount(() => {
		setTimeout(() => {
			loaded = true;
		}, 0);
	});
	const login = async () => {
		const supaBaseClient = data.supabase;
		const { user, session, error } = await supaBaseClient.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			errorMessage = error.message;
			return;
		}

		goto('/account');
	};

	const signUp = async () => {
		const supaBaseClient = data.supabase;
		signupEmail = signupEmail.trim();
		signUpPassword = signUpPassword.trim();
		const { user, session, error } = await supaBaseClient.auth.signUp({
			email: signupEmail,
			password: signUpPassword
		});

		if (error) {
			errorMessage = error.message;
			return;
		} else {
			successMessage = `Account created. Check ${signupEmail} for verification link.`;
		}
	};
	export let data;
</script>

<svelte:head>
	<title>Sign-In/Sign-Up</title>
</svelte:head>
{#if loaded}
	<div class="flex justify-center">
		<div
			class="flex flex-col md:flex-row items-center justify-center md:space-x-10 w-full md:w-auto mx-auto"
			transition:fade={{ delay: 100 }}
		>
			<div class="w-full md:w-96 text-center" transition:fly={{ y: 200, delay: 100 }}>
				<h2 class="text-xl font-bold mb-6">Sign In</h2>

				<form on:submit|preventDefault={login} class="h-full flex flex-col gap-4 p-4">
					<h2 class="text-md text-left">Email</h2>
					<input
						class="input bg-black border-white border-opacity-25"
						type="email"
						bind:value={email}
					/>
					<h2 class="text-md text-left">Password</h2>
					<input
						class="input bg-black border-white border-opacity-25"
						type="password"
						bind:value={password}
					/>
					<button
						class="btn bg-black text-white btn-bordered border-2 border-white border-opacity-25 hover:shadow-sm hover:shadow-white"
						type="submit"
					>
						<h2>Log In</h2></button
					>
				</form>
			</div>
			<div class="divider lg:divider-horizontal opacity-95" />
			<div class="w-full md:w-96 text-center" transition:fly={{ y: 200, delay: 100 }}>
				<h2 class="text-xl font-bold mb-6">Sign Up</h2>
				<form on:submit|preventDefault={signUp} class="h-full flex flex-col gap-4 p-4">
					<h2 class="text-md text-left">Email</h2>
					<input
						class="input bg-black border-white border-opacity-25"
						type="email"
						bind:value={signupEmail}
					/>
					<h2 class="text-md text-left">Password</h2>
					<input
						class="input bg-black border-2 border-white border-opacity-25"
						type="password"
						bind:value={signUpPassword}
					/>
					<button
						class="btn bg-black text-white border-white border-2 border-opacity-25 btn-bordered hover:shadow-sm hover:shadow-white"
						type="submit"
					>
						<h2>Sign Up</h2></button
					>
				</form>
			</div>
		</div>
	</div>
{/if}
{#if errorMessage}
	<div class="alert alert-error w-2/4 flex sm:w-4/4 sm:p-2 justify-center m-auto my-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>{errorMessage}</span>
	</div>
{/if}
{#if successMessage}
	<div class="alert alert-success w-2/4 flex sm:w-4/4 sm:p-2 justify-center m-auto my-4">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>{successMessage}</span>
	</div>
{/if}
