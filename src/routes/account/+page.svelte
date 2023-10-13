<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Avatar from '../../lib/components/Avatar.svelte';
	import { user, edit } from '../../lib/state/user';
	import { onMount } from 'svelte';
	export let data;
	export let form;

	let { session, profiles, supabase } = data;
	$: ({ session, supabase, profiles } = data);
	let games = []; // Declaring the variable

	let profileForm: HTMLFormElement;
	let loading = false;
	let username: string = profiles?.username ?? '';
	let avatarUrl: string = profiles?.avatar_url ?? '';
	$: user.set(username);
	let userLeagues: string | any[] = []; // This will store the leagues created by the user

	// Fetch the leagues created by the user when the component is mounted
	onMount(async () => {
		const { data, error } = await supabase
			.from('leagues')
			.select('*')
			.eq('creator_id', session?.user?.id);

		if (data) {
			userLeagues = data;
		} else if (error) {
			alert(error.message);
		}
	});

	const handleSignOut = (): (({ update }: { update: () => void }) => Promise<void>) => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
	async function editProfile() {
		$edit = true;
	}
	// This will store the number of picks made by the user for each league
	let userPicksPerLeague: Record<string, number> = {};

	// Fetch the leagues created by the user and the number of picks made for each league
	onMount(async () => {
    const user = session?.user?.id;

    // Fetch leagues where the user is a member
    const { data: memberLeagues, error: memberError } = await supabase
        .from('memberships')
        .select('league_id')
        .eq('user_id', user);

    if (memberError) {
        alert(memberError.message);
        return;
    }

    // Extract league IDs
    const leagueIds = memberLeagues.map(m => m.league_id);

    // Fetch league details
    const { data: leagues, error: leagueError } = await supabase
        .from('leagues')
        .select('*')
        .in('id', leagueIds);

    if (leagueError) {
        alert(leagueError.message);
        return;
    }

    userLeagues = leagues || [];

		// Fetch all picks for the user
		const { data: allUserPicks, error: picksError } = await supabase
			.from('picks')
			.select('*')
			.eq('user_id', session?.user?.id);

		if (picksError) {
			alert(picksError.message);
			return;
		}

		// Group picks by league
		for (let league of userLeagues) {
			userPicksPerLeague[league.id] = allUserPicks.filter(
				(pick) => pick.league === league.id
			).length;
		}

		// Fetch total games for the week (this part is missing in your code)
		const { data: weekGames, error: gamesError } = await supabase
			.from('games')
			.select('*')
			.eq('week', 6); // Assuming week number is 6

		if (gamesError) {
			alert(gamesError.message);
			return;
		}

		games = weekGames || [];
	});
</script>

<svelte:head>
	<title>{$user}'s Account</title>
</svelte:head>
<div class="flex flex-col md:flex-row md:space-x-4 justify-center h-100">
	<div
		class="form-widget flex flex-col items-center border-2 border-white rounded-lg w-full md:w-3/12 p-3 h-full my-6 border-opacity-20 shadow-sm shadow-gray-500"
	>
		<h2 class="text-center text-xl font-bold my-2">{username.toUpperCase()}'S ACCOUNT</h2>
		<div class="divider my-0" />
		<form class="form-widget w-full" method="post" action="?/update" bind:this={profileForm}>
			<Avatar
				{supabase}
				bind:url={avatarUrl}
				size={10}
				on:upload={() => {
					profileForm.requestSubmit();
				}}
			/>
			<div class="my-2 w-100">
				<h3 class="font-bold text-left">Email</h3>
				<input
					class="input w-full my-2 bg-black input-bordered"
					id="email"
					type="text"
					value={session.user.email}
					disabled
				/>
			</div>
			{#if $edit}
				<div class="my-4">
					<h3 class="text-left font-bold my-2">Username</h3>
					<input
						class="input input-bordered w-full bg-black"
						id="username"
						name="username"
						type="text"
						value={form?.username ?? username}
					/>
				</div>
				<div>
					<input
						type="submit"
						class="btn block primary w-full bg-black"
						value={loading ? 'Loading...' : 'Update'}
						disabled={loading}
					/>
				</div>
			{:else if !$edit}
				<div>
					<button
						class="px-4 py-2 flex items-center space-x-2 opacity-70 hover:opacity-95 m-auto"
						on:click={editProfile}
					>
						<img src="/edit.svg" alt="Games Icon" class="w-6 h-6" />
						<span class="text-white font-bold">Edit Profile</span>
					</button>
				</div>
			{/if}
		</form>

		<form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div class="my-6">
				<button
					class="px-4 py-2 flex items-center space-x-2 opacity-70 hover:opacity-95"
					disabled={loading}
				>
					<img src="/signout.svg" alt="Games Icon" class="w-6 h-6" />
					<span class="text-white font-bold">Log Out</span>
				</button>
			</div>
		</form>
	</div>

	<div
		class="form-widget flex flex-col items-center border-2 border-white border-opacity-20 rounded-lg w-full md:w-3/12 p-3 h-full my-6 shadow-sm shadow-gray-500"
	>
		<h2 class="text-center text-xl font-bold my-2">LEAGUES</h2>
		<div class="divider my-0" />
		{#if userLeagues.length}
			<div class="w-full h-64 overflow-y-auto">
				{#each userLeagues as league}
					<a href={`/leagues/${league.id}`}>
						<div
							class="card p-2 my-2 w-full items-center text-center shadow-xl rounded-md border-2 border-white border-opacity-20 bg-black hover:border-opacity-80 relative hover:bottom-1"
						>
							<h3 class="card-title font-bold text-sm">{league.name}</h3>
							{#if userPicksPerLeague[league.id] < games.length}
								<!-- Display the number of games left to pick -->
								<div class="badge my-2">
									Missing {games.length - userPicksPerLeague[league.id]} games
								</div>
							{:else}
								<!-- Display "Completed" badge when all picks are made -->
								<div class="badge badge-success my-2 bg-green-800 text-white">Completed</div>
							{/if}
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p>You haven't created any leagues yet.</p>
		{/if}
		<div class="flex flex-row items-center gap-2 my-5">
			<button
				class="px-4 py-2 flex items-center space-x-2 opacity-70 hover:opacity-95"
				on:click={() => goto('/leagues/create')}
			>
				<img src="/create.svg" alt="Games Icon" class="w-6 h-6" />
				<span class="text-white font-bold">Create</span>
			</button>
			<button
				class="px-4 py-2 flex items-center space-x-2 opacity-70 hover:opacity-95"
				on:click={() => goto('/leagues/join')}
			>
				<img src="/join.svg" alt="Games Icon" class="w-6 h-6" />
				<span class="text-white font-bold">Join</span>
			</button>
		</div>
	</div>
</div>
