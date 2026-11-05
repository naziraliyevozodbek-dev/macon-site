import Link from "next/link";
import { tr, type Lang, type L } from "@/lib/i18n";
import { ui } from "@/lib/data";
import Img from "./Img";

const navKeys = ["about", "projects", "services", "contact"] as const;

export default function Hero({
  lang,
  image,
  line1,
  line2,
  tagline,
  active,
}: {
  lang: Lang;
  image?: string | null;
  line1: L;
  line2: L;
  tagline: L;
  active?: (typeof navKeys)[number];
}) {
  return (
    <section className="relative flex min-h-[560px] h-[100svh] max-h-[800px] items-end overflow-hidden bg-ink text-white md:h-[800px]">
      <Img src={image} className="absolute inset-0 h-full w-full scale-105 animate-[heroZoom_14s_ease-out_forwards]" />
      <div className="absolute inset-0 bg-black/30" />

      {/* decorative grid lines (as in the design) */}
      <span className="pointer-events-none absolute left-[26.3%] top-0 hidden h-[483px] w-px bg-white/60 lg:block" />
      <span className="pointer-events-none absolute left-[calc(75%-7px)] top-[300px] hidden h-[121px] w-px bg-white/60 lg:block" />

      <nav className="absolute right-10 top-[300px] hidden flex-col gap-[5px] text-[16px] font-medium lg:flex" style={{ left: "calc(75% + 3px)" }}>
        {navKeys.map((k) => (
          <Link
            key={k}
            href={`/${lang}/${k}`}
            className={`u-link w-fit transition-opacity ${k === active ? "opacity-100" : "opacity-60 hover:opacity-100"}`}
          >
            {tr(ui.nav[k], lang)}
          </Link>
        ))}
      </nav>

      <p className="absolute hidden max-w-[283px] text-[20px] font-medium leading-snug lg:block" style={{ left: "calc(25% + 28px)", top: 411 }}>
        {tr(tagline, lang)}
      </p>

      <div className="relative w-full px-5 pb-12 md:px-10 md:pb-[77px]">
        <h1 className="font-bold leading-[1.1] tracking-[-0.02em]">
          <span className="block animate-[riseIn_1s_0.15s_both_cubic-bezier(.2,.7,.2,1)] text-[clamp(36px,7vw,72px)] lg:text-[clamp(56px,5vw,72px)]">
            {tr(line1, lang)}
          </span>
          <span className="block animate-[riseIn_1s_0.35s_both_cubic-bezier(.2,.7,.2,1)] text-[clamp(36px,7vw,72px)] text-beige lg:whitespace-nowrap lg:text-[clamp(56px,5vw,72px)] lg:pl-[calc(25%-16px)]">
            {tr(line2, lang)}
          </span>
        </h1>
        <p className="mt-6 max-w-[420px] text-lg font-medium lg:hidden">{tr(tagline, lang)}</p>
      </div>
    </section>
  );
}
