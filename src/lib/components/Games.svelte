<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	export let userId;
	export let leagueId;
	export let supabase;
	export let games = [];
	let userPicks = [];
	async function submitPicks() {
		for (const game of games) {
			const pick = userPicks[game.id];
			if (pick) {
				try {
					const { data, error } = await supabase.from('picks').upsert(
						{
							game_id: game.id,
							user_id: userId,
							league: leagueId,
							picked_team: pick
						},
						{
							onConflict: ['game_id', 'user_id', 'league'] // Adjusted the conflict resolution columns
						}
					);

					if (error) {
						console.error('Error during upsert:', error);
					}
				} catch (err) {
					console.error('Exception caught during upsert:', err);
				}
			}
		}
	}

	function formatDate(dateStr) {
		const options = {
			weekday: 'short',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		};
		const date = new Date(dateStr);
		let formatted = date.toLocaleDateString('en-US', options);
		formatted = formatted.replace(/:00 /, ' '); // Remove seconds
		return formatted;
	}
	function hasGameStarted(dateStr) {
		const gameDate = new Date(dateStr);
		const now = new Date();
		return gameDate <= now;
	}
	onMount(async () => {
		const { data: userPicksData } = await supabase
			.from('picks')
			.select('*')
			.eq('user_id', userId)
			.eq('league', leagueId);

		if (userPicksData) {
			userPicksData.forEach((pick) => {
				userPicks[pick.game_id] = pick.picked_team;
			});
		}
	});
</script>

<style>
	/* Dark-themed scrollbar */
	.overflow-auto::-webkit-scrollbar {
		width: 10px;
	}
	.overflow-auto::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 5px;
	}
	.overflow-auto::-webkit-scrollbar-track {
		background-color: rgba(0, 0, 0, 0.5);
	}
</style>

<h2 class="text-center my-2">Current Week: {games[0].week} ({games.length} games)</h2>
<!-- Adjust the grid to be full-width on mobile and centered with some padding -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 md:px-0 mx-auto w-full md:w-8/12 h-96 overflow-auto">
	{#each games as game}
		<div
			class="card w-full md:w-72 flex justify-center my-2 bg-black shadow-xl border-white border-2 border-opacity-30 hover:border-opacity-90 relative hover:bottom-1"
		>
			<div class="badge badge-outline my-2 mx-2 text-white text-opacity-70">{game.status}</div>
			<div class="card-body my-0 text-white text-opacity-80">
				<h2 class="card-title my-0 text-white">{game.home_team} vs {game.away_team}</h2>
				<p class="text-sm text-white text-opacity-80">Date: {formatDate(game.date)}</p>
				<div class="badge badge-outline mb-4">
					{game.home_team}
					{game.home_score} - {game.away_team}
					{game.away_score}
				</div>

				<div class="card-actions justify-center my-4">
					<label class="text-white flex flex-col items-center">
						<input
							type="radio"
							bind:group={userPicks[game.id]}
							value={game.home_team}
							disabled={hasGameStarted(game.date)}
							class="h-10 w-10 mb-2"
						/>
						{game.home_team}
					</label>
					<div class="divider lg:divider-horizontal mx-8"> OR </div> 
				
					<label class="text-white flex flex-col items-center">
						<input
							type="radio"
							bind:group={userPicks[game.id]}
							value={game.away_team}
							disabled={hasGameStarted(game.date)}
							class="h-10 w-10 mb-2"
						/>
						{game.away_team}
					</label>
				</div>
			</div>
		</div>
	{/each}
</div>
<button
	on:click={submitPicks}
	class="btn bg-black btn-bordered border-2 border-white flex justify-center m-auto my-2 border-opacity-50"
>
	<h2>Submit Picks</h2></button
>