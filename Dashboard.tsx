"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import {
  advantages, projects, services, site, stats, steps, team, testimonials,
} from "@/lib/data";
import { purge, sb } from "./client";
import { Btn } from "./ui";

const defaultsByCollection: Record<string, any[]> = { services, stats, advantages, testimonials, steps, team };

export default function Dashboard({
  onError, onSaved, go,
}: { onError: (m: string) => void; onSaved: (m: string) => void; go: (k: string) => void }) {
  const [counts, setCounts] = useState<Record<string, number> | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const c = async (t: string) => (await sb().from(t).select("id", { count: "exact", head: true })).count ?? 0;
    const [p, i, l] = await Promise.all([c("macon_projects"), c("macon_items"), c("macon_leads")]);
    const nl = (await sb().from("macon_leads").select("id", { count: "exact", head: true }).eq("handled", false)).count ?? 0;
    setCounts({ projects: p, items: i, leads: l, newLeads: nl });
  }, []);
  useEffect(() => { load().catch(() => onError("Baza bilan aloqa yo‘q. supabase/schema.sql ishga tushirilganini tekshiring.")); }, [load, onError]);

  const seed = async () => {
    if (!confirm("Namunaviy kontent (loyihalar, xizmatlar, fikrlar…) bazaga yuklansinmi? Mavjud yozuvlar o‘zgarmaydi.")) return;
    setBusy(true);
    try {
      if (!counts?.projects) {
        const { error } = await sb().from("macon_projects").insert(
          projects.map((p, i) => ({
            slug: p.slug, title: p.title, category: p.category, location: p.location, area: p.area,
            months: p.months, year: p.year, image: p.image, gallery: p.gallery, description: p.description,
            featured: p.featured, sort: i,
          })),
        );
        if (error) throw error;
      }
      if (!counts?.items) {
        const rows = Object.entries(defaultsByCollection).flatMap(([collection, list]) =>
          list.map((data, sort) => ({ collection, data, sort })),
        );
        const { error } = await sb().from("macon_items").insert(rows);
        if (error) throw error;
      }
      const { error } = await sb().from("macon_settings").upsert({ key: "site", value: site });
      if (error) throw error;
      await purge(); await load(); onSaved("Namunaviy kontent yuklandi.");
    } catch (e: any) { onError(e?.message || "Yuklab bo‘lmadi"); }
    setBusy(false);
  };

  const cards: [string, string, number | undefined, string][] = [
    ["Loyihalar", "projects", counts?.projects, "projects"],
    ["Boshqa kontent yozuvlari", "items", counts?.items, "services"],
    ["Yangi arizalar", "newLeads", counts?.newLeads, "leads"],
    ["Jami arizalar", "leads", counts?.leads, "leads"],
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, , n, to]) => (
          <button key={label} onClick={() => go(to)} className="rounded-xl border border-line bg-white p-6 text-left transition hover:border-ink">
            <p className="text-[14px] text-g2">{label}</p>
            <p className="mt-6 text-[44px] font-semibold leading-none">{n ?? "–"}</p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-white p-6">
        <h3 className="text-[18px] font-semibold">Qanday ishlaydi</h3>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-ink/80">
          <li>Chap menyudan bo‘lim tanlang, matn yoki rasmni o‘zgartiring va “Saqlash” ni bosing.</li>
          <li>Saqlanganda sayt o‘zi yangilanadi, qo‘shimcha hech narsa qilish shart emas.</li>
          <li>Har bir matnni UZ / RU / EN tillarida kiritish mumkin. Bo‘sh qoldirilgan til o‘zbekchaga qaytadi.</li>
        </ul>
        {counts && counts.projects === 0 && counts.items === 0 && (
          <div className="mt-6 flex items-center gap-4 rounded-lg bg-soft p-4">
            <p className="flex-1 text-[15px]">Baza hozircha bo‘sh. Boshlash uchun Figma dizayndagi namunaviy kontentni yuklab oling, keyin o‘zingizniki bilan almashtirasiz.</p>
            <Btn variant="accent" onClick={seed} disabled={busy}>{busy ? "Yuklanmoqda…" : "Namunaviy kontentni yuklash"}</Btn>
          </div>
        )}
      </div>
    </div>
  );
}
