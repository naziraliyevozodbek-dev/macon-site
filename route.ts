import { NextResponse } from "next/server";
import { anonClient, hasSupabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || body.website) return NextResponse.json({ ok: true }); // honeypot
  const name = String(body.name || "").trim().slice(0, 200);
  const phone = String(body.phone || "").trim().slice(0, 50);
  if (name.length < 2 || phone.length < 7) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!hasSupabase) return NextResponse.json({ ok: true });
  const { error } = await anonClient().from("macon_leads").insert({
    name,
    phone,
    service: String(body.service || "").slice(0, 200) || null,
    message: String(body.message || "").slice(0, 4000) || null,
    lang: String(body.lang || "").slice(0, 5) || null,
  });
  if (error) return NextResponse.json({ error: "save_failed" }, { status: 500 });
  return NextResponse.json({ ok: true });
}
