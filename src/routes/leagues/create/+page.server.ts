import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: leagues } = await supabase.from('leagues').select(`name, creator_id`).single();
	const { data: memberships } = await supabase
		.from('memberships')
		.select(`league_id, user_id, creator`)
		.single();
	return { session, leagues, memberships };
};
type League = {
	id: string;
	name: string;
	creator_id: string;
};
export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const session = await getSession();

		if (!session?.user?.id) {
			return fail(400, { error: 'User session is invalid or missing' });
		}

		const { data: insertedLeague, error } = await supabase
			.from('leagues')
			.insert([{ name: name, creator_id: session.user.id }])
			.select('*');
		console.log(insertedLeague);

		if (error || !insertedLeague) {
			return fail(500, { error: error?.message });
		}

		// Get the ID of the newly created league
		const leagueId = (insertedLeague[0] as League).id;
		// Insert the creator as a member of the league with creator set to true
		const { error: membershipError } = await supabase.from('memberships').insert({
			league_id: leagueId,
			user_id: session.user.id,
			creator: true
		});

		if (membershipError) {
			return fail(500, { error: membershipError.message });
		} else if (!membershipError) {
			throw redirect(303, `/leagues/${leagueId}`);
		}

		return {
			name
		};
	},

	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
