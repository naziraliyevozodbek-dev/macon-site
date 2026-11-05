"use client";
/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { purge, sb } from "./client";
import { Btn, Drawer, Field, GalleryField, ImageField, LText, Toggle, input, type Row } from "./ui";

const CATS = [
  ["villa", "Villa"], ["interior", "Interyer"], ["landscape", "Landshaft"], ["residential", "Turar-joy"],
];
const slugify = (s: string) =>
  s.toLowerCase().replace(/[‘’'«»“”"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const blank = (): Row => ({
  slug: "", title: { uz: "" }, category: "villa", location: { uz: "" }, area: 0, months: 0,
  year: new Date().getFullYear(), image: null, gallery: [], description: { uz: "" },
  featured: false, published: true,
});

export default function Projects({ onError }: { onError: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb().from("macon_projects").select("*").order("sort").order("created_at");
    if (error) onError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }, [onError]);
  useEffect(() => { load(); }, [load]);

  const set = (k: string, v: unknown) => setEdit((e) => (e ? { ...e, [k]: v } : e));

  const save = async () => {
    if (!edit) return;
    const slug = edit.slug || slugify(edit.title?.uz || "");
    if (!edit.title?.uz || !slug) return onError("Loyiha nomini (UZ) kiriting");
    setSaving(true);
    const { id, created_at, ...rest } = edit; // eslint-disable-line @typescript-eslint/no-unused-vars
    const payload = { ...rest, slug, area: +edit.area || 0, months: +edit.months || 0, year: +edit.year || null };
    const res = id
      ? await sb().from("macon_projects").update(payload).eq("id", id)
      : await sb().from("macon_projects").insert({ ...payload, sort: rows.length });
    setSaving(false);
    if (res.error) return onError(res.error.code === "23505" ? "Bunday havola (slug) allaqachon bor" : res.error.message);
    setEdit(null); await purge(); load();
  };
  const remove = async (id: string) => {
    if (!confirm("Loyiha o‘chirilsinmi?")) return;
    const { error } = await sb().from("macon_projects").delete().eq("id", id);
    if (error) return onError(error.message);
    await purge(); load();
  };
  const move = async (i: number, dir: -1 | 1) => {
    const a = rows[i], b = rows[i + dir];
    if (!b) return;
    await Promise.all([
      sb().from("macon_projects").update({ sort: i + dir }).eq("id", a.id),
      sb().from("macon_projects").update({ sort: i }).eq("id", b.id),
    ]);
    await purge(); load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[15px] text-g2">{rows.length} ta loyiha. Saytda shu tartibda chiqadi.</p>
        <Btn onClick={() => setEdit(blank())}>+ Loyiha qo‘shish</Btn>
      </div>
      <div className="divide-y divide-line rounded-xl border border-line bg-white">
        {loading && <p className="p-6 text-g2">Yuklanmoqda…</p>}
        {!loading && rows.length === 0 && <p className="p-6 text-g2">Loyihalar yo‘q. “Bosh sahifa” bo‘limidan namunaviy ma’lumotlarni yuklang yoki yangisini qo‘shing.</p>}
        {rows.map((r, i) => (
          <div key={r.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex flex-col">
              <button className="text-g2 hover:text-ink disabled:opacity-20" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Yuqoriga">↑</button>
              <button className="text-g2 hover:text-ink disabled:opacity-20" disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Pastga">↓</button>
            </div>
            <div className="h-14 w-20 shrink-0 overflow-hidden rounded-md bg-soft">
              {r.image && <img src={r.image} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-medium">{r.title?.uz}</p>
              <p className="truncate text-[14px] text-g2">{CATS.find((c) => c[0] === r.category)?.[1]} · {r.location?.uz} · {r.year}</p>
            </div>
            {r.featured && <span className="rounded bg-beige px-2 py-0.5 text-[12px]">Bosh sahifada</span>}
            {!r.published && <span className="rounded bg-soft px-2 py-0.5 text-[12px] text-g2">Yashirin</span>}
            <Btn small variant="line" onClick={() => setEdit(r)}>Tahrirlash</Btn>
            <Btn small variant="danger" onClick={() => remove(r.id)}>O‘chirish</Btn>
          </div>
        ))}
      </div>

      {edit && (
        <Drawer
          title={edit.id ? "Loyihani tahrirlash" : "Yangi loyiha"} onClose={() => setEdit(null)}
          footer={<><Btn variant="line" onClick={() => setEdit(null)}>Bekor qilish</Btn><Btn onClick={save} disabled={saving}>{saving ? "Saqlanmoqda…" : "Saqlash"}</Btn></>}
        >
          <LText label="Nomi" value={edit.title} onChange={(v) => set("title", v)} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Turi">
              <select className={input} value={edit.category} onChange={(e) => set("category", e.target.value)}>
                {CATS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </Field>
            <Field label="Havola (slug)" hint="Bo‘sh qoldirsangiz nomdan yaratiladi">
              <input className={input} value={edit.slug} onChange={(e) => set("slug", slugify(e.target.value))} placeholder="villa-sayram" />
            </Field>
          </div>
          <LText label="Joylashuv" value={edit.location} onChange={(v) => set("location", v)} />
          <div className="grid grid-cols-3 gap-4">
            <Field label="Maydon (m²)"><input type="number" className={input} value={edit.area ?? ""} onChange={(e) => set("area", e.target.value)} /></Field>
            <Field label="Muddat (oy)"><input type="number" className={input} value={edit.months ?? ""} onChange={(e) => set("months", e.target.value)} /></Field>
            <Field label="Yil"><input type="number" className={input} value={edit.year ?? ""} onChange={(e) => set("year", e.target.value)} /></Field>
          </div>
          <ImageField label="Asosiy rasm" value={edit.image} onChange={(v) => set("image", v)} />
          <GalleryField value={edit.gallery ?? []} onChange={(v) => set("gallery", v)} />
          <LText label="Tavsif" value={edit.description} multi onChange={(v) => set("description", v)} />
          <Toggle label="Bosh sahifada ko‘rsatilsin (Tanlangan loyihalar)" value={edit.featured} onChange={(v) => set("featured", v)} />
          <Toggle label="Saytda ko‘rsatilsin" value={edit.published} onChange={(v) => set("published", v)} />
        </Drawer>
      )}
    </div>
  );
}
