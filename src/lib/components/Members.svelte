<script>
	/**
	 * @type {any[]}
	 */
	export let members = [];
	/**
	 * @param {string} username
	 */

</script>

{#if Array.isArray(members)}
<div class="flex flex-row mx-4 justify-center items-center my-2">

	<h2 class="text-center my-2">Total: {members.length}</h2>
	</div>	
	{#each members as member}
	<div
	class="card w-5/12 h-12 p-2 bg-black text-md justify-center flex items-center m-auto border-2 border-white border-opacity-30 my-2 shadow-xl hover:border-opacity-90"
>
			<div class="card-body">
				<h2 class="card-title mt-2 text-sm">{member.username}</h2>
				<div class="card-actions justify-end" />
			</div>
		</div>
	{/each}
{:else}
	<p>No members available.</p>
{/if}






