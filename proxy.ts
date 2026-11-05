import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["uz", "ru", "en"];
const defaultLocale = "uz";

function pickLocale(req: NextRequest) {
  const header = req.headers.get("accept-language") || "";
  for (const part of header.split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    if (locales.includes(code)) return code;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;
  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // skip internals, API, admin, files with extensions
    "/((?!_next|api|admin|.*\\..*).*)",
  ],
};
