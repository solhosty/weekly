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
	<div class="modal-box">
		<h3 class="font-bold text-lg">Hello!</h3>
		<p class="py-4">Press ESC key or click outside to close</p>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
