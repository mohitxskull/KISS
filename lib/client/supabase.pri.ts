import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL;
const supabaseServiceKey = process.env.SUPA_PRI;

export const SupabaseService = createClient(supabaseUrl!, supabaseServiceKey!);
