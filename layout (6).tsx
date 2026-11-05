import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/400.css";
import "../globals.css";

export const metadata: Metadata = { title: "Macon CMS", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
