import Link from "next/link";
import { tr, type Lang } from "@/lib/i18n";
import { ui, type Site } from "@/lib/data";
import { Logo } from "./Icons";
import BackToTop from "./BackToTop";
import Year from "./Year";

export default function Footer({ lang, site }: { lang: Lang; site: Site }) {
  const col = "flex flex-col gap-[14px] text-[18px] font-medium text-white";
  const label = "text-[16px] text-g1";
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[308px_300px_300px_300px] lg:gap-[40px] xl:justify-between">
          <div>
            <Logo />
            <p className="mt-6 max-w-[260px] text-[16px] font-medium text-g1">{tr(ui.tagline, lang)}</p>
          </div>
          <div className={col}>
            <p className={label}>{tr(ui.pages, lang)}</p>
            {(["about", "projects", "services", "contact"] as const).map((k) => (
              <Link key={k} href={`/${lang}/${k}`} className="u-link w-fit">{tr(ui.nav[k], lang)}</Link>
            ))}
          </div>
          <div className={col}>
            <p className={label}>{tr(ui.contactLabel, lang)}</p>
            <a href={`mailto:${site.email}`} className="u-link w-fit">{site.email}</a>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="u-link w-fit">{site.phone}</a>
            <p>{tr(site.address, lang)}</p>
          </div>
          <div className={col}>
            <p className={label}>{tr(ui.socials, lang)}</p>
            {site.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="u-link w-fit">{s.name}</a>
            ))}
          </div>
        </div>

        <div className="mt-16 select-none text-white/20 md:mt-[100px]"><Logo className="h-auto w-full" /></div>

        <div className="mt-8 flex items-center justify-between border-t border-white/20 py-6 text-[16px] font-medium text-g1 md:mt-12">
          <p>© <Year /> Macon Company. {tr(ui.rights, lang)}</p>
          <BackToTop label={tr(ui.toTop, lang)} />
        </div>
      </div>
    </footer>
  );
}
