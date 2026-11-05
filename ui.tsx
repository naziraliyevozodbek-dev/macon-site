"use client";
/* eslint-disable @next/next/no-img-element, @typescript-eslint/no-explicit-any */
import { useRef, useState, type ReactNode } from "react";
import { sb } from "./client";

export type L = { uz: string; ru?: string; en?: string };
export type Row = Record<string, any>;

export const input =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[15px] outline-none transition focus:border-ink";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-g2">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[12px] text-g1">{hint}</span>}
    </label>
  );
}

export function Btn({
  children, onClick, variant = "dark", disabled, type = "button", small,
}: {
  children: ReactNode; onClick?: () => void; variant?: "dark" | "line" | "danger" | "accent";
  disabled?: boolean; type?: "button" | "submit"; small?: boolean;
}) {
  const v = {
    dark: "bg-ink text-white hover:bg-black",
    accent: "bg-accent text-white hover:opacity-90",
    line: "border border-line bg-white text-ink hover:border-ink",
    danger: "border border-line bg-white text-red-600 hover:border-red-600",
  }[variant];
  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      className={`rounded-lg font-medium transition disabled:opacity-50 ${small ? "px-3 py-1.5 text-[13px]" : "px-5 py-2.5 text-[15px]"} ${v}`}
    >
      {children}
    </button>
  );
}

const LANGS = ["uz", "ru", "en"] as const;

/** One text value in three languages (UZ / RU / EN tabs). */
export function LText({
  label, value, onChange, multi,
}: { label: string; value?: L; onChange: (v: L) => void; multi?: boolean }) {
  const [tab, setTab] = useState<(typeof LANGS)[number]>("uz");
  const v: L = value ?? { uz: "" };
  const set = (s: string) => onChange({ ...v, [tab]: s });
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[13px] font-medium text-g2">{label}</span>
        <div className="flex gap-1">
          {LANGS.map((l) => (
            <button
              key={l} type="button" onClick={() => setTab(l)}
              className={`rounded px-2 py-0.5 text-[12px] font-medium uppercase ${tab === l ? "bg-ink text-white" : "bg-soft text-g2"} ${l !== "uz" && !v[l] ? "opacity-60" : ""}`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      {multi ? (
        <textarea className={`${input} min-h-[110px]`} value={v[tab] ?? ""} onChange={(e) => set(e.target.value)} />
      ) : (
        <input className={input} value={v[tab] ?? ""} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  );
}

/** Upload to the public `macon-media` bucket; returns the public URL. */
export async function uploadImage(file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  const { error } = await sb().storage.from("macon-media").upload(path, file, { cacheControl: "31536000", upsert: false });
  if (error) throw error;
  return sb().storage.from("macon-media").getPublicUrl(path).data.publicUrl;
}

export function ImageField({
  label, value, onChange,
}: { label: string; value?: string | null; onChange: (url: string | null) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true); setErr("");
    try { onChange(await uploadImage(f)); } catch (e: any) { setErr(e?.message || "Yuklab bo‘lmadi"); }
    setBusy(false);
  };
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-g2">{label}</span>
      <div className="flex items-center gap-4">
        <div className="h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-soft">
          {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn small variant="line" disabled={busy} onClick={() => ref.current?.click()}>{busy ? "Yuklanmoqda…" : value ? "Almashtirish" : "Rasm yuklash"}</Btn>
          {value && <Btn small variant="danger" onClick={() => onChange(null)}>Olib tashlash</Btn>}
        </div>
        <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
      </div>
      {err && <p className="mt-1 text-[12px] text-red-600">{err}</p>}
    </div>
  );
}

export function GalleryField({
  value, onChange,
}: { value: string[]; onChange: (v: string[]) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    try {
      const urls: string[] = [];
      for (const f of Array.from(files)) urls.push(await uploadImage(f));
      onChange([...value, ...urls]);
    } catch { /* surfaced by missing thumbnails */ }
    setBusy(false);
  };
  return (
    <div>
      <span className="mb-1.5 block text-[13px] font-medium text-g2">Galereya</span>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {value.map((u, i) => (
          <div key={u + i} className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-soft">
            <img src={u} alt="" className="h-full w-full object-cover" />
            <button
              type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="absolute right-1.5 top-1.5 rounded bg-black/70 px-1.5 text-[12px] text-white opacity-0 transition group-hover:opacity-100"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button" onClick={() => ref.current?.click()} disabled={busy}
          className="aspect-[4/3] rounded-lg border border-dashed border-g1 text-[13px] text-g2 hover:border-ink"
        >
          {busy ? "Yuklanmoqda…" : "+ Rasm qo‘shish"}
        </button>
      </div>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => add(e.target.files)} />
    </div>
  );
}

/** Right-hand drawer used for add / edit forms. */
export function Drawer({
  title, onClose, children, footer,
}: { title: string; onClose: () => void; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="flex h-full w-full max-w-[640px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="text-[18px] font-semibold">{title}</h3>
          <button onClick={onClose} className="text-[22px] leading-none text-g2 hover:text-ink" aria-label="Yopish">×</button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">{children}</div>
        <div className="flex justify-end gap-3 border-t border-line px-6 py-4">{footer}</div>
      </div>
    </div>
  );
}

export function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button" role="switch" aria-checked={value} onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition ${value ? "bg-ink" : "bg-g1"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${value ? "left-[22px]" : "left-0.5"}`} />
      </button>
      <span className="text-[15px]">{label}</span>
    </label>
  );
}
