"use client";

import { useState } from "react";
import { MailIcon, TelegramIcon, WhatsappIcon } from "@/shared/ui/Icons";
import { CONTACTS } from "@/shared/config";

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
      `Name: ${form.name}`,
      `Contact: ${form.contact}`,
      `Project type: ${form.type}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline}`,
      "",
      form.message,
    ];
    const subject = encodeURIComponent(`New project inquiry — ${form.type}`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACTS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="w-full bg-gradient-to-b from-[#050505] to-[#0a0a0a] px-6 py-24 md:px-15"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2">
        <div className="flex flex-col">
          <h2 className="text-[clamp(48px,9vw,120px)] font-semibold leading-[0.9] text-[#C8FF12]">
            Let&rsquo;s talk
          </h2>
          <p className="mt-6 max-w-md text-lg text-zinc-300">
            Tell us about your project and we&rsquo;ll come back with an estimate
            and a plan. No bots — you talk to the people who build it.
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
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            required
          />
          <input
            className={inputClass}
            placeholder="Email or @telegram"
            value={form.contact}
            onChange={update("contact")}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <select
              className={inputClass}
              value={form.type}
              onChange={update("type")}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#0a0a0a]">
                  {t}
                </option>
              ))}
            </select>
            <select
              className={inputClass}
              value={form.budget}
              onChange={update("budget")}
            >
              {BUDGETS.map((b) => (
                <option key={b} value={b} className="bg-[#0a0a0a]">
                  {b}
                </option>
              ))}
            </select>
          </div>
          <select
            className={inputClass}
            value={form.timeline}
            onChange={update("timeline")}
          >
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-[#0a0a0a]">
                {t}
              </option>
            ))}
          </select>
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            placeholder="A few words about your project"
            value={form.message}
            onChange={update("message")}
          />
          <button
            type="submit"
            className="mt-2 rounded-full bg-[#C8FF12] px-8 py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Send inquiry
          </button>
          <p className="text-center text-xs text-zinc-500">
            Opens your email app with everything pre-filled.
          </p>
        </form>
      </div>
    </section>
  );
};
