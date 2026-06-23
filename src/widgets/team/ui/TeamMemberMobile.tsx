"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/shared/ui/Icons";
import { useTranslation } from "@/shared/lib/i18n";
import type { TeamMemberData } from "../model/members";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-[#C8FF12]/50 hover:text-white";

/**
 * Мобильная версия карточки участника: вместо тяжёлой 3D-сцены — лёгкий
 * 2D-tilt параллакс аватара (реагирует на палец/курсор) + вкладки с теми же
 * данными, что и хотспоты на десктопе (навыки, стек, проекты, опыт).
 * Уважает prefers-reduced-motion (tilt отключается).
 */
export const TeamMemberMobile = ({
  name,
  initials,
  accent,
  links,
  hotspots,
}: TeamMemberData) => {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const memberKey = name.toLowerCase().replace(" ", "_");
  const [tab, setTab] = useState(hotspots[0]?.id ?? "skills");

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-1, 1], [10, -10]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-10, 10]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div
        className="flex items-center gap-5"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={{ perspective: 700 }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl text-3xl font-bold text-white"
        >
          <span
            className="absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${accent} 0%, #16161c 75%)`,
            }}
          />
          <span
            className="absolute -inset-2 rounded-3xl opacity-40 blur-xl"
            style={{ background: accent }}
          />
          <span style={{ transform: "translateZ(24px)" }}>{initials}</span>
        </motion.div>

        <div>
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          <p style={{ color: accent }}>
            {t(`team.members.${memberKey}.role`)}
          </p>
          <p className="text-sm text-zinc-500">
            {t(`team.members.${memberKey}.location`)}
          </p>
        </div>
      </div>

      <p className="text-zinc-400">{t(`team.members.${memberKey}.bio`)}</p>

      {/* Вкладки = хотспоты десктопа */}
      <div className="flex flex-wrap gap-2">
        {hotspots.map((h) => {
          const isActive = h.id === tab;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setTab(h.id)}
              style={
                isActive
                  ? { borderColor: accent, backgroundColor: `${accent}1a` }
                  : undefined
              }
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25"
              }`}
            >
              {t(`team.members.${memberKey}.${h.id}`)}
            </button>
          );
        })}
      </div>

      <div className="min-h-[92px] rounded-2xl border border-white/10 bg-black/20 p-4">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="flex flex-wrap gap-2"
          >
            {(t(`team.members.${memberKey}.${tab}_list`) || []).map(
              (item: string) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-zinc-200"
                >
                  {item}
                </li>
              ),
            )}
          </motion.ul>
        </AnimatePresence>
      </div>

      <div className="mt-auto flex gap-3 pt-2">
        {links.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — GitHub`}
            className={iconBtn}
          >
            <GithubIcon />
          </a>
        )}
        {links.telegram && (
          <a
            href={links.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — Telegram`}
            className={iconBtn}
          >
            <TelegramIcon />
          </a>
        )}
        {links.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} — LinkedIn`}
            className={iconBtn}
          >
            <LinkedinIcon />
          </a>
        )}
      </div>
    </div>
  );
};
