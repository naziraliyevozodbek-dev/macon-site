-- MACON CMS schema. Supabase → SQL Editor → paste → Run (xavfsiz: qayta ishga tushirsa ham bo'ladi).

create extension if not exists pgcrypto;

create table if not exists macon_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title jsonb not null,
  category text not null default 'villa',
  location jsonb,
  area int,
  months int,
  year int,
  image text,
  gallery text[] not null default '{}',
  description jsonb,
  featured boolean not null default false,
  published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

-- services, stats, advantages, testimonials, steps, team — bitta jadvalda
create table if not exists macon_items (
  id uuid primary key default gen_random_uuid(),
  collection text not null,
  data jsonb not null,
  sort int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists macon_items_collection_idx on macon_items (collection, sort);

create table if not exists macon_settings (
  key text primary key,
  value jsonb not null
);

create table if not exists macon_leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  service text,
  message text,
  lang text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table macon_projects enable row level security;
alter table macon_items    enable row level security;
alter table macon_settings enable row level security;
alter table macon_leads    enable row level security;

drop policy if exists "public read projects" on macon_projects;
create policy "public read projects" on macon_projects for select using (published);
drop policy if exists "public read items" on macon_items;
create policy "public read items" on macon_items for select using (published);
drop policy if exists "public read settings" on macon_settings;
create policy "public read settings" on macon_settings for select using (true);

drop policy if exists "admin all projects" on macon_projects;
create policy "admin all projects" on macon_projects for all to authenticated using (true) with check (true);
drop policy if exists "admin all items" on macon_items;
create policy "admin all items" on macon_items for all to authenticated using (true) with check (true);
drop policy if exists "admin all settings" on macon_settings;
create policy "admin all settings" on macon_settings for all to authenticated using (true) with check (true);

-- Aloqa formasi: hamma yuborishi mumkin, faqat admin o'qiydi
drop policy if exists "anyone can send lead" on macon_leads;
create policy "anyone can send lead" on macon_leads for insert to anon, authenticated
  with check (char_length(name) between 2 and 200 and char_length(phone) between 7 and 50);
drop policy if exists "admin all leads" on macon_leads;
create policy "admin all leads" on macon_leads for all to authenticated using (true) with check (true);

-- Rasmlar uchun ochiq bucket
insert into storage.buckets (id, name, public) values ('macon-media', 'macon-media', true)
  on conflict (id) do nothing;
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'macon-media');
drop policy if exists "media admin write" on storage.objects;
create policy "media admin write" on storage.objects for all to authenticated
  using (bucket_id = 'macon-media') with check (bucket_id = 'macon-media');
