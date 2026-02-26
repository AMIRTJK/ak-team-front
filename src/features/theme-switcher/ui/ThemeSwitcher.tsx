"use client";

// Экспортируем тип, чтобы использовать его в Home и Hero
export type Theme = "stones" | "cyber" | "space";

interface ThemeSwitcherProps {
  activeTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}

export const ThemeSwitcher = ({
  activeTheme,
  onChangeTheme,
}: ThemeSwitcherProps) => {
  const themes: Theme[] = ["stones", "cyber", "space"];

  return (
    <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 flex flex-col gap-3 z-50">
      <p className="text-[#888888] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
        Select Theme
      </p>

      {themes.map((theme) => (
        <button
          key={theme}
          onClick={() => onChangeTheme(theme)}
          className={`px-4 py-2 text-xs cursor-pointer font-bold tracking-wider uppercase border transition-all duration-300 ${
            activeTheme === theme
              ? "border-[#D24A43] text-[#D24A43] bg-[#D24A43]/10"
              : "border-[#444444] text-[#888888] hover:border-[#EAE4D3] hover:text-[#EAE4D3]"
          }`}
        >
          {theme}
        </button>
      ))}
    </div>
  );
};
