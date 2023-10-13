/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

		
        return { session};
    }