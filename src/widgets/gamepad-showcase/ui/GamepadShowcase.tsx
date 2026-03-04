"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Регистрируем плагин
gsap.registerPlugin(ScrollTrigger);

export const GamepadShowcase = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context) return;

      // Укажи точное количество кадров, которые получились из видео
      const frameCount = 82;

      // Функция для генерации путей к файлам
      const currentFrame = (index: number) => {
        // Делаем формат 000, 001, 002...
        const paddedIndex = String(index).padStart(3, "0");
        // Подставляем твое название (проверь, чтобы расширение было .webp)
        return `/assets/gamepad/AI Upscaler-4K-g1aaf4vq91rmt0cwpdxsfyg9kc_result__${paddedIndex}.webp`;
      };

      const images: HTMLImageElement[] = [];
      // Стартуем с нулевого кадра
      const frames = { frame: 0 };

      // 1. Загружаем первый кадр (000) и сразу рисуем
      const firstImg = new Image();
      firstImg.src = currentFrame(0);
      images[0] = firstImg;

      firstImg.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(firstImg, 0, 0, canvas.width, canvas.height);
      };

      // 2. Предзагружаем остальные (от 001 до 081)
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images.push(img);
      }

      // 3. Создаем анимацию скролла
      gsap.to(frames, {
        frame: frameCount - 1,
        snap: "frame", // Привязываем к целым числам (индексам массива)
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000", // Длина скролла (чем больше, тем медленнее крутится)
          scrub: 0.5, // Плавность следования за скроллом
          pin: true, // Прикалываем секцию к экрану, пока крутится геймпад
        },
        onUpdate: () => {
          const img = images[frames.frame];
          if (img && img.complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center bg-[#030303]"
    >
      <canvas
        ref={canvasRef}
        // Разрешение самого холста (лучше ставить как в исходном видео)
        width={1920}
        height={1080}
        // Tailwind классы для адаптивности
        className="w-full max-w-6xl object-contain"
      />
    </section>
  );
};
