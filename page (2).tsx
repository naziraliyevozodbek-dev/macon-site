import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Reveal from "@/components/Reveal";
import {
  Section, SectionHeader, Stats, ServicesList, FeaturedProjects,
  Advantages, Testimonials, Steps,
} from "@/components/Sections";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = await getContent();

  return (
    <>
      <Hero
        lang={lang}
        image={c.site.images?.home}
        line1={{ uz: "Ishonch bilan boshlang.", ru: "Начните с доверия.", en: "Start with confidence." }}
        line2={{ uz: "Natijani Macon bilan quring.", ru: "Создайте результат с Macon.", en: "Build the result with Macon." }}
        tagline={{
          uz: "Har bir loyiha — mas’uliyat, aniqlik va uzoq muddatli natijaga bo‘lgan va’damiz.",
          ru: "Каждый проект — это ответственность, точность и обещание долгосрочного результата.",
          en: "Every project is responsibility, precision and a promise of lasting results.",
        }}
      />

      {/* Statistics */}
      <Section className="!pt-[80px]">
        <Reveal className="grid gap-6 md:grid-cols-[348px_1fr] md:gap-10">
          <div className="flex items-center gap-[5px] self-start text-[16px] font-medium uppercase">
            <span className="h-2.5 w-2.5 rounded-full bg-g1" />
            {{ uz: "Statistika", ru: "Статистика", en: "Statistics" }[lang]}
          </div>
          <p className="text-[clamp(30px,4.2vw,49px)] font-semibold leading-[1.18] tracking-[-0.015em]">
            Macon —{" "}
            <span className="text-g1">
              {{
                uz: "tajriba va ishonchga qurilgan kompaniya. Har bir loyihamiz natijasi mijozlarimizning qoniqishi bilan o‘lchanadi.",
                ru: "компания, построенная на опыте и доверии. Результат каждого проекта измеряется удовлетворённостью клиентов.",
                en: "a company built on experience and trust. The result of every project is measured by our clients’ satisfaction.",
              }[lang]}
            </span>
          </p>
        </Reveal>
        <div className="mt-14 md:mt-[60px]"><Stats lang={lang} items={c.stats} /></div>
      </Section>

      {/* Services */}
      <Section className="md:!py-[60px]">
        <SectionHeader lang={lang}
          label={{ uz: "Xizmatlar", ru: "Услуги", en: "Services" }}
          a={{ uz: "Loyihangizning har bosqichi uchun —", ru: "Для каждого этапа вашего проекта —", en: "For every stage of your project —" }}
          b={{ uz: "dizayndan to topshirishgacha bitta jamoa.", ru: "от дизайна до сдачи одна команда.", en: "one team from design to handover." }} />
        <div className="mt-14 md:mt-20"><ServicesList lang={lang} items={c.services} /></div>
      </Section>

      {/* Featured projects */}
      <Section>
        <SectionHeader lang={lang}
          label={{ uz: "Tanlangan loyihalar", ru: "Избранные проекты", en: "Selected projects" }}
          a={{ uz: "Natija so‘zlardan balandroq.", ru: "Результат говорит громче слов.", en: "Results speak louder than words." }}
          b={{ uz: "Tanlangan loyihalarimiz.", ru: "Наши избранные проекты.", en: "Our selected projects." }} />
        <FeaturedProjects lang={lang} projects={c.projects} />
      </Section>

      {/* Why Macon */}
      <Section>
        <SectionHeader lang={lang}
          label={{ uz: "Nega Macon?", ru: "Почему Macon?", en: "Why Macon?" }}
          a={{ uz: "Nega Macon?", ru: "Почему Macon?", en: "Why Macon?" }}
          b={{ uz: "Sifat, muddat va ishonch — har bir loyihada va’da qilingan darajada.", ru: "Качество, сроки и доверие — на том уровне, который мы обещаем в каждом проекте.", en: "Quality, deadlines and trust — at the level promised in every project." }} />
        <div className="mt-14 md:mt-20"><Advantages lang={lang} items={c.advantages} /></div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader lang={lang}
          label={{ uz: "Mijozlar fikrlari", ru: "Отзывы клиентов", en: "Testimonials" }}
          a={{ uz: "Ishonch — eng yaxshi natija.", ru: "Доверие — лучший результат.", en: "Trust is the best result." }}
          b={{ uz: "Mijozlarimiz biz haqimizda nima deydi.", ru: "Что говорят о нас клиенты.", en: "What our clients say about us." }} />
        <div className="mt-14 md:mt-20"><Testimonials lang={lang} items={c.testimonials} /></div>
      </Section>

      {/* Process */}
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
