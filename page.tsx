import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Img from "@/components/Img";
import Reveal from "@/components/Reveal";
import { Section, SectionHeader, Stats, Advantages, Team } from "@/components/Sections";

export const metadata: Metadata = { title: "Biz haqimizda" };

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = await getContent();
  return (
    <>
      <Hero lang={lang} active="about" image={c.site.images?.about}
        line1={{ uz: "Biz haqimizda.", ru: "О нас.", en: "About us." }}
        line2={{ uz: "Ishonch va tajriba jamoasi.", ru: "Команда опыта и доверия.", en: "A team of trust and experience." }}
        tagline={{ uz: "2020-yildan beri g‘oyani aniq natijaga aylantiramiz.", ru: "С 2020 года превращаем идею в точный результат.", en: "Since 2020 we turn ideas into precise results." }} />

      <Section className="!pt-[80px]">
        <SectionHeader lang={lang}
          label={{ uz: "Kompaniya haqida", ru: "О компании", en: "About the company" }}
          a={{ uz: "Macon — arxitektura, interyer va qurilishni bir joyda birlashtirgan jamoa.", ru: "Macon — команда, объединяющая архитектуру, интерьер и строительство.", en: "Macon — a team that brings architecture, interiors and construction together." }}
          b={{ uz: "Har bir loyiha mijoz bilan uzoq muddatli ishonchning boshlanishi.", ru: "Каждый проект — начало долгого доверия с клиентом.", en: "Every project is the start of long-term trust with the client." }} />
        <Reveal className="mt-14 md:mt-20">
          <div className="zoom-wrap h-[clamp(280px,46vw,640px)]"><Img className="h-full w-full" alt="" /></div>
        </Reveal>
      </Section>

      <Section><Stats lang={lang} items={c.stats} /></Section>

      <Section>
        <SectionHeader lang={lang}
          label={{ uz: "Nega Macon?", ru: "Почему Macon?", en: "Why Macon?" }}
          a={{ uz: "Nega Macon?", ru: "Почему Macon?", en: "Why Macon?" }}
          b={{ uz: "Sifat, muddat va ishonch — har bir loyihada va’da qilingan darajada.", ru: "Качество, сроки и доверие — на том уровне, который мы обещаем.", en: "Quality, deadlines and trust — as promised in every project." }} />
        <div className="mt-14 md:mt-20"><Advantages lang={lang} items={c.advantages} /></div>
      </Section>

      <Section className="!pb-[120px]">
        <SectionHeader lang={lang}
          label={{ uz: "Jamoa", ru: "Команда", en: "Team" }}
          a={{ uz: "Tajribali mutaxassislar.", ru: "Опытные специалисты.", en: "Experienced specialists." }}
          b={{ uz: "Har bir loyiha ortida professional jamoa turadi.", ru: "За каждым проектом стоит профессиональная команда.", en: "A professional team stands behind every project." }} />
        <div className="mt-14 md:mt-20"><Team lang={lang} items={c.team} /></div>
      </Section>

      <CTA lang={lang} image={c.site.images?.cta} />
    </>
  );
}
