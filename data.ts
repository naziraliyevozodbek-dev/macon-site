import type { L } from "./i18n";

/* ---------- Types (mirror the Supabase tables the CMS edits) ---------- */
export type Project = {
  id?: string;
  slug: string;
  title: L;
  category: "villa" | "interior" | "landscape" | "residential";
  location: L;
  area: number; // m²
  months: number;
  year: number;
  image: string | null; // public URL, null → placeholder
  gallery: string[];
  description: L;
  featured: boolean;
};

export type Service = { id?: string; no: string; title: L; text: L; items: L[] };
export type Stat = { id?: string; value: string; plus: boolean; title: L; text: L };
export type Advantage = { id?: string; no: string; title: L; text: L };
export type Testimonial = { id?: string; initials: string; name: string; project: L; text: L };
export type Step = { id?: string; no: string; title: L; text: L };
export type Member = { id?: string; initials: string; name: string; role: L; photo: string | null };

/* ---------- Site settings ---------- */
export type Site = {
  email: string;
  phone: string;
  address: L;
  hours: L;
  socials: { name: string; href: string }[];
  /** Hero / CTA background photos, keyed by page (uploaded in the CMS). */
  images?: Partial<Record<"home" | "about" | "projects" | "services" | "contact" | "cta", string>>;
};

export const site: Site = {
  email: "makoncompany@gmail.com",
  phone: "+998 99 999 91 84",
  address: {
    uz: "Mirzo Ulug‘bek tumani, Sayram ko‘chasi (Sayram), 1B",
    ru: "Мирзо-Улугбекский район, улица Сайрам (Сайрам), 1Б",
    en: "Mirzo Ulugbek district, Sayram street (Sayram), 1B",
  },
  hours: {
    uz: "Dushanba – Shanba, 09:00 – 18:00",
    ru: "Понедельник – Суббота, 09:00 – 18:00",
    en: "Monday – Saturday, 09:00 – 18:00",
  },
  socials: [
    { name: "Instagram", href: "#" },
    { name: "Telegram", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "YouTube", href: "#" },
  ],
};

/* ---------- Projects ---------- */
export const projects: Project[] = [
  {
    slug: "villa-sayram",
    title: { uz: "Villa «Sayram»", ru: "Вилла «Сайрам»", en: "Villa “Sayram”" },
    category: "villa",
    location: { uz: "Sayram, Toshkent", ru: "Сайрам, Ташкент", en: "Sayram, Tashkent" },
    area: 620, months: 9, year: 2025, image: null, gallery: [],
    description: {
      uz: "Mijoz oilasi uchun yaratilgan bu villa tabiat bilan uzviy bog‘langan: binoning har bir xonasidan bog‘ va tog‘ manzarasi ochiladi. Fasadda tabiiy tosh, yog‘och va shisha uyg‘unlashtirilgan. Loyiha 9 oy ichida kelishilgan smeta va muddatda topshirildi.",
      ru: "Вилла для семьи клиента гармонично вписана в природу: из каждой комнаты открывается вид на сад и горы. В фасаде сочетаются природный камень, дерево и стекло. Проект сдан за 9 месяцев в рамках согласованной сметы.",
      en: "A villa created for the client’s family, closely connected to nature: every room opens onto garden and mountain views. The façade combines natural stone, timber and glass. Delivered in 9 months, on the agreed budget.",
    },
    featured: true,
  },
  {
    slug: "interyer-olmazor",
    title: { uz: "Interyer «Olmazor»", ru: "Интерьер «Олмазор»", en: "Interior “Olmazor”" },
    category: "interior",
    location: { uz: "Olmazor, Toshkent", ru: "Олмазор, Ташкент", en: "Olmazor, Tashkent" },
    area: 210, months: 5, year: 2024, image: null, gallery: [],
    description: {
      uz: "Issiq yog‘och, yumshoq yoritish va aniq geometriya asosidagi yagona interyer yechimi.",
      ru: "Цельное интерьерное решение на основе тёплого дерева, мягкого света и чёткой геометрии.",
      en: "A unified interior built on warm timber, soft lighting and precise geometry.",
    },
    featured: true,
  },
  {
    slug: "interyer-yunusobod",
    title: { uz: "Interyer «Yunusobod»", ru: "Интерьер «Юнусабад»", en: "Interior “Yunusobod”" },
    category: "interior",
    location: { uz: "Yunusobod, Toshkent", ru: "Юнусабад, Ташкент", en: "Yunusobod, Tashkent" },
    area: 180, months: 4, year: 2023, image: null, gallery: [],
    description: {
      uz: "Yorug‘lik va tabiiy matolarga e’tibor qaratilgan keng va sokin interyer.",
      ru: "Просторный и спокойный интерьер с акцентом на свет и натуральные ткани.",
      en: "A spacious, calm interior focused on light and natural fabrics.",
    },
    featured: true,
  },
  {
    slug: "turar-joy-chilonzor",
    title: { uz: "Turar-joy «Chilonzor»", ru: "Жилой дом «Чиланзар»", en: "Residence “Chilonzor”" },
    category: "residential",
    location: { uz: "Chilonzor, Toshkent", ru: "Чиланзар, Ташкент", en: "Chilonzor, Tashkent" },
    area: 340, months: 7, year: 2023, image: null, gallery: [],
    description: { uz: "Zamonaviy turar-joy loyihasi.", ru: "Современный жилой проект.", en: "A modern residential project." },
    featured: false,
  },
  {
    slug: "landshaft-zangiota",
    title: { uz: "Landshaft «Zangiota»", ru: "Ландшафт «Зангиата»", en: "Landscape “Zangiota”" },
    category: "landscape",
    location: { uz: "Zangiota, Toshkent vil.", ru: "Зангиата, Ташкентская обл.", en: "Zangiota, Tashkent region" },
    area: 1200, months: 3, year: 2024, image: null, gallery: [],
    description: { uz: "Hovli va atrofni uy bilan uyg‘unlashtiruvchi landshaft loyihasi.", ru: "Ландшафтный проект, объединяющий двор и дом.", en: "A landscape project that blends the grounds with the house." },
    featured: false,
  },
  {
    slug: "villa-qibray",
    title: { uz: "Villa «Qibray»", ru: "Вилла «Кибрай»", en: "Villa “Qibray”" },
    category: "villa",
    location: { uz: "Qibray, Toshkent vil.", ru: "Кибрай, Ташкентская обл.", en: "Qibray, Tashkent region" },
    area: 480, months: 8, year: 2022, image: null, gallery: [],
    description: { uz: "Oila uchun keng villa.", ru: "Просторная вилла для семьи.", en: "A spacious family villa." },
    featured: false,
  },
];

/* ---------- Home / shared content ---------- */
export const services: Service[] = [
  {
    no: "01",
    title: { uz: "Arxitektura loyihasi", ru: "Архитектурное проектирование", en: "Architectural design" },
    text: {
      uz: "Zamonaviy va funksional uy hamda binolar loyihasi: eskiz, rejalar va ishchi hujjatlar.",
      ru: "Современные и функциональные проекты домов и зданий: эскиз, планы и рабочая документация.",
      en: "Modern, functional houses and buildings: sketches, plans and working drawings.",
    },
    items: [
      { uz: "Eskiz va konsepsiya", ru: "Эскиз и концепция", en: "Sketch and concept" },
      { uz: "Arxitektura rejalari", ru: "Архитектурные планы", en: "Architectural plans" },
      { uz: "3D vizualizatsiya", ru: "3D-визуализация", en: "3D visualisation" },
      { uz: "Ishchi hujjatlar", ru: "Рабочая документация", en: "Working drawings" },
    ],
  },
  {
    no: "02",
    title: { uz: "Interyer dizayn", ru: "Дизайн интерьера", en: "Interior design" },
    text: {
      uz: "Har bir xona uchun yagona uslub: rejalashtirish, materiallar va mebel tanlovi.",
      ru: "Единый стиль для каждой комнаты: планировка, материалы и подбор мебели.",
      en: "One consistent style for every room: planning, materials and furniture.",
    },
    items: [
      { uz: "Rejalashtirish", ru: "Планировка", en: "Space planning" },
      { uz: "Materiallar tanlovi", ru: "Подбор материалов", en: "Material selection" },
      { uz: "Mebel va yoritish", ru: "Мебель и освещение", en: "Furniture and lighting" },
      { uz: "Muallif nazorati", ru: "Авторский надзор", en: "Author supervision" },
    ],
  },
  {
    no: "03",
    title: { uz: "Landshaft dizayni", ru: "Ландшафтный дизайн", en: "Landscape design" },
    text: {
      uz: "Hovli va atrofni uy bilan uyg‘unlashtiruvchi ko‘kalamzorlashtirish loyihasi.",
      ru: "Озеленение, гармонично объединяющее двор и дом.",
      en: "Planting and grounds that tie the yard and the house together.",
    },
    items: [
      { uz: "Hudud rejasi", ru: "План территории", en: "Site plan" },
      { uz: "Ko‘kalamzorlashtirish", ru: "Озеленение", en: "Planting" },
      { uz: "Yoritish va sug‘orish", ru: "Освещение и полив", en: "Lighting and irrigation" },
      { uz: "Obodonlashtirish", ru: "Благоустройство", en: "Landscaping works" },
    ],
  },
  {
    no: "04",
    title: { uz: "Qurilish va nazorat", ru: "Строительство и контроль", en: "Construction and supervision" },
    text: {
      uz: "Loyihani kelishilgan muddat va sifatda amalga oshirish hamda doimiy nazorat.",
      ru: "Реализация проекта в согласованные сроки и с нужным качеством под постоянным контролем.",
      en: "Delivering the project on schedule and to quality, under constant supervision.",
    },
    items: [
      { uz: "Qurilish ishlari", ru: "Строительные работы", en: "Construction works" },
      { uz: "Texnik nazorat", ru: "Технический надзор", en: "Technical supervision" },
      { uz: "Smeta va hisobotlar", ru: "Смета и отчёты", en: "Budget and reports" },
      { uz: "Topshirish va kafolat", ru: "Сдача и гарантия", en: "Handover and warranty" },
    ],
  },
];

export const stats: Stat[] = [
  { value: "2020", plus: false, title: { uz: "Asos solingan yil", ru: "Год основания", en: "Year founded" }, text: { uz: "Qisqa fursatda ishonch qozongan", ru: "Заслужили доверие за короткий срок", en: "Earned trust in a short time" } },
  { value: "30", plus: true, title: { uz: "Yakunlangan loyihalar", ru: "Завершённых проектов", en: "Completed projects" }, text: { uz: "Har birida mehr mujassam", ru: "В каждом — частичка души", en: "Made with care" } },
  { value: "100", plus: true, title: { uz: "Mamnun mijozlar", ru: "Довольных клиентов", en: "Happy clients" }, text: { uz: "Ular bizga ishonishadi", ru: "Они нам доверяют", en: "They trust us" } },
  { value: "16", plus: true, title: { uz: "Tajribali mutaxassislar", ru: "Опытных специалистов", en: "Experienced specialists" }, text: { uz: "Professional jamoa", ru: "Профессиональная команда", en: "A professional team" } },
];

export const advantages: Advantage[] = [
  { no: "01", title: { uz: "Sifat", ru: "Качество", en: "Quality" }, text: { uz: "Materiallar, texnologiya va ishlov bosqichlarining har birida yuqori standartlar.", ru: "Высокие стандарты на каждом этапе: материалы, технологии, отделка.", en: "High standards at every stage: materials, technology and finishing." } },
  { no: "02", title: { uz: "Muddat", ru: "Сроки", en: "Deadlines" }, text: { uz: "Kelishilgan jadvalga qat’iy amal qilamiz va loyihani o‘z vaqtida topshiramiz.", ru: "Строго следуем графику и сдаём проект вовремя.", en: "We keep to the agreed schedule and hand over on time." } },
  { no: "03", title: { uz: "Tajriba", ru: "Опыт", en: "Experience" }, text: { uz: "2020-yildan beri 30 dan ortiq yakunlangan loyiha va 16 nafar mutaxassis jamoasi.", ru: "С 2020 года — более 30 завершённых проектов и команда из 16 специалистов.", en: "Since 2020: 30+ completed projects and a team of 16 specialists." } },
  { no: "04", title: { uz: "Shaffoflik", ru: "Прозрачность", en: "Transparency" }, text: { uz: "Aniq smeta, ochiq hisobotlar va har bosqichda mijoz bilan doimiy aloqa.", ru: "Чёткая смета, открытая отчётность и постоянная связь с клиентом.", en: "A clear budget, open reporting and constant contact at every stage." } },
];

export const testimonials: Testimonial[] = [
  { initials: "JK", name: "Jasur Karimov", project: { uz: "Villa egasi, Sayram", ru: "Владелец виллы, Сайрам", en: "Villa owner, Sayram" }, text: { uz: "Macon jamoasi loyihani kelishilgan muddatda, va’da qilingan sifatda topshirdi. Natija kutganimizdan ham yaxshi chiqdi.", ru: "Команда Macon сдала проект в срок и с обещанным качеством. Результат превзошёл ожидания.", en: "The Macon team delivered on time and to the promised quality. The result exceeded our expectations." } },
  { initials: "DR", name: "Dilnoza Rahimova", project: { uz: "Turar-joy loyihasi, Olmazor", ru: "Жилой проект, Олмазор", en: "Residential project, Olmazor" }, text: { uz: "Har bosqichda hisobot berib turishdi. Smeta o‘zgarmadi, shuning uchun butun jarayon davomida xotirjam bo‘ldik.", ru: "На каждом этапе нам давали отчёт. Смета не менялась, поэтому весь процесс мы были спокойны.", en: "They reported at every stage. The budget never changed, so we were at ease throughout." } },
  { initials: "AY", name: "Akmal Yusupov", project: { uz: "Interyer loyihasi, Yunusobod", ru: "Интерьерный проект, Юнусабад", en: "Interior project, Yunusobod" }, text: { uz: "Interyer va qurilishni bitta jamoa bajargani vaqtimizni tejadi. Albatta yana hamkorlik qilamiz.", ru: "Интерьер и строительство выполнила одна команда — это сэкономило нам время. Обязательно будем сотрудничать снова.", en: "One team handling interior and construction saved us time. We will definitely work together again." } },
];

export const steps: Step[] = [
  { no: "01", title: { uz: "Tanishuv va topshiriq", ru: "Знакомство и задание", en: "Briefing" }, text: { uz: "Istaklaringizni tinglaymiz, hudud va byudjetni o‘rganamiz.", ru: "Выслушиваем ваши пожелания, изучаем участок и бюджет.", en: "We listen to your wishes and study the site and budget." } },
  { no: "02", title: { uz: "Loyiha va vizualizatsiya", ru: "Проект и визуализация", en: "Design and visuals" }, text: { uz: "Eskiz, 3D vizualizatsiya va ishchi hujjatlarni birgalikda tasdiqlaymiz.", ru: "Совместно утверждаем эскиз, 3D-визуализацию и рабочую документацию.", en: "We approve the sketch, 3D visuals and working drawings together." } },
  { no: "03", title: { uz: "Qurilish va nazorat", ru: "Строительство и контроль", en: "Construction" }, text: { uz: "Ishlar jadval bo‘yicha olib boriladi, hisobotlar muntazam taqdim etiladi.", ru: "Работы идут по графику, отчёты предоставляются регулярно.", en: "Work follows the schedule, with regular reports." } },
  { no: "04", title: { uz: "Topshirish va kafolat", ru: "Сдача и гарантия", en: "Handover and warranty" }, text: { uz: "Obyekt kalitga tayyor topshiriladi, kafolat va xizmat ko‘rsatish davom etadi.", ru: "Объект сдаётся «под ключ», гарантия и обслуживание продолжаются.", en: "The property is handed over turnkey; warranty and service continue." } },
];

export const team: Member[] = [
  { initials: "BA", name: "Bekzod Aliyev", role: { uz: "Bosh arxitektor", ru: "Главный архитектор", en: "Chief architect" }, photo: null },
  { initials: "MS", name: "Madina Sobirova", role: { uz: "Interyer dizayner", ru: "Дизайнер интерьера", en: "Interior designer" }, photo: null },
  { initials: "SQ", name: "Sherzod Qodirov", role: { uz: "Qurilish rahbari", ru: "Руководитель строительства", en: "Construction manager" }, photo: null },
  { initials: "NE", name: "Nigora Ergasheva", role: { uz: "Loyiha menejeri", ru: "Менеджер проектов", en: "Project manager" }, photo: null },
];

/* ---------- UI strings ---------- */
export const ui = {
  nav: {
    about: { uz: "Biz haqimizda", ru: "О нас", en: "About" },
    projects: { uz: "Loyihalar", ru: "Проекты", en: "Projects" },
    services: { uz: "Xizmatlar", ru: "Услуги", en: "Services" },
    contact: { uz: "Aloqa", ru: "Контакты", en: "Contact" },
  },
  startProject: { uz: "Loyihani boshlash", ru: "Начать проект", en: "Start a project" },
  viewAll: { uz: "Barcha loyihalarni ko‘rish", ru: "Смотреть все проекты", en: "View all projects" },
  more: { uz: "Batafsil", ru: "Подробнее", en: "Details" },
  tagline: { uz: "Ishonch bilan boshlang. Natijani Macon bilan quring.", ru: "Начните с доверия. Создайте результат вместе с Macon.", en: "Start with confidence. Build the result with Macon." },
  rights: { uz: "Barcha huquqlar himoyalangan.", ru: "Все права защищены.", en: "All rights reserved." },
  toTop: { uz: "Yuqoriga", ru: "Наверх", en: "Back to top" },
  pages: { uz: "Sahifalar", ru: "Страницы", en: "Pages" },
  contactLabel: { uz: "Aloqa", ru: "Контакты", en: "Contact" },
  socials: { uz: "Ijtimoiy tarmoqlar", ru: "Соцсети", en: "Social" },
};
