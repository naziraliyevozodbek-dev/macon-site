"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { sb } from "./client";
import { Btn, Field, input } from "./ui";
import Dashboard from "./Dashboard";
import Items, { COLLECTIONS } from "./Items";
import Projects from "./Projects";
import Leads from "./Leads";
import Settings from "./Settings";

const NAV: [string, string][] = [
  ["dashboard", "Umumiy ko‘rinish"],
  ["projects", "Loyihalar"],
  ["services", "Xizmatlar"],
  ["stats", "Statistika"],
  ["advantages", "Nega Macon?"],
  ["testimonials", "Mijozlar fikrlari"],
  ["steps", "Hamkorlik jarayoni"],
  ["team", "Jamoa"],
  ["leads", "Arizalar"],
  ["settings", "Sozlamalar"],
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr("");
    const { error } = await sb().auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr("Email yoki parol noto‘g‘ri");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft px-4">
      <form onSubmit={submit} className="w-full max-w-[400px] space-y-5 rounded-2xl border border-line bg-white p-8 shadow-sm">
        <div>
          <p className="font-serif text-[34px] leading-none tracking-[0.08em]">MACON</p>
          <p className="mt-2 text-[14px] text-g2">Boshqaruv paneliga kirish</p>
        </div>
        <Field label="Email"><input type="email" required autoFocus className={input} value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
        <Field label="Parol"><input type="password" required className={input} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
        {err && <p className="text-[14px] text-red-600">{err}</p>}
        <button disabled={busy} className="w-full rounded-lg bg-ink py-3 font-medium text-white transition hover:bg-black disabled:opacity-60">
          {busy ? "Kirilmoqda…" : "Kirish"}
        </button>
      </form>
    </div>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [tab, setTab] = useState("dashboard");
  const [toast, setToast] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    sb().auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb().auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const err = useCallback((text: string) => { setToast({ kind: "err", text }); setTimeout(() => setToast(null), 6000); }, []);
  const ok = useCallback((text: string) => { setToast({ kind: "ok", text }); setTimeout(() => setToast(null), 3500); }, []);

  if (session === undefined) return <div className="flex min-h-screen items-center justify-center text-g2">Yuklanmoqda…</div>;
  if (!session) return <Login />;

  const title = NAV.find((n) => n[0] === tab)?.[1] ?? "";
  return (
    <div className="min-h-screen bg-soft md:flex">
      <aside className="border-b border-line bg-white md:sticky md:top-0 md:h-screen md:w-[260px] md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-5 md:block md:px-6 md:py-7">
          <p className="font-serif text-[28px] leading-none tracking-[0.08em]">MACON</p>
          <p className="text-[12px] text-g2 md:mt-1.5">CMS</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:space-y-0.5 md:px-3">
          {NAV.map(([k, label]) => (
            <button
              key={k} onClick={() => setTab(k)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-left text-[15px] transition md:w-full ${tab === k ? "bg-ink text-white" : "text-ink/80 hover:bg-soft"}`}
            >
              {label}
            </button>
          ))}
        </nav>
        <div className="hidden px-6 pt-6 md:absolute md:bottom-6 md:block md:w-full">
          <a href="/" target="_blank" rel="noreferrer" className="block text-[14px] text-g2 hover:text-ink">Saytni ko‘rish ↗</a>
          <button onClick={() => sb().auth.signOut()} className="mt-3 text-[14px] text-g2 hover:text-ink">Chiqish</button>
          <p className="mt-3 truncate text-[12px] text-g1">{session.user.email}</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 py-6 md:px-10 md:py-10">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[28px] font-semibold md:text-[34px]">{title}</h1>
          <div className="flex items-center gap-4 md:hidden">
            <a href="/" target="_blank" rel="noreferrer" className="text-[14px] text-g2">Sayt ↗</a>
            <Btn small variant="line" onClick={() => sb().auth.signOut()}>Chiqish</Btn>
          </div>
        </div>
        {tab === "dashboard" && <Dashboard onError={err} onSaved={ok} go={setTab} />}
        {tab === "projects" && <Projects onError={err} />}
        {COLLECTIONS[tab] && <Items key={tab} collection={tab} onError={err} />}
        {tab === "leads" && <Leads onError={err} />}
        {tab === "settings" && <Settings onError={err} onSaved={ok} />}
      </main>

      {toast && (
        <div className={`fixed bottom-6 right-6 z-[60] max-w-[360px] rounded-lg px-4 py-3 text-[14px] text-white shadow-lg ${toast.kind === "ok" ? "bg-ink" : "bg-red-600"}`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
