"use client";

import { useEffect, useState, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  decay: number;
  rotation: number;
  rotSpeed: number;
}

export const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"up" | "down">("down");

  const spawnParticlesDirect = (progress: number, direction: "up" | "down") => {
    if (!canvasRef.current || !trackRef.current) return;
    const canvas = canvasRef.current;
    const track = trackRef.current;

    const trackHeight = track.clientHeight;
    const isMd = typeof window !== "undefined" && window.innerWidth >= 768;
    const thumbHeight = isMd ? 32 : 24;

    const thumbY = (progress / 100) * (trackHeight - thumbHeight) + thumbHeight / 2;

    const startX = canvas.width / (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1) / 2;
    const startY = thumbY + 40; // Add 40px padding offset since canvas top is 40px above track top

    // Spawn sparks (3 particles per tick)
    const count = 3;
    for (let i = 0; i < count; i++) {
      const baseVy = direction === "down" ? -1.5 : 1.5;
      const vy = baseVy + (Math.random() - 0.5) * 1.2;
      const vx = (Math.random() - 0.5) * 2.4;

      const size = Math.random() * 2.2 + 1.2; // 1.2px to 3.4px
      const colors = ["#D24A43", "#FF4C3B", "#FF8824", "#FFC83B", "#FFEAA6"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      particlesRef.current.push({
        x: startX + (Math.random() - 0.5) * 4,
        y: startY + (Math.random() - 0.5) * 4,
        vx,
        vy,
        size,
        color,
        life: 1.0,
        decay: Math.random() * 0.04 + 0.02, // lasts ~25-50 frames
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = (scrollTop / docHeight) * 100;
        setScrollProgress(progress);

        const direction = scrollTop > lastScrollYRef.current ? "down" : "up";
        scrollDirectionRef.current = direction;
        lastScrollYRef.current = scrollTop;

        spawnParticlesDirect(progress, direction);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDragging]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      const percentage = y / rect.height;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, docHeight * percentage);

      setScrollProgress(percentage * 100);

      const direction = percentage * 100 > scrollProgress ? "down" : "up";
      scrollDirectionRef.current = direction;
      spawnParticlesDirect(percentage * 100, direction);
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
  }, [isDragging, scrollProgress]);

  // Particle render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const updateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rect = trackRef.current?.getBoundingClientRect();
      if (rect) {
        const dpr = window.devicePixelRatio || 1;
        const targetWidth = rect.width + 80;
        const targetHeight = rect.height + 80; // Add 80px extra vertical room

        if (canvas.width !== targetWidth * dpr) {
          canvas.width = targetWidth * dpr;
          canvas.style.width = `${targetWidth}px`;
        }
        if (canvas.height !== targetHeight * dpr) {
          canvas.height = targetHeight * dpr;
          canvas.style.height = `${targetHeight}px`;
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * (1 - p.life * 0.4);
        p.y += p.vy;
        p.life -= p.decay;
        p.rotation += p.rotSpeed;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;

        if (p.size > 2) {
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 3;
        }

        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }

      animationId = requestAnimationFrame(updateParticles);
    };

    animationId = requestAnimationFrame(updateParticles);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className={`fixed right-6 md:right-12 top-1/2 -translate-y-1/2 h-32 md:h-48 w-6 flex justify-center z-50 transition-all ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
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
      {/* Scroll track line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-[#D24A43] opacity-20 pointer-events-none" />

      {/* Sparks canvas - absolutely positioned and extended vertically to prevent clipping */}
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none select-none z-0"
        style={{
          height: "calc(100% + 80px)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Red scrollbar thumb - glow shadow removed as requested */}
      <div
        className="absolute w-1.5 md:w-2 h-6 md:h-8 bg-[#D24A43] rounded-full transition-transform duration-75 ease-out will-change-transform pointer-events-none z-10"
        style={{
          top: `${scrollProgress}%`,
          transform: `translateY(-${scrollProgress}%)`,
        }}
      />
    </div>
  );
};
