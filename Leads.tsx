"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { sb } from "./client";
import { Btn, type Row } from "./ui";

export default function Leads({ onError }: { onError: (m: string) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await sb().from("macon_leads").select("*").order("created_at", { ascending: false });
    if (error) onError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }, [onError]);
  useEffect(() => { load(); }, [load]);

  const toggle = async (r: Row) => {
    await sb().from("macon_leads").update({ handled: !r.handled }).eq("id", r.id);
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Ariza o‘chirilsinmi?")) return;
    await sb().from("macon_leads").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-3">
      {loading && <p className="text-g2">Yuklanmoqda…</p>}
      {!loading && rows.length === 0 && <p className="rounded-xl border border-line bg-white p-6 text-g2">Hozircha arizalar yo‘q. Saytdagi “Aloqa” formasidan kelgan arizalar shu yerda chiqadi.</p>}
      {rows.map((r) => (
        <div key={r.id} className={`rounded-xl border bg-white p-5 ${r.handled ? "border-line opacity-70" : "border-ink/20"}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[17px] font-semibold">{r.name}</p>
              <a href={`tel:${r.phone}`} className="text-[15px] text-accent">{r.phone}</a>
              {r.service && <span className="ml-3 rounded bg-soft px-2 py-0.5 text-[12px] text-g2">{r.service}</span>}
            </div>
            <div className="text-right text-[13px] text-g2">
              {new Date(r.created_at).toLocaleString("uz-UZ")}
              {r.lang && <span className="ml-2 uppercase">{r.lang}</span>}
            </div>
          </div>
          {r.message && <p className="mt-3 whitespace-pre-wrap text-[15px] text-ink/80">{r.message}</p>}
          <div className="mt-4 flex gap-2">
            <Btn small variant={r.handled ? "line" : "dark"} onClick={() => toggle(r)}>{r.handled ? "Qayta ochish" : "Ko‘rib chiqildi"}</Btn>
            <Btn small variant="danger" onClick={() => remove(r.id)}>O‘chirish</Btn>
          </div>
        </div>
      ))}
    </div>
  );
}
