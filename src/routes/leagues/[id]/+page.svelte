<!-- src/routes/leagues/[id]/+page.svelte -->

<script>
	import Placeholder from '$lib/components/Placeholder.svelte';
import Members from '$lib/components/Members.svelte';
	import Games from '$lib/components/Games.svelte';
  import supabase from "$lib/utils/supabase/client";


    /** @type {import('./$types').PageData} */
     export let data;
     let activeTab = 'games';

</script>

{#if data.status !== 404}
    <h1 class="mt-4 text-2xl font-bold text-center">{data.league?.name}</h1>
    <div class="flex m-auto justify-center my-6">
      <!-- Games/Picks Tab -->
      <button class="{activeTab === 'games' ? 'opacity-100' : 'opacity-60'} px-4 py-2 flex items-center space-x-2" on:click={() => activeTab = 'games'}>
          <img src="/games.svg" alt="Games Icon" class="w-6 h-6" />
          <span>Games/Picks</span>
      </button>
      <!-- Members Tab -->
      <button class="{activeTab === 'members' ? 'opacity-100' : 'opacity-60'} px-4 py-2 flex items-center space-x-2" on:click={() => activeTab = 'members'}>
          <img src="/members.svg" alt="Members Icon" class="w-6 h-6" />
          <span>Members</span>
      </button>
      <!-- Leaderboard Tab -->
      <button class="{activeTab === 'leaderboard' ? 'opacity-100' : 'opacity-60'} px-4 py-2 flex items-center space-x-2" on:click={() => activeTab = 'leaderboard'}>
          <img src="/leaderboard.svg" alt="Leaderboard Icon" class="w-6 h-6" />
          <span>Leaderboard</span>
      </button>
      <!-- Invite Tab -->
      <button class="{activeTab === 'invite' ? 'opacity-100' : 'opacity-60'} px-4 py-2 flex items-center space-x-2" on:click={() => activeTab = 'invite'}>
          <img src="/invite.svg" alt="Invite Icon" class="w-6 h-6" />
          <span>Invite</span>
      </button>
  </div>
    {#if activeTab === 'games'}
    <div>
      <Games games={data.games} userId={data.session.user.id} leagueId={data.league.id} supabase={supabase}/>
    </div>
  {:else if activeTab === 'members'}
    <div>
      <Members members={data.members} />
  </div>
  {:else if activeTab === 'leaderboard'}
    <div>
      <Placeholder/>
    </div>
  {:else if activeTab === 'invite'}
    <div>
      <Placeholder/>
    </div>
  {/if}
{:else}
    <p>Loading or no data available...</p>
{/if}