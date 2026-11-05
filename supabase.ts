import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabase = Boolean(url && key);

/** Anonymous client (public reads, contact-form inserts). */
export const anonClient = () =>
  createClient(url!, key!, { auth: { persistSession: false, autoRefreshToken: false } });

/** Client acting as a signed-in user (token from the admin panel). */
export const userClient = (accessToken: string) =>
  createClient(url!, key!, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
