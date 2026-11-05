import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Browser Supabase client with a persisted admin session. */
export function sb(): SupabaseClient {
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: true, autoRefreshToken: true } },
    );
  }
  return client;
}

/** Tell the public site to refresh its cached content. */
export async function purge() {
  const { data } = await sb().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return;
  await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}
