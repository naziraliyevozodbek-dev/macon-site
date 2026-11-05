"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { purge, sb } from "./client";
import { Btn, Drawer, Field, ImageField, LText, Toggle, input, type L, type Row } from "./ui";

type FieldDef = {
  k: string; label: string;
  t: "text" | "l" | "lmulti" | "bool" | "llist" | "image";
  hint?: string;
};
export type ItemsCfg = { title: string; add: string; fields: FieldDef[]; label: (d: Row) => string; sub?: (d: Row) => string };

const tr = (v: L | string | undefined) => (typeof v === "string" ? v : v?.uz || "");

export const COLLECTIONS: Record<string, ItemsCfg> = {
  services: {
    title: "Xizmatlar", add: "Xizmat qo‘shish",
    fields: [
      { k: "no", label: "Tartib raqami (01, 02…)", t: "text" },
      { k: "title", label: "Nomi", t: "l" },
      { k: "text", label: "Qisqa tavsif", t: "lmulti" },
      { k: "items", label: "Nimalarni o‘z ichiga oladi", t: "llist" },
    ],
    label: (d) => `${d.no ?? ""}  ${tr(d.title)}`, sub: (d) => tr(d.text),
  },
  stats: {
    title: "Statistika", add: "Ko‘rsatkich qo‘shish",
    fields: [
      { k: "value", label: "Raqam (masalan: 30)", t: "text" },
      { k: "plus", label: "Raqam yoniga “+” qo‘yish", t: "bool" },
      { k: "title", label: "Sarlavha", t: "l" },
      { k: "text", label: "Izoh", t: "l" },
    ],
    label: (d) => `${d.value ?? ""}${d.plus ? "+" : ""}  ${tr(d.title)}`, sub: (d) => tr(d.text),
  },
  advantages: {
    title: "Nega Macon?", add: "Afzallik qo‘shish",
    fields: [
      { k: "no", label: "Tartib raqami", t: "text" },
      { k: "title", label: "Sarlavha", t: "l" },
      { k: "text", label: "Tavsif", t: "lmulti" },
    ],
    label: (d) => `${d.no ?? ""}  ${tr(d.title)}`, sub: (d) => tr(d.text),
  },
  testimonials: {
    title: "Mijozlar fikrlari", add: "Fikr qo‘shish",
    fields: [
      { k: "initials", label: "Bosh harflar (JK)", t: "text" },
      { k: "name", label: "Mijoz ismi", t: "text" },
      { k: "project", label: "Loyiha / izoh", t: "l" },
      { k: "text", label: "Fikr matni", t: "lmulti" },
    ],
    label: (d) => d.name ?? "", sub: (d) => tr(d.text),
  },
  steps: {
    title: "Hamkorlik jarayoni", add: "Bosqich qo‘shish",
    fields: [
      { k: "no", label: "Bosqich raqami (01…)", t: "text" },
      { k: "title", label: "Sarlavha", t: "l" },
      { k: "text", label: "Tavsif", t: "lmulti" },
    ],
    label: (d) => `${d.no ?? ""}  ${tr(d.title)}`, sub: (d) => tr(d.text),
  },
  team: {
    title: "Jamoa", add: "A’zo qo‘shish",
    fields: [
      { k: "name", label: "Ism familiya", t: "text" },
      { k: "initials", label: "Bosh harflar (rasm bo‘lmasa)", t: "text" },
      { k: "role", label: "Lavozimi", t: "l" },
      { k: "photo", label: "Foto", t: "image" },
    ],
    label: (d) => d.name ?? "", sub: (d) => tr(d.role),
  },
};

export default function Items({ collection, onError }: { collection: string; onError: (m: string) => void }) {
  const cfg = COLLECTIONS[collection];
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState<{ id?: string; data: Row; published: boolean } | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb().from("macon_items").select("*").eq("collection", collection).order("sort").order("created_at");
    if (error) onError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }, [collection, onError]);
  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!edit) return;
    setSaving(true);
    const payload = { collection, data: edit.data, published: edit.published };
    const res = edit.id
      ? await sb().from("macon_items").update(payload).eq("id", edit.id)
      : await sb().from("macon_items").insert({ ...payload, sort: rows.length ? Math.max(...rows.map((r) => r.sort ?? 0)) + 1 : 0 });
    setSaving(false);
    if (res.error) return onError(res.error.message);
    setEdit(null); await purge(); load();
  };
  const remove = async (id: string) => {
    if (!confirm("O‘chirilsinmi?")) return;
    const { error } = await sb().from("macon_items").delete().eq("id", id);
    if (error) return onError(error.message);
    await purge(); load();
  };
  const move = async (i: number, dir: -1 | 1) => {
    const a = rows[i], b = rows[i + dir];
    if (!b) return;
    await Promise.all([
      sb().from("macon_items").update({ sort: i + dir }).eq("id", a.id),
      sb().from("macon_items").update({ sort: i }).eq("id", b.id),
    ]);
    await purge(); load();
  };

  const set = (k: string, v: unknown) => setEdit((e) => (e ? { ...e, data: { ...e.data, [k]: v } } : e));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-[15px] text-g2">{rows.length} ta yozuv. Tartibini ↑ ↓ bilan o‘zgartiring.</p>
        <Btn onClick={() => setEdit({ data: {}, published: true })}>+ {cfg.add}</Btn>
      </div>
      <div className="divide-y divide-line rounded-xl border border-line bg-white">
        {loading && <p className="p-6 text-g2">Yuklanmoqda…</p>}
        {!loading && rows.length === 0 && <p className="p-6 text-g2">Hali hech narsa yo‘q. Yuqoridagi tugma orqali qo‘shing.</p>}
        {rows.map((r, i) => (
          <div key={r.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex flex-col">
              <button className="text-g2 hover:text-ink disabled:opacity-20" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Yuqoriga">↑</button>
              <button className="text-g2 hover:text-ink disabled:opacity-20" disabled={i === rows.length - 1} onClick={() => move(i, 1)} aria-label="Pastga">↓</button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[16px] font-medium">{cfg.label(r.data)}</p>
              {cfg.sub && <p className="truncate text-[14px] text-g2">{cfg.sub(r.data)}</p>}
            </div>
            {!r.published && <span className="rounded bg-soft px-2 py-0.5 text-[12px] text-g2">Yashirin</span>}
            <Btn small variant="line" onClick={() => setEdit({ id: r.id, data: r.data, published: r.published })}>Tahrirlash</Btn>
            <Btn small variant="danger" onClick={() => remove(r.id)}>O‘chirish</Btn>
          </div>
        ))}
      </div>

      {edit && (
        <Drawer
          title={edit.id ? "Tahrirlash" : cfg.add} onClose={() => setEdit(null)}
          footer={<><Btn variant="line" onClick={() => setEdit(null)}>Bekor qilish</Btn><Btn onClick={save} disabled={saving}>{saving ? "Saqlanmoqda…" : "Saqlash"}</Btn></>}
        >
          {cfg.fields.map((f) => {
            const v = edit.data[f.k];
            if (f.t === "text") return <Field key={f.k} label={f.label}><input className={input} value={v ?? ""} onChange={(e) => set(f.k, e.target.value)} /></Field>;
            if (f.t === "l" || f.t === "lmulti") return <LText key={f.k} label={f.label} value={v} multi={f.t === "lmulti"} onChange={(x) => set(f.k, x)} />;
            if (f.t === "bool") return <Toggle key={f.k} label={f.label} value={!!v} onChange={(x) => set(f.k, x)} />;
            if (f.t === "image") return <ImageField key={f.k} label={f.label} value={v} onChange={(x) => set(f.k, x)} />;
            const list: L[] = v ?? [];
            return (
              <div key={f.k} className="space-y-3">
                <span className="block text-[13px] font-medium text-g2">{f.label}</span>
                {list.map((it, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="flex-1"><LText label={`${i + 1}`} value={it} onChange={(x) => set(f.k, list.map((y, j) => (j === i ? x : y)))} /></div>
                    <Btn small variant="danger" onClick={() => set(f.k, list.filter((_, j) => j !== i))}>✕</Btn>
                  </div>
                ))}
                <Btn small variant="line" onClick={() => set(f.k, [...list, { uz: "" }])}>+ Qator qo‘shish</Btn>
              </div>
            );
          })}
          <Toggle label="Saytda ko‘rsatilsin" value={edit.published} onChange={(x) => setEdit({ ...edit, published: x })} />
        </Drawer>
      )}
    </div>
  );
}
