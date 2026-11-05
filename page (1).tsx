import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isLang, tr } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { Section, SectionHeader } from "@/components/Sections";
import ContactForm from "./ContactForm";

export const metadata: Metadata = { title: "Aloqa" };

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { site } = await getContent();
  const L = {
    email: { uz: "Elektron pochta", ru: "Эл. почта", en: "Email" },
    phone: { uz: "Telefon", ru: "Телефон", en: "Phone" },
    address: { uz: "Manzil", ru: "Адрес", en: "Address" },
    hours: { uz: "Ish vaqti", ru: "Часы работы", en: "Opening hours" },
    social: { uz: "Ijtimoiy tarmoqlar", ru: "Соцсети", en: "Social" },
  };
  const row = "flex flex-col gap-3 border-t border-line py-7";
  const lbl = "text-[16px] font-medium text-g2";
  const mapQuery = encodeURIComponent("Sayram ko‘chasi 1B, Mirzo Ulug‘bek tumani, Tashkent");
  return (
    <>
      <Hero lang={lang} active="contact" image={site.images?.contact}
        line1={{ uz: "Aloqaga chiqing.", ru: "Свяжитесь с нами.", en: "Get in touch." }}
        line2={{ uz: "Keling, gaplashamiz.", ru: "Давайте поговорим.", en: "Let’s talk." }}
        tagline={{ uz: "Loyihangiz haqida yozing — 24 soat ichida javob beramiz.", ru: "Расскажите о проекте — ответим в течение 24 часов.", en: "Tell us about your project — we reply within 24 hours." }} />

      <Section className="!pt-[80px]">
        <SectionHeader lang={lang}
          label={{ uz: "Aloqa", ru: "Контакты", en: "Contact" }}
          a={{ uz: "Loyihangiz haqida bizga yozing.", ru: "Напишите нам о вашем проекте.", en: "Tell us about your project." }}
          b={{ uz: "Biz 24 soat ichida javob beramiz.", ru: "Мы ответим в течение 24 часов.", en: "We reply within 24 hours." }} />

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-2 lg:gap-[30px]">
          <Reveal>
            <div className={row}><p className={lbl}>{L.email[lang]}</p>
              <a href={`mailto:${site.email}`} className="u-link w-fit text-[clamp(22px,2.6vw,32px)] font-medium">{site.email}</a></div>
            <div className={row}><p className={lbl}>{L.phone[lang]}</p>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="u-link w-fit text-[clamp(22px,2.6vw,32px)] font-medium">{site.phone}</a></div>
            <div className={row}><p className={lbl}>{L.address[lang]}</p>
              <p className="text-[22px] font-medium">{tr(site.address, lang)}</p></div>
            <div className={row}><p className={lbl}>{L.hours[lang]}</p>
              <p className="text-[22px] font-medium">{tr(site.hours, lang)}</p></div>
            <div className={`${row} border-b`}><p className={lbl}>{L.social[lang]}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {site.socials.map((s) => (
                  <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-[18px] font-medium">
                    <span className="u-link">{s.name}</span><ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div></div>
          </Reveal>
          <Reveal delay={120}><ContactForm lang={lang} /></Reveal>
        </div>
      </Section>

      <Section className="!pb-[120px]">
        <Reveal>
          <iframe
            title="Map"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            className="h-[clamp(300px,40vw,480px)] w-full border-0 grayscale transition duration-700 hover:grayscale-0"
          />
        </Reveal>
      </Section>
    </>
  );
}
