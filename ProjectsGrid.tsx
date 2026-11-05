"use client";
import { useState } from "react";
import { tr, type Lang } from "@/lib/i18n";
import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/Sections";

const cats = [
  ["all", { uz: "Hammasi", ru: "Все", en: "All" }],
  ["villa", { uz: "Villa", ru: "Виллы", en: "Villas" }],
  ["interior", { uz: "Interyer", ru: "Интерьер", en: "Interior" }],
  ["landscape", { uz: "Landshaft", ru: "Ландшафт", en: "Landscape" }],
  ["residential", { uz: "Turar-joy", ru: "Жилые", en: "Residential" }],
] as const;

export default function ProjectsGrid({ lang }: { lang: Lang }) {
  const [cat, setCat] = useState<string>("all");
  const list = projects.filter((p) => cat === "all" || p.category === cat);
  return (
    <>
      <div className="mt-12 flex flex-wrap gap-3">
        {cats.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setCat(k)}
            className={`rounded-full border px-[22px] py-3 text-[16px] font-medium transition-colors duration-300 ${
              cat === k ? "border-ink bg-ink text-white" : "border-line hover:border-ink"
            }`}
          >
            {tr(label, lang)}
          </button>
        ))}
      </div>
      <div key={cat} className="mt-14 grid gap-x-[30px] gap-y-[60px] md:grid-cols-2">
        {list.map((p, i) => (
          <div key={p.slug} className={i === 0 && list.length % 2 === 1 ? "md:col-span-2" : ""}>
            <ProjectCard p={p} lang={lang} h={i === 0 && list.length % 2 === 1 ? 560 : 440} />
          </div>
        ))}
      </div>
    </>
  );
}
