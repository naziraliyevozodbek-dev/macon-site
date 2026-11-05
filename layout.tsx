import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "../../globals.css";
import { isLang, locales } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: { default: "Macon Company", template: "%s · Macon Company" },
  description:
    "Macon — arxitektura, interyer, landshaft va qurilish: tajriba va ishonchga qurilgan kompaniya.",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const { site } = await getContent();
  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} site={site} />
        <main>{children}</main>
        <Footer lang={lang} site={site} />
      </body>
    </html>
  );
}
