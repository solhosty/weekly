<script>
    /**
	 * @type {any[]}
	 */
     export let members = [];
</script>

{#if Array.isArray(members)}
<h2 class="text-center my-2"> Total: {members.length}</h2>
    {#each members as member}
        <div class="card w-72 h-12 p-2 bg-black justify-center flex items-center m-auto border-2 border-white border-opacity-30 my-2 shadow-xl hover:border-opacity-90">
            <div class="card-body">
              <h2 class="card-title mt-2">{member.username}</h2>
              <div class="card-actions justify-end">
              </div>
            </div>
          </div>
    {/each}
{:else}
    <p>No members available.</p>
{/if}
