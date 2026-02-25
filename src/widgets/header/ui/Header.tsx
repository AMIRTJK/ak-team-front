import Link from "next/link";
import { LogoIcon } from "@/shared/ui/Icons";

const NAV_LINKS = ["Services", "Projects", "Team", "Blog", "FAQ", "Contact"];

export const Header = () => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#222222]/90 backdrop-blur-md border border-[#333] rounded-full px-2 py-2 flex items-center gap-6">
      {/* Logo Area */}
      <div className="flex items-center gap-2 pl-4 pr-6 border-r border-[#444]">
        <LogoIcon />
        <span className="text-[#EAE4D3] font-bold text-lg tracking-widest">
          GRAFFICO
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-2 pr-2">
        <Link
          href="/"
          className="bg-[#EAE4D3] text-black px-6 py-2 rounded-full text-sm font-bold"
        >
          Home
        </Link>
        {NAV_LINKS.map((link) => (
          <Link
            key={link}
            href={`/${link.toLowerCase()}`}
            className="text-[#EAE4D3] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            {link}
          </Link>
        ))}
      </nav>
    </header>
  );
};
