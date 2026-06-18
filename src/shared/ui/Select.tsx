"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SelectProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}

/**
 * Кастомный селект с полностью стилизуемым выпадающим списком
 * (нативный <select>/<option> не поддаётся оформлению).
 */
export const Select = ({ value, options, onChange, className }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-white/[0.03] px-4 py-3 text-left text-white outline-none transition-colors ${
          open ? "border-[#C8FF12]/50" : "border-white/10 hover:border-white/25"
        }`}
      >
        <span className="truncate">{value}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-white/10 bg-[#0d0d0d] p-1 shadow-2xl"
          >
            {options.map((option) => {
              const active = option === value;
              return (
                <li key={option} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      active
                        ? "bg-[#C8FF12]/10 text-[#C8FF12]"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{option}</span>
                    {active && (
                      <svg
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
