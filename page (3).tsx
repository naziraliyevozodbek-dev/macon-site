import { notFound } from "next/navigation";
import Link from "next/link";
import { isLang, locales, tr } from "@/lib/i18n";
import { projects, ui } from "@/lib/data";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { Section, SectionHeader, ProjectCard } from "@/components/Sections";

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return { title: p && isLang(lang) ? tr(p.title, lang) : "Loyiha" };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const m = lang === "uz" ? "oy" : lang === "ru" ? "мес." : "months";
  const meta = [
    [{ uz: "Joylashuv", ru: "Расположение", en: "Location" }[lang], tr(p.location, lang)],
    [{ uz: "Maydon", ru: "Площадь", en: "Area" }[lang], `${p.area} m²`],
    [{ uz: "Muddat", ru: "Срок", en: "Duration" }[lang], `${p.months} ${m}`],
    [{ uz: "Yil", ru: "Год", en: "Year" }[lang], String(p.year)],
  ];
  const gallery = p.gallery.length ? p.gallery : [null, null, null, null];

  return (
    <>
      <Hero lang={lang} active="projects" image={p.image}
        line1={p.title} line2={{ uz: `${tr(p.location, lang)} · ${p.year}`, ru: `${tr(p.location, lang)} · ${p.year}`, en: `${tr(p.location, lang)} · ${p.year}` }}
        tagline={{ uz: "Tabiat, shaffoflik va aniq geometriya uyg‘unligi.", ru: "Гармония природы, прозрачности и точной геометрии.", en: "A harmony of nature, transparency and precise geometry." }} />

      <Section className="!pt-[80px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-[30px] lg:grid-cols-4">
          {meta.map(([k, v], idx) => (
            <Reveal key={k} delay={idx * 80} className="border-t border-line pt-7">
              <p className="text-[16px] font-medium text-g2">{k}</p>
              <p className="mt-3 text-[clamp(22px,2.4vw,32px)] font-medium">{v}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader lang={lang}
          label={{ uz: "Loyiha haqida", ru: "О проекте", en: "About the project" }}
          a={tr(p.title, lang) + "."} b={tr(p.description, lang)} />
      </Section>

      <Section className="!py-0">
        <div className="grid gap-[30px]">
          <Reveal><div className="zoom-wrap h-[clamp(260px,50vw,720px)]"><Img src={p.image} className="h-full w-full" alt="" /></div></Reveal>
          <div className="grid gap-[30px] md:grid-cols-2">
            {gallery.map((g, k) => (
              <Reveal key={k}><div className="zoom-wrap h-[clamp(220px,30vw,440px)]"><Img src={g} className="h-full w-full" alt="" /></div></Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="!pb-[120px]">
        <SectionHeader lang={lang}
          label={{ uz: "Keyingi loyiha", ru: "Следующий проект", en: "Next project" }}
          a={tr(next.title, lang) + "."} b={{ uz: "Yana bir muvaffaqiyatli loyiha.", ru: "Ещё один успешный проект.", en: "Another successful project." }[lang]} />
        <div className="mt-14 md:mt-20"><ProjectCard p={next} lang={lang} h={560} /></div>
        <Link href={`/${lang}/projects`} className="group mt-14 inline-flex items-center gap-2 text-[18px] font-medium">
          <span className="u-link">{tr(ui.viewAll, lang)}</span>
          <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Section>
      <CTA lang={lang} />
    </>
  );
}
