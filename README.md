# Macon Company sayti

Next.js 16 + Tailwind 4 + Supabase. Tillar: UZ / RU / EN. Boshqaruv paneli: `/admin`.

## Ishga tushirish
1. `npm install`
2. `.env.local` yarating:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   ```
3. Supabase → SQL Editor → `supabase/schema.sql` ni ishga tushiring.
4. Supabase → Authentication → Users → "Add user" (admin email + parol). Providers → Email → **"Allow new users to sign up" ni o'chiring**.
5. `npm run dev` → http://localhost:3000/admin → kiring → "Namunaviy kontentni yuklash".

## Vercel
GitHub'ga push qiling → vercel.com → Import → o'sha 2 ta env o'zgaruvchini qo'shing → Deploy.

## Tuzilma
- `app/(site)/[lang]/*` — ommaviy sahifalar
- `app/admin` + `components/admin` — CMS
- `lib/data.ts` — Supabase bo'sh bo'lganda ishlatiladigan standart kontent
- `supabase/schema.sql` — jadvallar, RLS, rasm bucket'i
