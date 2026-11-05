import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import { Section, SectionHeader } from "@/components/Sections";
import ProjectsGrid from "./ProjectsGrid";

export const metadata: Metadata = { title: "Loyihalar" };

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <>
      <Hero lang={lang} active="projects"
        line1={{ uz: "Loyihalar portfeli.", ru: "Портфолио проектов.", en: "Project portfolio." }}
        line2={{ uz: "Natijalar o‘zi gapiradi.", ru: "Результаты говорят сами.", en: "The results speak for themselves." }}
        tagline={{ uz: "Villa, interyer va landshaft — har bir loyiha o‘z hikoyasiga ega.", ru: "Виллы, интерьеры и ландшафт — у каждого проекта своя история.", en: "Villas, interiors and landscape — every project has its own story." }} />
      <Section className="!pt-[80px] !pb-[120px]">
        <SectionHeader lang={lang}
          label={{ uz: "Loyihalar", ru: "Проекты", en: "Projects" }}
          a={{ uz: "Barcha loyihalar.", ru: "Все проекты.", en: "All projects." }}
          b={{ uz: "Turi bo‘yicha saralang.", ru: "Выберите по типу.", en: "Filter by type." }} />
        <ProjectsGrid lang={lang} />
      </Section>
      <CTA lang={lang} />
    </>
  );
}
