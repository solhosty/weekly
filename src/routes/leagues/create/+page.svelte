<script lang="ts">

    export let form;
	
</script>
<h1 class="my-2 text-2xl font-bold text-center text-white">Create League</h1>

<div class="flex justify-center mt-5 flex-col w-96 p-2 m-auto border-2 border-white rounded-lg border-opacity-30">
    <form
			class="form-widget w-full mt-4"
			method="post"
			action="?/update"
		>
	<h2 class="text-white text-xl font-bold opacity-100">League Name</h2>
	<p class="my-1">Give the League a cool name.</p>
	<input class="input bg-black input-bordered my-2 w-full" id="name" name="name" value={form?.name ?? ''} />
	<button class="btn w-full my-4 bg-black text-white" type="submit">Submit</button>
    </form>
</div>
