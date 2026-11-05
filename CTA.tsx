import Link from "next/link";
import { tr, type Lang } from "@/lib/i18n";
import { ui } from "@/lib/data";
import Img from "./Img";
import Reveal from "./Reveal";
import { ArrowUpRight } from "./Icons";

export default function CTA({ lang, image }: { lang: Lang; image?: string | null }) {
  const t = {
    a: { uz: "Orzularingizni bizga ishoning.", ru: "Доверьте нам свои мечты.", en: "Entrust your dreams to us." },
    b: { uz: "Natijani birga yarating.", ru: "Создадим результат вместе.", en: "Let’s create the result together." },
    p: {
      uz: "Har bir hamkorlikni diqqat bilan tinglashdan boshlaymiz. Maqsadingizni ayting — sizga mos yechimni birgalikda topamiz.",
      ru: "Каждое сотрудничество мы начинаем с внимательного выслушивания. Расскажите о цели — вместе найдём решение.",
      en: "Every collaboration starts with careful listening. Tell us your goal and we’ll find the right solution together.",
    },
  };
  return (
    <section className="relative flex min-h-[640px] items-end overflow-hidden bg-ink text-white md:h-[800px]">
      <Img src={image} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative w-full px-5 pb-16 md:px-10 md:pb-[100px]">
        <Reveal>
          <p className="mb-10 max-w-[409px] text-[20px] font-medium leading-snug lg:ml-[calc(25%+3px)]">{t.p[lang]}</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-bold leading-[1.1] tracking-[-0.02em] text-[clamp(34px,6.4vw,72px)]">
            <span className="block">{t.a[lang]}</span>
            <span className="block text-beige lg:pl-[calc(35%)]">{t.b[lang]}</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <Link href={`/${lang}/contact`} className="group mt-12 inline-flex items-center gap-[5px] text-[18px] font-medium lg:ml-[calc(35%+0px)]">
            <span className="u-link">{tr(ui.startProject, lang)}</span>
            <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
