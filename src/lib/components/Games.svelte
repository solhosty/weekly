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

<h2 class="text-center my-2">Current Week: {games[0].week} ({games.length} games)</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-z mx-auto w-8/12 h-96 overflow-auto">
	{#each games as game}
		<div
			class="card w-72 flex justify-center my-2 bg-black shadow-xl border-white border-2 border-opacity-30 hover:border-opacity-90 relative hover:bottom-1"
		>
			<div class="badge badge-outline my-2 mx-2">{game.status}</div>
			<div class="card-body my-0">
				<h2 class="card-title my-0">{game.home_team} vs {game.away_team}</h2>
				<p class="text-sm">Date: {formatDate(game.date)}</p>
				<div class="badge badge-outline">
					{game.home_team}
					{game.home_team_score || 0} - {game.away_team}
					{game.away_team_score || 0}
				</div>

				<div class="card-actions justify-center my-4">
					<label class="text-white">
						<input
							type="radio"
							bind:group={userPicks[game.id]}
							value={game.home_team}
							disabled={hasGameStarted(game.date)}
						/>
						{game.home_team}
					</label>
					<div class="divider lg:divider-horizontal" />

					<label class="text-white">
						<input
							type="radio"
							bind:group={userPicks[game.id]}
							value={game.away_team}
							disabled={hasGameStarted(game.date)}
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
