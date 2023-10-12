
/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals: { supabase, getSession } }) => {
    const session = await getSession();
    const leagueId = params.id;

    // Fetch the league using the provided ID
    const { data: league } = await supabase
        .from('leagues')
        .select('*')
        .eq('id', leagueId)
        .single();

    const { data: memberships } = await supabase
        .from('memberships')
        .select('user_id')
        .eq('league_id', leagueId);
    const { data: games } = await supabase
        .from('games')
        .select('*')
        .eq('week', 6);
    if(!memberships) {
        return { status: 404, error: new Error('Membership not found') };
    }
    // Fetch user details for each member
    const memberIds = memberships.map(m => m.user_id);
    const { data: members } = await supabase
        .from('profiles')
        .select('id, username')
        .in('id', memberIds);
    if (!league) {
        return { status: 404, error: new Error('League not found') };
    }

    return { session, league, members, games };
};


