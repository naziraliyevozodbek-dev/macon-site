import Link from "next/link";
import { tr, type Lang, type L } from "@/lib/i18n";
import {
  ui,
  type Advantage, type Member, type Project, type Service, type Stat, type Step, type Testimonial,
} from "@/lib/data";
import Reveal from "./Reveal";
import Img from "./Img";
import { ArrowUpRight } from "./Icons";

/* ---------- Section header (label + big two-tone heading) ---------- */
export function SectionHeader({ label, a, b, lang }: { label: L | string; a: L | string; b: L | string; lang: Lang }) {
  return (
    <Reveal className="grid gap-6 md:grid-cols-[308px_1fr] md:gap-10">
      <div className="flex items-center gap-[5px] self-start text-[16px] font-medium uppercase">
        <span className="h-2.5 w-2.5 rounded-full bg-g1" />
        {tr(label, lang)}
      </div>
      <h2 className="text-[clamp(30px,4.2vw,49px)] font-semibold leading-[1.18] tracking-[-0.015em] text-ink">
        {tr(a, lang)} <span className="text-g1">{tr(b, lang)}</span>
      </h2>
    </Reveal>
  );
}

export const Section = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => (
  <section id={id} className={`mx-auto w-full max-w-[1440px] px-5 py-14 md:px-10 md:py-[60px] ${className}`}>
    {children}
  </section>
);

/* ---------- Stats ---------- */
export function Stats({ lang, items }: { lang: Lang; items: Stat[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-[30px] lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={i} delay={i * 90} className="flex min-h-[238px] flex-col justify-between bg-soft p-5 transition-colors duration-500 hover:bg-beige/60">
          <p className="text-[clamp(44px,6vw,74px)] font-semibold leading-none">
            {s.value}
            {s.plus && <span className="text-accent">+</span>}
          </p>
          <div>
            <p className="text-[clamp(16px,1.6vw,22px)] font-medium">{tr(s.title, lang)}</p>
            <p className="mt-1 text-[14px] font-medium text-g1 md:text-[16px]">{tr(s.text, lang)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Services list ---------- */
export function ServicesList({ lang, items }: { lang: Lang; items: Service[] }) {
  return (
    <div className="border-b border-line">
      {items.map((s, i) => (
        <Reveal key={s.id ?? s.no} delay={i * 70}>
          <Link
            href={`/${lang}/services#s${s.no}`}
            className="group grid items-start gap-3 border-t border-line py-7 transition-colors hover:bg-soft md:grid-cols-[348px_347px_348px_1fr] md:gap-0 md:px-0 md:py-9"
          >
            <span className="text-[16px] font-medium text-g1">{s.no}</span>
            <span className="text-[clamp(24px,2.5vw,32px)] font-medium transition-transform duration-500 group-hover:translate-x-2">
              {tr(s.title, lang)}
            </span>
            <span className="max-w-[348px] text-[16px] font-medium text-g2">{tr(s.text, lang)}</span>
            <span className="hidden justify-self-end md:block">
              <ArrowUpRight size={32} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Project card ---------- */
export function ProjectCard({ p, lang, h = 440 }: { p: Project; lang: Lang; h?: number }) {
  return (
    <Reveal>
      <Link href={`/${lang}/projects/${p.slug}`} className="group block">
        <div className="zoom-wrap" style={{ height: `clamp(260px, 40vw, ${h}px)` }}>
          <Img src={p.image} alt={tr(p.title, lang)} className="h-full w-full" />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4 font-medium">
          <div>
            <p className="text-[22px] transition-colors group-hover:text-accent">{tr(p.title, lang)}</p>
            <p className="mt-1.5 text-[16px] text-g2">
              {tr(p.location, lang)} · {p.area} m² · {p.months} {lang === "uz" ? "oy" : lang === "ru" ? "мес." : "mo."}
            </p>
          </div>
          <p className="text-[16px] text-g1">{p.year}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function FeaturedProjects({ lang, projects }: { lang: Lang; projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const f = featured.length ? featured : projects.slice(0, 3);
  return (
    <>
      <div className="mt-14 grid gap-[60px] md:mt-20">
        {f[0] && <ProjectCard p={f[0]} lang={lang} h={560} />}
        <div className="grid gap-[60px] md:grid-cols-2 md:gap-[30px]">
          {f.slice(1, 3).map((p) => (
            <ProjectCard key={p.slug} p={p} lang={lang} />
          ))}
        </div>
      </div>
      <Link href={`/${lang}/projects`} className="group mt-14 inline-flex items-center gap-2 text-[18px] font-medium">
        <span className="u-link">{tr(ui.viewAll, lang)}</span>
        <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </Link>
    </>
  );
}

/* ---------- Advantages ---------- */
export function Advantages({ lang, items }: { lang: Lang; items: Advantage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:gap-[30px] lg:grid-cols-4">
      {items.map((a, i) => (
        <Reveal key={a.no} delay={i * 90} className="flex min-h-[300px] flex-col justify-between bg-soft p-5 transition-colors duration-500 hover:bg-beige/60">
          <p className="text-[clamp(44px,6vw,74px)] font-semibold leading-none">
            {a.no}<span className="text-accent">.</span>
          </p>
          <div>
            <p className="text-[22px] font-medium">{tr(a.title, lang)}</p>
            <p className="mt-2 text-[16px] font-medium text-g2">{tr(a.text, lang)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Testimonials ---------- */
export function Testimonials({ lang, items }: { lang: Lang; items: Testimonial[] }) {
  return (
    <div className="grid gap-4 md:gap-[30px] lg:grid-cols-3">
      {items.map((t, i) => (
        <Reveal key={t.name} delay={i * 90} className="flex min-h-[380px] flex-col justify-between bg-soft p-5">
          <div>
            <p className="h-[60px] text-[74px] font-semibold leading-[60px] text-accent">“</p>
            <p className="mt-4 text-[22px] font-medium leading-snug">{tr(t.text, lang)}</p>
          </div>
          <div className="mt-10 flex items-center gap-[14px]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-beige text-[16px] font-medium">{t.initials}</span>
            <div>
              <p className="text-[18px] font-medium">{t.name}</p>
              <p className="text-[16px] font-medium text-g2">{tr(t.project, lang)}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Process steps ---------- */
export function Steps({ lang, items }: { lang: Lang; items: Step[] }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 md:gap-[30px] lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={s.no} delay={i * 110} className="flex flex-col gap-7">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="text-[16px] font-medium text-g1">
            {lang === "uz" ? "Bosqich" : lang === "ru" ? "Этап" : "Step"} {s.no}
          </p>
          <div>
            <p className="text-[28px] font-medium leading-tight">{tr(s.title, lang)}</p>
            <p className="mt-3 text-[16px] font-medium text-g2">{tr(s.text, lang)}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------- Team ---------- */
export function Team({ lang, items }: { lang: Lang; items: Member[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-[30px] lg:grid-cols-4">
      {items.map((m, i) => (
        <Reveal key={m.name} delay={i * 90}>
          <div className="zoom-wrap aspect-[4/5]">
            {m.photo ? (
              <Img src={m.photo} alt={m.name} className="h-full w-full" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-beige text-[clamp(44px,6vw,74px)] font-semibold">
                {m.initials}
              </div>
            )}
          </div>
          <p className="mt-5 text-[22px] font-medium">{m.name}</p>
          <p className="mt-1.5 text-[16px] font-medium text-g2">{tr(m.role, lang)}</p>
        </Reveal>
      ))}
    </div>
  );
}
