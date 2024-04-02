import { createClient } from '@supabase/supabase-js'

const key = process.env.NEXT_PUBLIC_KEY;

// Supabase init
const supabase = createClient('https://hscrongzyjfebuoxxmsw.supabase.co', key)

export default supabase
