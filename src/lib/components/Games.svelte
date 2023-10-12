<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    export let userId;
    export let leagueId;
    export let supabase;
    export let games = [];
    let userPicks = [];
    async function submitPicks() {
    for (const game of games) {
      const pick = userPicks[game.id];
      if (pick) {
        console.log("Submitting pick for:", {gameId: game.id, userId, leagueId, pick});
        await supabase.from('picks').upsert({
          game_id: game.id,
          user_id: userId,
          league: leagueId,
          picked_team: pick
        }, { 
        onConflict: 'id'
      });
      }
    }
  }
  function formatDate(dateStr) {
    const options = { weekday: 'short', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date(dateStr);
    let formatted = date.toLocaleDateString('en-US', options);
    formatted = formatted.replace(/:00 /, ' ');  // Remove seconds
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
        userPicksData.forEach(pick => {
            userPicks[pick.game_id] = pick.picked_team;
        });
    }
});
</script>

<h2 class="text-center my-2"> Current Week: {games[0].week} ({games.length} games)</h2>
<div class="grid grid-cols-1 md:grid-cols-3 gap-z mx-auto w-8/12 h-96 overflow-auto">
    {#each games as game}
    <div class="card w-72 flex justify-center my-2 bg-black shadow-xl border-white border-2 border-opacity-30 hover:border-opacity-90 relative hover:bottom-1">
        <div class="card-body">
        <h2 class="card-title">{game.home_team} vs {game.away_team}</h2>
        <p>Date: {formatDate(game.date)}</p>
        <div class="card-actions justify-end">
            Pick:
            <label>
                <input type="radio" bind:group={userPicks[game.id]} value={game.home_team} disabled={hasGameStarted(game.date)} /> {game.home_team}
            </label>
            <label>
                <input type="radio" bind:group={userPicks[game.id]} value={game.away_team} disabled={hasGameStarted(game.date)} /> {game.away_team}
            </label>         
        </div>
        </div>
    </div>
    {/each}
</div>
<button on:click={submitPicks} class="btn bg-black btn-bordered border-2 border-white flex justify-center m-auto my-2 border-opacity-50">Submit Picks</button>