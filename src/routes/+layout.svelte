<script>
	import '../app.postcss';
	import Nav from '$lib/components/Nav.svelte';
</script>

<Nav />
<div class="bg-black min-h-screen">
	<slot />
</div>
