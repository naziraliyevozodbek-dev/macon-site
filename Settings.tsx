"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { site as defaults } from "@/lib/data";
import { purge, sb } from "./client";
import { Btn, Field, ImageField, LText, input, type Row } from "./ui";

const PAGES: [string, string][] = [
  ["home", "Bosh sahifa (Hero)"], ["about", "Biz haqimizda"], ["projects", "Loyihalar"],
  ["services", "Xizmatlar"], ["contact", "Aloqa"], ["cta", "Pastdagi “Loyihani boshlash” bloki"],
];

export default function Settings({ onError, onSaved }: { onError: (m: string) => void; onSaved: (m: string) => void }) {
  const [s, setS] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    sb().from("macon_settings").select("value").eq("key", "site").maybeSingle().then(({ data, error }) => {
      if (error) onError(error.message);
      setS({ ...defaults, ...(data?.value ?? {}) });
    });
  }, [onError]);

  if (!s) return <p className="text-g2">Yuklanmoqda…</p>;
  const set = (k: string, v: unknown) => setS({ ...s, [k]: v });
  const socials: { name: string; href: string }[] = s.socials ?? [];

  const save = async () => {
    setSaving(true);
    const { error } = await sb().from("macon_settings").upsert({ key: "site", value: s });
    setSaving(false);
    if (error) return onError(error.message);
    await purge(); onSaved("Saqlandi. Sayt yangilandi.");
  };

  return (
    <div className="max-w-[760px] space-y-8">
      <section className="space-y-5 rounded-xl border border-line bg-white p-6">
        <h3 className="text-[18px] font-semibold">Aloqa ma’lumotlari</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Elektron pochta"><input className={input} value={s.email ?? ""} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Telefon"><input className={input} value={s.phone ?? ""} onChange={(e) => set("phone", e.target.value)} /></Field>
        </div>
        <LText label="Manzil" value={s.address} onChange={(v) => set("address", v)} />
        <LText label="Ish vaqti" value={s.hours} onChange={(v) => set("hours", v)} />
      </section>

      <section className="space-y-4 rounded-xl border border-line bg-white p-6">
        <h3 className="text-[18px] font-semibold">Ijtimoiy tarmoqlar</h3>
        {socials.map((x, i) => (
          <div key={i} className="grid grid-cols-[140px_1fr_auto] items-end gap-3">
            <Field label="Nomi"><input className={input} value={x.name} onChange={(e) => set("socials", socials.map((y, j) => (j === i ? { ...y, name: e.target.value } : y)))} /></Field>
            <Field label="Havola"><input className={input} placeholder="https://" value={x.href} onChange={(e) => set("socials", socials.map((y, j) => (j === i ? { ...y, href: e.target.value } : y)))} /></Field>
            <Btn small variant="danger" onClick={() => set("socials", socials.filter((_, j) => j !== i))}>✕</Btn>
          </div>
        ))}
        <Btn small variant="line" onClick={() => set("socials", [...socials, { name: "", href: "" }])}>+ Tarmoq qo‘shish</Btn>
      </section>

      <section className="space-y-6 rounded-xl border border-line bg-white p-6">
        <h3 className="text-[18px] font-semibold">Sahifa fon rasmlari</h3>
        {PAGES.map(([k, label]) => (
          <ImageField key={k} label={label} value={s.images?.[k]} onChange={(v) => set("images", { ...(s.images ?? {}), [k]: v })} />
        ))}
      </section>

      <Btn onClick={save} disabled={saving}>{saving ? "Saqlanmoqda…" : "Saqlash"}</Btn>
    </div>
  );
}
