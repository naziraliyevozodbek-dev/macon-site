import { cacheLife, cacheTag } from "next/cache";
import { anonClient, hasSupabase } from "./supabase";
import {
  advantages, projects, services, site, stats, steps, team, testimonials,
  type Advantage, type Member, type Project, type Service, type Site, type Stat, type Step, type Testimonial,
} from "./data";

export type Content = {
  site: Site;
  projects: Project[];
  services: Service[];
  stats: Stat[];
  advantages: Advantage[];
  testimonials: Testimonial[];
  steps: Step[];
  team: Member[];
};

export const CONTENT_TAG = "content";

const defaults: Content = { site, projects, services, stats, advantages, testimonials, steps, team };

/**
 * All site content. Read from Supabase (edited in the CMS) and cached;
 * the admin panel purges the cache on every save. Falls back to the
 * built-in defaults if the database is unreachable.
 */
export async function getContent(): Promise<Content> {
  "use cache";
  cacheTag(CONTENT_TAG);
  cacheLife("hours");

  if (!hasSupabase) return defaults;
  try {
    const sb = anonClient();
    const [p, i, s] = await Promise.all([
      sb.from("macon_projects").select("*").eq("published", true).order("sort").order("created_at"),
      sb.from("macon_items").select("*").eq("published", true).order("sort"),
      sb.from("macon_settings").select("*").eq("key", "site").maybeSingle(),
    ]);
    if (p.error || i.error || s.error) throw new Error("supabase read failed");

    const items = (c: string) =>
      (i.data ?? []).filter((r) => r.collection === c).map((r) => ({ ...r.data, id: r.id }));

    return {
      site: { ...site, ...(s.data?.value ?? {}) },
      projects: (p.data ?? []).map((r) => ({
        id: r.id, slug: r.slug, title: r.title, category: r.category, location: r.location,
        area: r.area ?? 0, months: r.months ?? 0, year: r.year ?? 0,
        image: r.image, gallery: r.gallery ?? [], description: r.description,
        featured: r.featured,
      })),
      services: items("services"),
      stats: items("stats"),
      advantages: items("advantages"),
      testimonials: items("testimonials"),
      steps: items("steps"),
      team: items("team"),
    };
  } catch {
    return defaults;
  }
}
