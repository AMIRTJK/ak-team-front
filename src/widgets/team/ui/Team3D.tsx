"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, TelegramIcon } from "@/shared/ui/Icons";
import { MEMBERS } from "../model/members";
import { ParticleFigure } from "./ParticleFigure";
import { useTranslation } from "@/shared/lib/i18n";

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-white/40 hover:text-white";

export const Team3D = () => {
  const { t } = useTranslation();
  const [memberIndex, setMemberIndex] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const wide = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(wide.matches);
    const update = () => setIsDesktop(wide.matches);
    wide.addEventListener("change", update);
    return () => wide.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (mounted && isDesktop) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 700); // 700ms gives WebGL ample time to initialize in the background
      return () => clearTimeout(timer);
    }
  }, [mounted, isDesktop]);

  const member = MEMBERS[memberIndex];
  const memberKey = member.name.toLowerCase().replace(" ", "_");
  const active = member.hotspots.find((h) => h.id === activeId) ?? null;

  const selectMember = (i: number) => {
    setMemberIndex(i);
    setActiveId(null);
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      {/* Фигура + хотспоты */}
      <div className="relative mx-auto aspect-square w-full max-w-lg">
        {/* WebGL Canvas — mounted ONLY after loading finishes so the browser never paints a white <canvas> */}
        {mounted && isDesktop && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Canvas
              camera={{ position: [0, 0, 6.5], fov: 45 }}
              dpr={[1, 2]}
              style={{ background: "transparent" }}
            >
              <ParticleFigure color={member.accent} />
            </Canvas>
          </motion.div>
        )}

        {/* Skeleton / Loading state — covers the area completely with dark bg */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505] rounded-3xl border border-white/5 overflow-hidden"
            >
              {/* Subtle background glow */}
              <div
                className="absolute inset-0 opacity-40 blur-2xl animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${member.accent}22 0%, transparent 70%)`
                }}
              />
              
              {/* Skeleton bust silhouette */}
              <div className="relative flex flex-col items-center justify-center gap-4">
                <div className="h-40 w-40 rounded-full bg-white/[0.02] border border-white/5 animate-pulse flex items-center justify-center">
                  <div
                    className="h-28 w-28 rounded-full blur-lg"
                    style={{ backgroundColor: `${member.accent}11` }}
                  />
                </div>
                <div className="h-4.5 w-36 rounded-full bg-white/[0.02] border border-white/5 animate-pulse" />
                <div className="h-3 w-24 rounded-full bg-white/[0.01] border border-white/5 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 z-10">
          {member.hotspots.map((h) => {
            const isActive = h.id === activeId;
            const translatedLabel = t(`team.members.${memberKey}.${h.id}`);
            return (
              <button
                key={h.id}
                type="button"
                onClick={() => setActiveId(isActive ? null : h.id)}
                style={{ top: h.position.top, left: h.position.left }}
                className="pointer-events-auto absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                aria-label={`Show ${translatedLabel}`}
              >
                <span className="relative flex h-3 w-3">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                    style={{ backgroundColor: member.accent }}
                  />
                  <span
                    className="relative inline-flex h-3 w-3 rounded-full"
                    style={{ backgroundColor: member.accent }}
                  />
                </span>
                <span
                  className={`whitespace-nowrap rounded-full border bg-black/50 px-2.5 py-0.5 text-xs backdrop-blur transition-colors ${
                    isActive
                      ? "border-white/40 text-white"
                      : "border-white/10 text-zinc-300"
                  }`}
                >
                  {translatedLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Детали участника */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          {MEMBERS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => selectMember(i)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                i === memberIndex
                  ? "border-[#C8FF12] bg-[#C8FF12]/10 text-white"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25"
              }`}
            >
              {m.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-3xl font-semibold text-white">{member.name}</h3>
          <p style={{ color: member.accent }}>{t(`team.members.${memberKey}.role`)}</p>
          <p className="text-sm text-zinc-500">{t(`team.members.${memberKey}.location`)}</p>
        </div>

        <p className="text-zinc-400">{t(`team.members.${memberKey}.bio`)}</p>

        <div className="min-h-[140px] rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500">
                  {t(`team.members.${memberKey}.${active.id}`)}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {(t(`team.members.${memberKey}.${active.id}_list`) || []).map((item: string) => (
                    <li
                      key={item}
                      className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-sm text-zinc-200"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-zinc-500"
              >
                {t("team.hint")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {member.links.github && (
            <a
              href={member.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} — GitHub`}
              className={iconBtn}
            >
              <GithubIcon />
            </a>
          )}
          {member.links.telegram && (
            <a
              href={member.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} — Telegram`}
              className={iconBtn}
            >
              <TelegramIcon />
            </a>
          )}
          {member.links.linkedin && (
            <a
              href={member.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} — LinkedIn`}
              className={iconBtn}
            >
              <LinkedinIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
