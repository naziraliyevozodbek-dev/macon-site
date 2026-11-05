import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang, tr } from "@/lib/i18n";
import { ui } from "@/lib/data";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { Section, SectionHeader, Steps } from "@/components/Sections";

export const metadata: Metadata = { title: "Xizmatlar" };

export default async function Services({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = await getContent();
  return (
    <>
      <Hero lang={lang} active="services" image={c.site.images?.services}
        line1={{ uz: "Xizmatlarimiz.", ru: "Наши услуги.", en: "Our services." }}
        line2={{ uz: "Dizayndan topshirishgacha.", ru: "От дизайна до сдачи.", en: "From design to handover." }}
        tagline={{ uz: "Loyihangizning har bosqichi uchun bitta ishonchli jamoa.", ru: "Одна надёжная команда для каждого этапа вашего проекта.", en: "One reliable team for every stage of your project." }} />

      <Section className="!pt-[80px]">
        <SectionHeader lang={lang}
          label={{ uz: "Xizmatlar", ru: "Услуги", en: "Services" }}
          a={{ uz: "Loyihangizning har bosqichi uchun —", ru: "Для каждого этапа вашего проекта —", en: "For every stage of your project —" }}
          b={{ uz: "dizayndan to topshirishgacha bitta jamoa.", ru: "от дизайна до сдачи одна команда.", en: "one team from design to handover." }} />
        <div className="mt-14 border-b border-line md:mt-20">
          {c.services.map((s) => (
            <Reveal key={s.id ?? s.no}>
              <div id={`s${s.no}`} className="grid scroll-mt-24 gap-6 border-t border-line py-10 md:grid-cols-[308px_1fr_1fr] md:gap-10 md:py-[60px]">
                <div>
                  <p className="text-[16px] font-medium text-g1">{s.no}</p>
                  <h3 className="mt-5 text-[clamp(26px,2.6vw,32px)] font-medium">{tr(s.title, lang)}</h3>
                </div>
                <div className="zoom-wrap h-[clamp(240px,30vw,420px)]"><Img className="h-full w-full" alt="" /></div>
                <div className="flex flex-col gap-7">
                  <p className="text-[16px] font-medium text-g2">{tr(s.text, lang)}</p>
                  <ul className="flex flex-col gap-3">
                    {s.items.map((it, i) => (
                      <li key={i} className="flex items-center gap-3 text-[18px] font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />{tr(it, lang)}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/${lang}/contact`} className="group inline-flex w-fit items-center gap-2 text-[18px] font-medium">
                    <span className="u-link">{tr(ui.more, lang)}</span>
                    <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="!pb-[120px]">
        <SectionHeader lang={lang}
          label={{ uz: "Hamkorlik jarayoni", ru: "Процесс работы", en: "How we work" }}
          a={{ uz: "Oddiy va shaffof jarayon.", ru: "Простой и прозрачный процесс.", en: "A simple, transparent process." }}
          b={{ uz: "Tanishuvdan topshirishgacha to‘rt bosqich.", ru: "Четыре этапа от знакомства до сдачи.", en: "Four stages from first meeting to handover." }} />
        <div className="mt-14 md:mt-20"><Steps lang={lang} items={c.steps} /></div>
      </Section>
      <CTA lang={lang} image={c.site.images?.cta} />
    </>
  );
}
