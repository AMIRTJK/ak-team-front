"use client";

import { useState } from "react";
import { MailIcon, TelegramIcon, WhatsappIcon, Select } from "@/shared/ui";
import { CONTACTS } from "@/shared/config";
import { useTranslation } from "@/shared/lib/i18n";

const PROJECT_TYPES = [
  "Website",
  "Web app",
  "Frontend",
  "Backend",
  "DevOps",
  "AI solution",
  "Other",
];
const BUDGETS = ["< $1k", "$1k–3k", "$3k–10k", "> $10k", "Not sure yet"];
const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Flexible"];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-[#C8FF12]/50";
const directClass =
  "flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-white transition-colors hover:border-[#C8FF12]/50";

export const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    contact: "",
    type: PROJECT_TYPES[0],
    budget: BUDGETS[0],
    timeline: TIMELINES[0],
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `${t("contact.email.name")}: ${form.name}`,
      `${t("contact.email.contact")}: ${form.contact}`,
      `${t("contact.email.project_type")}: ${t(`contact.project_types.${form.type}`)}`,
      `${t("contact.email.budget")}: ${t(`contact.budgets.${form.budget}`)}`,
      `${t("contact.email.timeline")}: ${t(`contact.timelines.${form.timeline}`)}`,
      "",
      form.message,
    ];
    const subject = encodeURIComponent(`${t("contact.email.subject")} — ${t(`contact.project_types.${form.type}`)}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACTS.email}?subject=${subject}&body=${body}`;
  };

  const projectTypeOptions = PROJECT_TYPES.map(type => t(`contact.project_types.${type}`));
  const budgetOptions = BUDGETS.map(budget => t(`contact.budgets.${budget}`));
  const timelineOptions = TIMELINES.map(timeline => t(`contact.timelines.${timeline}`));

  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="text-[clamp(48px,9vw,120px)] font-semibold leading-[1.2] text-[#C8FF12]">
            {t("contact.title")}
          </h2>
          <p className="mt-8 max-w-md text-lg text-zinc-300">
            {t("contact.subtitle")}
          </p>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={`https://t.me/${CONTACTS.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className={directClass}
            >
              <TelegramIcon />
              Telegram
            </a>
            <a
              href={`https://wa.me/${CONTACTS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={directClass}
            >
              <WhatsappIcon />
              WhatsApp
            </a>
            <a href={`mailto:${CONTACTS.email}`} className={directClass}>
              <MailIcon />
              {CONTACTS.email}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-8"
        >
          <input
            className={inputClass}
            placeholder={t("contact.name_placeholder")}
            value={form.name}
            onChange={update("name")}
            required
          />
          <input
            className={inputClass}
            placeholder={t("contact.contact_placeholder")}
            value={form.contact}
            onChange={update("contact")}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              className="w-full"
              value={t(`contact.project_types.${form.type}`)}
              options={projectTypeOptions}
              onChange={(val) => {
                const orig = PROJECT_TYPES.find(key => t(`contact.project_types.${key}`) === val) || PROJECT_TYPES[0];
                setForm((prev) => ({ ...prev, type: orig }));
              }}
            />
            <Select
              className="w-full"
              value={t(`contact.budgets.${form.budget}`)}
              options={budgetOptions}
              onChange={(val) => {
                const orig = BUDGETS.find(key => t(`contact.budgets.${key}`) === val) || BUDGETS[0];
                setForm((prev) => ({ ...prev, budget: orig }));
              }}
            />
          </div>
          <Select
            className="w-full"
            value={t(`contact.timelines.${form.timeline}`)}
            options={timelineOptions}
            onChange={(val) => {
              const orig = TIMELINES.find(key => t(`contact.timelines.${key}`) === val) || TIMELINES[0];
              setForm((prev) => ({ ...prev, timeline: orig }));
            }}
          />
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            placeholder={t("contact.message_placeholder")}
            value={form.message}
            onChange={update("message")}
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#C8FF12] px-8 py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            {t("contact.submit")}
          </button>
          <p className="text-center text-xs text-zinc-500">
            {t("contact.disclaimer")}
          </p>
        </form>
      </div>
    </section>
  );
};

