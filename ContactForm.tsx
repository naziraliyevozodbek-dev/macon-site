"use client";
import { useState } from "react";
import { ArrowUpRight } from "@/components/Icons";
import type { Lang } from "@/lib/i18n";

const T = {
  title: { uz: "Loyihani boshlash", ru: "Начать проект", en: "Start a project" },
  name: { uz: "Ismingiz", ru: "Ваше имя", en: "Your name" },
  namePh: { uz: "Ism va familiya", ru: "Имя и фамилия", en: "Full name" },
  phone: { uz: "Telefon raqami", ru: "Номер телефона", en: "Phone number" },
  service: { uz: "Xizmat turi", ru: "Тип услуги", en: "Service" },
  choose: { uz: "Tanlang", ru: "Выберите", en: "Choose" },
  message: { uz: "Xabaringiz", ru: "Сообщение", en: "Message" },
  messagePh: { uz: "Loyiha haqida qisqacha yozing", ru: "Коротко опишите проект", en: "Briefly describe your project" },
  send: { uz: "Yuborish", ru: "Отправить", en: "Send" },
  sending: { uz: "Yuborilmoqda…", ru: "Отправка…", en: "Sending…" },
  consent: { uz: "Yuborish orqali siz maxfiylik siyosatiga rozilik bildirasiz.", ru: "Отправляя форму, вы соглашаетесь с политикой конфиденциальности.", en: "By sending, you agree to the privacy policy." },
  ok: { uz: "Rahmat! Arizangiz qabul qilindi. 24 soat ichida bog‘lanamiz.", ru: "Спасибо! Заявка принята. Свяжемся в течение 24 часов.", en: "Thank you! We got your request and will reply within 24 hours." },
  err: { uz: "Xatolik yuz berdi. Qayta urinib ko‘ring.", ru: "Произошла ошибка. Попробуйте ещё раз.", en: "Something went wrong. Please try again." },
};
const services = [
  { uz: "Arxitektura loyihasi", ru: "Архитектурное проектирование", en: "Architectural design" },
  { uz: "Interyer dizayn", ru: "Дизайн интерьера", en: "Interior design" },
  { uz: "Landshaft dizayni", ru: "Ландшафтный дизайн", en: "Landscape design" },
  { uz: "Qurilish va nazorat", ru: "Строительство и контроль", en: "Construction and supervision" },
];

const field = "w-full border-0 border-b border-[#cfcfcf] bg-transparent pb-4 pt-1.5 text-[18px] outline-none transition-colors placeholder:text-g1 focus:border-ink";

export default function ContactForm({ lang }: { lang: Lang }) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"), phone: fd.get("phone"),
          service: fd.get("service"), message: fd.get("message"), lang,
          website: fd.get("website"), // honeypot
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setState("ok");
    } catch {
      setState("err");
    }
  }

  const label = "text-[16px] font-medium text-g2";
  return (
    <form onSubmit={submit} className="flex flex-col gap-7 bg-soft p-6 md:p-10">
      <h3 className="text-[28px] font-semibold">{T.title[lang]}</h3>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="flex flex-col gap-2.5"><span className={label}>{T.name[lang]}</span>
        <input name="name" required minLength={2} placeholder={T.namePh[lang]} className={field} /></label>
      <label className="flex flex-col gap-2.5"><span className={label}>{T.phone[lang]}</span>
        <input name="phone" required type="tel" inputMode="tel" placeholder="+998 __ ___ __ __" className={field} /></label>
      <label className="flex flex-col gap-2.5"><span className={label}>{T.service[lang]}</span>
        <select name="service" defaultValue="" className={field}>
          <option value="" disabled>{T.choose[lang]}</option>
          {services.map((s) => <option key={s.uz} value={s.uz}>{s[lang]}</option>)}
        </select></label>
      <label className="flex flex-col gap-2.5"><span className={label}>{T.message[lang]}</span>
        <textarea name="message" rows={3} placeholder={T.messagePh[lang]} className={`${field} resize-none`} /></label>

      <button
        disabled={state === "sending"}
        className="group flex w-fit items-center gap-2 bg-ink px-8 py-[18px] text-[18px] font-medium text-white transition-colors hover:bg-accent disabled:opacity-60"
      >
        {state === "sending" ? T.sending[lang] : T.send[lang]}
        <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </button>
      {state === "ok" && <p role="status" className="text-[16px] font-medium text-accent">{T.ok[lang]}</p>}
      {state === "err" && <p role="alert" className="text-[16px] font-medium text-red-700">{T.err[lang]}</p>}
      <p className="text-[14px] font-medium text-g2">{T.consent[lang]}</p>
    </form>
  );
}
