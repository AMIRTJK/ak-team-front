"use client";

import { useEffect, useState, useRef } from "react";

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Указываем, что ref будет привязан к элементу <div>
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
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

  useEffect(() => {
    // 2. Указываем, что 'e' — это событие мыши (нативное браузерное)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const percentage = y / rect.height;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, docHeight * percentage);

      setScrollProgress(percentage * 100);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
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
    <div
      ref={trackRef}
      className={`fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-32 md:h-48 w-6 flex justify-center z-50 transition-all ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      // 3. Явно типизируем событие для React-обработчика (опционально, но полезно для строгого режима)
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);

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
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#D24A43] opacity-20 pointer-events-none" />

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
