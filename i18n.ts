export const locales = ["uz", "ru", "en"] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = "uz";

export type L = { uz: string; ru?: string; en?: string };

export const isLang = (v: string): v is Lang =>
  (locales as readonly string[]).includes(v);

/** Pick the string for a language, falling back to Uzbek. */
export const tr = (v: L | string | undefined | null, lang: Lang): string => {
  if (!v) return "";
  if (typeof v === "string") return v;
  return v[lang] || v.uz || "";
};

export const langName: Record<Lang, string> = { uz: "UZ", ru: "RU", en: "EN" };
