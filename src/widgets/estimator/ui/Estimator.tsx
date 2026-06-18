"use client";

import { useMemo, useState } from "react";
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

  const result = useMemo(() => estimate(config), [config]);

  const toggleModule = (id: string) =>
    setConfig((c) => ({
      ...c,
      moduleIds: c.moduleIds.includes(id)
        ? c.moduleIds.filter((m) => m !== id)
        : [...c.moduleIds, id],
    }));

  const handleSubmit = () => {
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
    </section>
  );
};
