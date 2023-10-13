<script>
	import { goto } from '$app/navigation';
	import supabase from '$lib/utils/supabase/client';

	let leagueCode = '';
	export let data;
	async function joinLeague() {
		const session = data.session;
		const { data: inviteData, error: inviteError } = await supabase
			.from('invites')
			.select('*')
			.eq('invite_code', leagueCode);

		if (inviteError) {
			console.error('Error fetching invite data:', inviteError);
			// Handle error, maybe show a message to the user.
		} else if (inviteData && inviteData.length) {
			const invite = inviteData[0];
			const user = session.user.id;

			// Check if the user is already a member of the league
			const { data: existingMembership } = await supabase
				.from('memberships')
				.select('*')
				.eq('user_id', user)
				.eq('league_id', invite.league_id);

			if (existingMembership && existingMembership.length) {
				goto(`/leagues/${invite.league_id}`);
				// Handle this case, maybe show a message to the user.
				return;
			}

			const { error: membershipError } = await supabase.from('memberships').insert([
				{
					creator: false,
					league_id: invite.league_id,
					user_id: user,
					points: 0
				}
			]);

			if (membershipError) {
				console.error('Error adding user to memberships:', membershipError);
				// Handle error, maybe show a message to the user.
			} else {
				goto(`/leagues/${invite.league_id}`);
			}
		} else {
		}
	}
</script>

<h1 class="my-4 text-2xl font-bold text-center text-white">Join League</h1>

<div class="flex justify-center my-4 flex-col w-96 p-2 m-auto border-2 border-white rounded-lg">
	<h2 class="text-white text-xl font-bold opacity-90">Invite Link</h2>
	<p class="my-1">Join league via invite code.</p>
	<input class="input input-bordered my-2" id="league-code" bind:value={leagueCode} />
	<button class="btn w-full my-4" on:click={joinLeague}>Submit</button>
</div>
