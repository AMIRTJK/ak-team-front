import Link from "next/link";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TelegramIcon,
} from "@/shared/ui/Icons";
import { CONTACTS } from "@/shared/config";

// Только реально существующие секции, чтобы в футере не было мёртвых ссылок
const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-[#C8FF12]/50 hover:text-white";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-[#0a0a0a] px-6 py-12 md:px-15">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="text-xl font-semibold text-white">A&amp;K Team</p>
          <p className="mt-2 text-sm text-zinc-400">
            Web, infrastructure &amp; AI engineering. A compact team with
            studio-grade output.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href={`https://t.me/${CONTACTS.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className={iconBtn}
          >
            <TelegramIcon />
          </a>
          <a
            href={`https://github.com/${CONTACTS.github}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={iconBtn}
          >
            <GithubIcon />
          </a>
          {CONTACTS.linkedin && (
            <a
              href={`https://linkedin.com/in/${CONTACTS.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={iconBtn}
            >
              <LinkedinIcon />
            </a>
          )}
          <a href={`mailto:${CONTACTS.email}`} aria-label="Email" className={iconBtn}>
            <MailIcon />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-2 border-t border-white/5 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} A&amp;K Team. All rights reserved.</span>
        <span>Designed &amp; built by A&amp;K</span>
      </div>
    </footer>
  );
};
