"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useTranslation } from "@/shared/lib/i18n";
import type { EstimateResult } from "../model/pricing";

const Money = ({ value }: { value: number }) => {
  const mv = useMotionValue(value);
  const text = useTransform(
    mv,
    (v) => `$${(Math.round(v / 100) * 100).toLocaleString("en-US")}`,
  );

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.5, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv]);

  return <motion.span>{text}</motion.span>;
};

interface EstimatePanelProps {
  result: EstimateResult;
  onSubmit: () => void;
}

export const EstimatePanel = ({ result, onSubmit }: EstimatePanelProps) => {
  const { t } = useTranslation();
  const weeks =
    result.weeksMin === result.weeksMax
      ? `${result.weeksMin}`
      : `${result.weeksMin}–${result.weeksMax}`;

  return (
    <div className="h-fit lg:sticky lg:top-24">
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {t("estimator.estimated_budget")}
          </p>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-2 text-3xl font-bold text-white md:text-4xl">
            <Money value={result.priceMin} />
            <span className="text-zinc-600">–</span>
            <Money value={result.priceMax} />
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {t("estimator.timeline")}
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#C8FF12]">
            {weeks} {t("estimator.weeks")}
          </p>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          className="rounded-full bg-[#C8FF12] px-6 py-3 text-center font-semibold text-black transition-transform hover:scale-[1.02]"
        >
          {t("estimator.get_exact_estimate")}
        </button>

        <p className="text-xs leading-relaxed text-zinc-500">
          {t("estimator.disclaimer")}
        </p>
      </div>
    </div>
  );
};

