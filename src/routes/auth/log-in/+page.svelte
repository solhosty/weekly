<script lang="ts">
	//@ts-nocheck
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	let email = '';
	let signupEmail = '';
	let signUpPassword = '';
	let password = '';
	let errorMessage = '';
	const login = async () => {
		const supaBaseClient = data.supabase;
		const { user, session, error } = await supaBaseClient.auth.signInWithPassword({
			email,
			password
		});
		if(error) {
			errorMessage = error.message;
			return;
		}
	};
	const signUp = async () => {
		const supaBaseClient = data.supabase;
		const { user, session, error } = await supaBaseClient.auth.signUp({
			signupEmail,
			signUpPassword
		});
		if(error) {
			errorMessage = error.message;
			return;
		}
	};


	export let data;
</script>

<svelte:head>
	<title>Sign-In/Sign-Up</title>
</svelte:head>
<div class="flex justify-center">
	<div
		class="flex flex-col md:flex-row items-center justify-center md:space-x-10 w-full md:w-auto mx-auto"
	>
		<div class="w-full md:w-96 text-center">
			<h2 class="text-xl font-bold mb-6">Sign In</h2>

			<form on:submit|preventDefault={login} class="h-full flex flex-col gap-4">
				<h2 class="text-md text-left">Email</h2>
				<input class="input input-bordered bg-black" type="email" bind:value={email} />
				<h2 class="text-md text-left">Password</h2>
				<input class="input input-bordered bg-black" type="password" bind:value={password} />
				<button class="btn bg-white text-black btn-bordered" type="submit">Log In</button>
			</form>
		</div>
		<div class="w-px h-20 bg-white mx-6 my-10 md:my-0 md:mx-0" />
		<div class="w-full md:w-96 text-center">
			<h2 class="text-xl font-bold mb-6">Sign Up</h2>
			<form on:submit|preventDefault={signUp} class="h-full flex flex-col gap-4">
				<h2 class="text-md text-left">Email</h2>
				<input class="input input-bordered bg-black" type="email" bind:value={signupEmail} />
				<h2 class="text-md text-left">Password</h2>
				<input class="input input-bordered bg-black" type="password" bind:value={signUpPassword} />
				<button class="btn bg-white text-black btn-bordered" type="submit">Sign Up</button>
			</form>
		</div>
	</div>
</div>
