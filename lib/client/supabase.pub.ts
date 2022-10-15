import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPA_PUB;
//const supabaseServiceKey = process.env.SUPA_PRI;

export const Supabase = createClient(supabaseUrl!, supabaseAnonKey!);

//export const SupabaseService = createClient(supabaseUrl!, supabaseServiceKey!);
