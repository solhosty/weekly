<script>
	import { goto } from '$app/navigation';
	let leagueName = '';

	async function createLeague() {
		const response = await fetch('/api/create-league', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: leagueName })
		});

		const result = await response.json();

		if (result.success) {
			goto(`/leagues/${result.leagueId}`);
		} else {
			console.error('Error creating league:', result.error);
		}
	}
</script>
<h1 class="my-4 text-2xl font-bold text-center text-white">Join League</h1>

<div class="flex justify-center my-4 flex-col w-96 p-2 m-auto border-2 border-white rounded-lg">

	<h2 class="text-white text-xl font-bold opacity-90">Invite Link</h2>
	<p class="my-1">Join league via invite code.</p>
	<input class="input input-bordered my-2" id="league-name" bind:value={leagueName} />
	<button class="btn w-full my-4" on:click={createLeague}>Submit</button>
</div>
