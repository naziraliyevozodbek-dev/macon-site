"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales, langName, tr, type Lang } from "@/lib/i18n";
import { ui, type Site } from "@/lib/data";
import { ArrowUpRight, ChevronDown, Logo } from "./Icons";

const links = [
  ["about", "about"],
  ["projects", "projects"],
  ["services", "services"],
  ["contact", "contact"],
] as const;

export default function Header({ lang, site }: { lang: Lang; site: Site }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const swap = (l: Lang) => path.replace(/^\/(uz|ru|en)/, `/${l}`) || `/${l}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-md py-3" : "py-[30px]"
      }`}
    >
      <div className="relative mx-auto flex h-[24px] max-w-[1440px] items-start justify-between px-5 md:px-10">
        <Link href={`/${lang}`} aria-label="Macon" className="mt-[-3px]" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <div className="absolute top-0 hidden w-[157px] text-[14px] font-medium leading-tight lg:block" style={{ left: "calc(25% + 28px)" }}>
          {tr(site.address, lang)}
        </div>
        <div className="absolute top-0 hidden text-[14px] font-medium leading-snug lg:block" style={{ left: "calc(50% + 15px)" }}>
          <a href={`mailto:${site.email}`} className="u-link block">{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="u-link block">{site.phone}</a>
        </div>

        <div className="absolute top-0 hidden md:block" style={{ left: "calc(75% + 3px)" }}>
          <button
            onClick={() => setLangOpen((v) => !v)}
            className="flex items-center gap-1 text-[14px] font-medium"
            aria-haspopup="listbox"
            aria-expanded={langOpen}
          >
            {langName[lang]} <ChevronDown />
          </button>
          {langOpen && (
            <ul className="absolute left-0 top-7 min-w-[64px] rounded bg-ink/95 py-2 text-[14px] shadow-xl">
              {locales.map((l) => (
                <li key={l}>
                  <Link
                    href={swap(l)}
                    onClick={() => setLangOpen(false)}
                    className={`block px-4 py-1.5 hover:bg-white/10 ${l === lang ? "text-beige" : ""}`}
                  >
                    {langName[l]}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          href={`/${lang}/contact`}
          className="hidden items-center gap-[5px] text-[18px] font-medium md:flex group"
        >
          <span className="u-link">{tr(ui.startProject, lang)}</span>
          <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className="block h-px w-7 bg-white transition-transform" style={{ transform: open ? "translateY(4px) rotate(45deg)" : "" }} />
          <span className="mt-2 block h-px w-7 bg-white transition-transform" style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "" }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-0 -z-10 flex flex-col justify-center gap-6 bg-ink px-5 pt-20 transition-all duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {links.map(([key]) => (
          <Link
            key={key}
            href={`/${lang}/${key}`}
            onClick={() => setOpen(false)}
            className="text-4xl font-semibold"
          >
            {tr(ui.nav[key], lang)}
          </Link>
        ))}
        <div className="mt-4 flex gap-4 text-sm">
          {locales.map((l) => (
            <Link key={l} href={swap(l)} onClick={() => setOpen(false)} className={l === lang ? "text-beige" : "text-white/60"}>
              {langName[l]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
