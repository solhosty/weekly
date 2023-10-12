import { createClient } from '@supabase/supabase-js';

const { VITE_PUBLIC_SUPABASE_ANON_KEY, VITE_PUBLIC_SUPABASE_URL } = import.meta.env;
console.log(VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY)
if (!VITE_PUBLIC_SUPABASE_URL || !VITE_PUBLIC_SUPABASE_ANON_KEY) throw new Error('Missing env vars: PUBLIC_SUPABASE_ANON_KEY or PUBLIC_SUPABASE_URL');
const supabase = createClient(VITE_PUBLIC_SUPABASE_URL, VITE_PUBLIC_SUPABASE_ANON_KEY);

export default supabase;
