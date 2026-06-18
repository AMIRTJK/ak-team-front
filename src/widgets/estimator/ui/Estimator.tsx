"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACTS } from "@/shared/config";
import {
  PROJECT_TYPES,
  MODULES,
  URGENCY,
  SUPPORT,
  estimate,
  type ChoiceOption,
  type EstimateConfig,
} from "../model/pricing";
import { EstimatePanel } from "./EstimatePanel";

const Group = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
      {title}
    </h3>
    {children}
  </div>
);

const SelectCard = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-xl border px-4 py-4 text-left text-sm font-medium transition-all ${
      active
        ? "border-[#C8FF12] bg-[#C8FF12]/10 text-white"
        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25"
    }`}
  >
    {children}
  </button>
);

const ToggleCard = ({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
      active
        ? "border-[#C8FF12] bg-[#C8FF12]/10"
        : "border-white/10 bg-white/[0.03] hover:border-white/25"
    }`}
  >
    <span
      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold ${
        active
          ? "border-[#C8FF12] bg-[#C8FF12] text-black"
          : "border-white/30 text-transparent"
      }`}
    >
      ✓
    </span>
    <span>
      <span className="block text-sm font-medium text-white">{label}</span>
      {hint && <span className="block text-xs text-zinc-500">{hint}</span>}
    </span>
  </button>
);

const Segmented = ({
  options,
  activeId,
  onSelect,
}: {
  options: ChoiceOption[];
  activeId: string;
  onSelect: (id: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((o) => (
      <button
        key={o.id}
        type="button"
        onClick={() => onSelect(o.id)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
          activeId === o.id
            ? "border-[#C8FF12] bg-[#C8FF12]/10 text-white"
            : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/25"
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

export const Estimator = () => {
  const [config, setConfig] = useState<EstimateConfig>({
    typeId: PROJECT_TYPES[0].id,
    moduleIds: [],
    urgencyId: URGENCY[0].id,
    supportId: SUPPORT[0].id,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const result = useMemo(() => estimate(config), [config]);

  const toggleModule = (id: string) =>
    setConfig((c) => ({
      ...c,
      moduleIds: c.moduleIds.includes(id)
        ? c.moduleIds.filter((m) => m !== id)
        : [...c.moduleIds, id],
    }));

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleSendEmail = () => {
    const type = PROJECT_TYPES.find((t) => t.id === config.typeId);
    const mods = MODULES.filter((m) => config.moduleIds.includes(m.id)).map(
      (m) => m.label,
    );
    const urgency = URGENCY.find((u) => u.id === config.urgencyId);
    const support = SUPPORT.find((s) => s.id === config.supportId);

    const lines = [
      "Project estimate request",
      "",
      `Type: ${type?.label ?? "—"}`,
      `Modules: ${mods.length ? mods.join(", ") : "—"}`,
      `Urgency: ${urgency?.label ?? "—"}`,
      `Support: ${support?.label ?? "—"}`,
      "",
      `Ballpark: $${result.priceMin.toLocaleString("en-US")}–$${result.priceMax.toLocaleString("en-US")} · ${result.weeksMin}–${result.weeksMax} weeks`,
    ];
    const subject = encodeURIComponent(
      `Project estimate — ${type?.label ?? "project"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${CONTACTS.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="estimate"
      className="w-full bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505] px-6 py-24 md:px-15"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[clamp(48px,11vw,160px)] font-semibold leading-[0.9] text-[#C8FF12]">
            Estimate
          </h2>
          <p className="mb-12 max-w-2xl text-lg text-zinc-300 md:text-2xl">
            Pick what you need and get a ballpark instantly. The final quote
            comes after a short chat — no surprises.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="flex flex-col gap-10">
            <Group title="1 · Project type">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {PROJECT_TYPES.map((t) => (
                  <SelectCard
                    key={t.id}
                    active={config.typeId === t.id}
                    onClick={() => setConfig((c) => ({ ...c, typeId: t.id }))}
                  >
                    {t.label}
                  </SelectCard>
                ))}
              </div>
            </Group>

            <Group title="2 · Modules">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MODULES.map((m) => (
                  <ToggleCard
                    key={m.id}
                    active={config.moduleIds.includes(m.id)}
                    onClick={() => toggleModule(m.id)}
                    label={m.label}
                    hint={m.hint}
                  />
                ))}
              </div>
            </Group>

            <Group title="3 · Urgency">
              <Segmented
                options={URGENCY}
                activeId={config.urgencyId}
                onSelect={(id) => setConfig((c) => ({ ...c, urgencyId: id }))}
              />
            </Group>

            <Group title="4 · Support">
              <Segmented
                options={SUPPORT}
                activeId={config.supportId}
                onSelect={(id) => setConfig((c) => ({ ...c, supportId: id }))}
              />
            </Group>
          </div>

          <EstimatePanel result={result} onSubmit={handleSubmit} />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 md:p-8 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <h3 className="text-2xl font-semibold text-[#C8FF12] mb-6">
                Estimate Details
              </h3>

              {/* Estimate Summary Card */}
              <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 md:p-6 mb-6">
                {/* Background subtle glow */}
                <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-[#C8FF12]/5 blur-2xl pointer-events-none" />

                <div className="flex flex-col gap-4">
                  {/* Project Type */}
                  <div className="flex justify-between items-start gap-4 pb-3 border-b border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Project Type</span>
                    <span className="text-sm font-semibold text-white">
                      {PROJECT_TYPES.find((t) => t.id === config.typeId)?.label ?? "—"}
                    </span>
                  </div>

                  {/* Modules */}
                  <div className="flex flex-col gap-2 pb-3 border-b border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Selected Modules</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {config.moduleIds.length > 0 ? (
                        MODULES.filter((m) => config.moduleIds.includes(m.id)).map((m) => (
                          <span
                            key={m.id}
                            className="rounded-full bg-[#C8FF12]/5 border border-[#C8FF12]/20 px-2.5 py-0.5 text-xs text-[#C8FF12]"
                          >
                            {m.label}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-zinc-500 font-medium">None selected</span>
                      )}
                    </div>
                  </div>

                  {/* Urgency */}
                  <div className="flex justify-between items-center gap-4 pb-3 border-b border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Urgency</span>
                    <span className="text-sm font-medium text-white">
                      {URGENCY.find((u) => u.id === config.urgencyId)?.label ?? "—"}
                    </span>
                  </div>

                  {/* Support */}
                  <div className="flex justify-between items-center gap-4 pb-3 border-b border-white/5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Support</span>
                    <span className="text-sm font-medium text-white">
                      {SUPPORT.find((s) => s.id === config.supportId)?.label ?? "—"}
                    </span>
                  </div>

                  {/* Pricing and Timeline Highlight */}
                  <div className="pt-2 flex justify-between items-baseline gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block">Est. Budget</span>
                      <span className="text-xl font-bold text-white mt-1 block">
                        ${result.priceMin.toLocaleString("en-US")} – ${result.priceMax.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 block">Timeline</span>
                      <span className="text-lg font-bold text-[#C8FF12] mt-1 block">
                        {result.weeksMin === result.weeksMax
                          ? `${result.weeksMin}`
                          : `${result.weeksMin}–${result.weeksMax}`}{" "}
                        weeks
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleSendEmail();
                    setIsModalOpen(false);
                  }}
                  className="w-full rounded-full bg-[#C8FF12] py-3 text-center font-semibold text-black hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 cursor-pointer"
                >
                  Confirm & Send Inquiry →
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full rounded-full border border-white/10 bg-transparent py-3 text-center font-semibold text-zinc-400 hover:border-white/20 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  Go Back
                </button>
              </div>

              <p className="text-center text-[10px] text-zinc-500 mt-4 leading-normal">
                This will open your default email application with all specifications pre-filled.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
