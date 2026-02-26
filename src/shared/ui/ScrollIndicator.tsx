"use client";

import { useEffect, useState, useRef } from "react";

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);

  // 1. Отслеживание обычного скролла
  useEffect(() => {
    const handleScroll = () => {
      // Если мы сейчас перетаскиваем ползунок мышкой, игнорируем обычный скролл,
      // чтобы избежать дерганий
      if (isDragging) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDragging]);

  // 2. Логика перетаскивания ползунка (Drag)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !trackRef.current) return;

      // Получаем координаты нашего контейнера-трека
      const rect = trackRef.current.getBoundingClientRect();

      // Вычисляем позицию мыши внутри трека (ограничиваем от 0 до высоты контейнера)
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

      // Переводим в проценты (от 0 до 1)
      const percentage = y / rect.height;

      // Скроллим саму страницу
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, docHeight * percentage);

      // Обновляем визуал ползунка
      setScrollProgress(percentage * 100);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      // Вешаем слушатели на window, чтобы мы могли двигать мышью даже за пределами ползунка
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      // CSS-трюк: принудительно ставим кулак на весь body во время драга,
      // чтобы курсор не слетал, если мышка движется быстрее ползунка
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none"; // Запрещаем выделение текста при перетаскивании
    } else {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    // Убрали pointer-events-none.
    // Расширили ширину до w-6, чтобы по области было проще кликнуть.
    // Добавили cursor-grab/grabbing
    <div
      ref={trackRef}
      className={`fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-32 md:h-48 w-6 flex justify-center z-50 transition-all ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={(e) => {
        e.preventDefault(); // Предотвращаем баги с выделением текста
        setIsDragging(true);

        // Позволяет кликнуть в любое место трека, и страница сразу проскроллится туда
        if (trackRef.current) {
          const rect = trackRef.current.getBoundingClientRect();
          const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
          const percentage = y / rect.height;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          window.scrollTo({ top: docHeight * percentage, behavior: "smooth" });
        }
      }}
    >
      {/* Тонкая линия (трек) */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#D24A43] opacity-20 pointer-events-none" />

      {/* Сам ползунок */}
      <div
        className="absolute w-1.5 md:w-2 h-6 md:h-8 bg-[#D24A43] rounded-full transition-transform duration-75 ease-out will-change-transform pointer-events-none"
        style={{
          top: `${scrollProgress}%`,
          transform: `translateY(-${scrollProgress}%)`,
        }}
      />
    </div>
  );
};
