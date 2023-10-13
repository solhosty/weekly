<script>
	// @ts-nocheck
	function handleClick() {
		const my_modal_2 = document.getElementById('my_modal_2');
		my_modal_2.showModal();
	}
</script>

<button class="btn ml-4 bg-black" on:click={handleClick}>
	<img src="/menu.svg" class="w-8 h-8" alt="" />
</button>
<dialog id="my_modal_2" class="modal">
	<div class="modal-box bg-black">
		<a href="/account" class="btn w-full bg-black border-2 my-2 border-white border-opacity-25">
			<h3 class="text-md">Account</h3>
		</a>
		<button class="btn w-full bg-black border-2 my-2 border-white border-opacity-25">
			<h3 class="text-md">Leagues (Coming Soon)</h3>
		</button>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
