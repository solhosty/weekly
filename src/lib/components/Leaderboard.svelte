<script>
	/**
	 * @type {any[]}
	 */
	export let members;
	/**
	 * @type {any}
	 */
	export let leagueName;
	$: sortedMembers = members.slice().sort((a, b) => b.points - a.points);

</script>

{#if Array.isArray(members)}
	<div class="flex flex-row mx-4 justify-center items-center p-2">
		<img class="h-8 w-8 flex flex-row mx-4" src="/star.svg" alt="" />
		<h2 class="text-center my-2 flex-row">{leagueName.toUpperCase()} LEADERBOARD</h2>
	</div>

	{#each sortedMembers as member, index}
	<div
		class="card w-80 h-12 p-2 bg-black text-md justify-center flex items-center m-auto border-2 border-white border-opacity-30 my-2 shadow-xl hover:border-opacity-90"
	>
		<div class="card-body">
			<h2 class="card-title mt-2">{member.username} - {member.points}</h2>
			<div class="card-actions justify-end" />
		</div>
	</div>
{/each}
{:else}
	<p>No members available.</p>
{/if}
