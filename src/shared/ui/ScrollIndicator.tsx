"use client";

import { useEffect, useState } from "react";

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Насколько пикселей мы проскроллили вниз
      const scrollTop = window.scrollY;

      // Общая высота страницы минус высота видимого окна браузера
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Вычисляем процент от 0 до 100
      if (docHeight > 0) {
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
      }
    };

    // Слушаем скролл
    window.addEventListener("scroll", handleScroll);

    // Вызываем сразу при монтировании, чтобы задать начальное положение
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Фиксируем контейнер справа по центру
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-32 md:h-48 w-2 flex justify-center z-50 pointer-events-none">
      {/* Тонкая линия (трек) */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#D24A43] opacity-20" />

      {/* Сам ползунок */}
      <div
        className="absolute w-1.5 md:w-2 h-6 md:h-8 bg-[#D24A43] rounded-full transition-transform duration-75 ease-out will-change-transform"
        style={{
          // Хитрый CSS-трюк: мы спускаем его на % скролла (top),
          // но компенсируем его собственную высоту (translateY),
          // чтобы он никогда не вылезал за пределы линии.
          top: `${scrollProgress}%`,
          transform: `translateY(-${scrollProgress}%)`,
        }}
      />
    </div>
  );
};
