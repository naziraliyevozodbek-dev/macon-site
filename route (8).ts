import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { anonClient, hasSupabase } from "@/lib/supabase";
import { CONTENT_TAG } from "@/lib/content";

/** Called by the admin panel after every save: verifies the Supabase session, then purges the content cache. */
export async function POST(req: Request) {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token || !hasSupabase) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data, error } = await anonClient().auth.getUser(token);
  if (error || !data.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  revalidateTag(CONTENT_TAG, "max");
  return NextResponse.json({ ok: true });
}
