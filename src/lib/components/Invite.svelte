<script lang="ts">
	import type { SupabaseClient } from "@supabase/supabase-js";

    /**
	 * @type {any}
	 */
     export let inviteCode: string;
     export let supabase: SupabaseClient;
     export let data: any;
     let copied = false;
     async function generateAndStoreInviteCode() {
		inviteCode = Math.random().toString(36).substr(2, 8).toUpperCase();

		const { error } = await supabase.from('invites').insert([
			{
				invite_code: inviteCode,
				league_id: data.league.id,
				status: 'active'
			}
		]);

		if (error) {
			console.error('Error storing invite code:', error);
			// Handle error, maybe show a message to the user.
		}
	}
    function copyToClipboard(text: string) {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		textarea.style.position = 'absolute';
		textarea.style.left = '-9999px';
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
		copied = true;
	}
</script>

{#if inviteCode}
				<div class="text-center">
					<h2>Your invite code is: {inviteCode}</h2>
					<button
						class="flex m-auto border-2 btn border-white border-opacity-30 bg-black mt-2"
						on:click={() => copyToClipboard(inviteCode)}
					>
						<h2>Copy Invite Code</h2></button
					>
				</div>
				{#if copied}
					<div class="text-center">
						<p class="text-white italic my-2">Invite code copied to clipboard!</p>
					</div>
				{/if}
			{:else}
				<button
					class="flex m-auto border-2 btn border-white border-opacity-30 bg-black mt-2"
					on:click={generateAndStoreInviteCode}
				>
					<h2>Generate Invite Code</h2></button
				>
			{/if}