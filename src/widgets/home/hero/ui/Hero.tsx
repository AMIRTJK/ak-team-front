"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Float, Grid } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollIcon } from "@/shared/ui/Icons";
import localFont from "next/font/local";
import { useTranslation } from "@/shared/lib/i18n";

const aDLaMDisplayRegular = localFont({
  src: "../../../../../public/fonts/ADLaMDisplay-Regular.ttf",
  display: "swap",
});
const audiowideRegular = localFont({
  src: "../../../../../public/fonts/Audiowide-Regular.ttf",
  display: "swap",
});
const federoRegular = localFont({
  src: "../../../../../public/fonts/Federo-Regular.ttf",
  display: "swap",
});
const gurajadaRegular = localFont({
  src: "../../../../../public/fonts/Gurajada-Regular.ttf",
  display: "swap",
});
const megrimRegular = localFont({
  src: "../../../../../public/fonts/Megrim-Regular.ttf",
  display: "swap",
});

const CameraRig = () => {
  const { camera } = useThree();

  useEffect(() => {
    const xTo = gsap.quickTo(camera.position, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(camera.position, "y", {
      duration: 1.5,
      ease: "power3.out",
    });
    const rotXTo = gsap.quickTo(camera.rotation, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    const rotYTo = gsap.quickTo(camera.rotation, "y", {
      duration: 1.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      xTo(x * 0.2);
      yTo(y * 0.2);
      rotXTo(y * 0.5);
      rotYTo(-x * 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  return null;
};

const FlashlightText = ({
  text,
  fontClass,
}: {
  text: string;
  fontClass: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      if (!isHovered.current) {
        time += 0.015;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const targetX = centerX + Math.sin(time) * (rect.width * 0.6);
        const targetY = centerY + Math.cos(time * 2) * (rect.height * 0.2);

        pos.current.x += (targetX - pos.current.x) * 0.05;
        pos.current.y += (targetY - pos.current.y) * 0.05;
      }

      containerRef.current.style.setProperty("--mouse-x", `${pos.current.x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${pos.current.y}px`);

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetX = e.clientX - rect.left;
    const targetY = e.clientY - rect.top;

    gsap.to(pos.current, {
      x: targetX,
      y: targetY,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    gsap.killTweensOf(pos.current);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-auto transition-opacity duration-500 w-full h-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1
        className={`text-white/20 text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] uppercase flex items-center justify-center ${fontClass}`}
      >
        {text}
      </h1>

      <h1
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none text-transparent bg-clip-text text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] uppercase flex items-center justify-center ${fontClass}`}
        style={{
          backgroundImage:
            "radial-gradient(circle 25vw at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {text}
      </h1>
    </div>
  );
};

const MagneticCyberText = ({
  text,
  fontClass,
}: {
  text: string;
  fontClass: string;
}) => {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    lettersRef.current.forEach((el, i) => {
      if (el) {
        gsap.to(el, {
          y: "-=10", // Чуть уменьшил базовую левитацию для аккуратности
          yoyo: true,
          repeat: -1,
          duration: 1.5 + Math.random(),
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      }
    });

    const handleMouseMove = (e: MouseEvent) => {
      lettersRef.current.forEach((el) => {
        if (!el) return;
        const inner = el.querySelector(".magnetic-inner") as HTMLElement;
        if (!inner) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < 200) {
          gsap.to(inner, {
            x: distX * 0.3, // Мягче тянется
            y: distY * 0.3,
            // Незаметный 3D-поворот вслед за мышкой
            rotationX: -distY * 0.15,
            rotationY: distX * 0.15,
            rotationZ: distX * 0.01,
            scale: 1.15,
            transformPerspective: 500, // Включаем 3D-перспективу для поворотов
            color: "#D24A43",
            // Многослойная деталь: темная тень (объем) + два слоя красного (LED-неон)
            textShadow: `
              0px 10px 15px rgba(0, 0, 0, 0.6), 
              0px 0px 12px rgba(210, 74, 67, 0.8), 
              0px 0px 25px rgba(210, 74, 67, 0.4)
            `,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(inner, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            color: "#d1d5db", // Возврат к серебряному
            textShadow:
              "0px 0px 0px rgba(0,0,0,0), 0px 0px 0px rgba(210,74,67,0), 0px 0px 0px rgba(210,74,67,0)",
            duration: 0.8,
            ease: "elastic.out(1, 0.5)", // Мягко "пружинит" обратно
            overwrite: "auto",
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <h1
      className={`text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] uppercase flex items-center justify-center pointer-events-auto ${fontClass}`}
      style={{ perspective: "800px" }} // Глобальная перспектива для контейнера
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            lettersRef.current[i] = el;
          }}
          className="inline-block"
          style={{ width: char === " " ? "4vw" : "auto" }}
        >
          {/* transform-style-preserve-3d позволяет внутреннему спану корректно вращаться в 3D */}
          <span
            className="magnetic-inner inline-block transition-colors duration-200 will-change-transform text-[#d1d5db]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char}
          </span>
        </span>
      ))}
    </h1>
  );
};

const ThemeStones = () => {
  const particles = useMemo(
    () =>
      new Array(60).fill(null).map(() => ({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20 - 5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.8 ? "#D24A43" : "#2A2A2A",
      })),
    [],
  );
  return (
    <>
      <fog attach="fog" args={["#111111", 5, 15]} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={3} />
      <directionalLight
        position={[-10, -10, -10]}
        intensity={2}
        color="#D24A43"
      />
      {particles.map((props, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh
            position={new THREE.Vector3(...props.position)}
            rotation={new THREE.Euler(...props.rotation)}
            scale={props.scale}
          >
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={props.color}
              roughness={0.4}
              metalness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};

const ThemeCyber = () => {
  const particles = useMemo(
    () =>
      new Array(60).fill(null).map(() => ({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20 - 5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.8 ? "#D24A43" : "#444444",
      })),
    [],
  );
  return (
    <>
      <fog attach="fog" args={["#0A0A0A", 5, 20]} />
      <ambientLight intensity={1} />
      <Grid
        position={[0, -10, 0]}
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#333333"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#D24A43"
        fadeDistance={25}
        fadeStrength={1.5}
      />
      <Grid
        position={[0, 10, 0]}
        rotation={[Math.PI, 0, 0]}
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#333333"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#222222"
        fadeDistance={25}
        fadeStrength={1.5}
      />
      {particles.map((props, i) => (
        <Float key={i} speed={2} rotationIntensity={3} floatIntensity={2}>
          <mesh
            position={new THREE.Vector3(...props.position)}
            rotation={new THREE.Euler(...props.rotation)}
            scale={props.scale}
          >
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              color={props.color}
              wireframe={true}
              transparent={true}
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
};





export const Hero = ({
  theme = "cyber",
}: {
  theme?: "stones" | "cyber";
}) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const bgColors = {
    stones: "bg-[#111111]",
    cyber: "bg-[#0A0A0A]",
  };

  useEffect(() => {
    if (!titleContainerRef.current) return;

    const xTo = gsap.quickTo(titleContainerRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(titleContainerRef.current, "y", {
      duration: 1.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      xTo(Math.pow(x, 3) * 25);
      yTo(Math.pow(y, 3) * 12.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`relative w-full h-[100svh] overflow-hidden transition-colors duration-1000 ${bgColors[theme]}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <CameraRig />
          {theme === "stones" && <ThemeStones />}
          {theme === "cyber" && <ThemeCyber />}
        </Canvas>
      </div>

      {/* Растушёвка низа Hero в тёмный #050505 — бесшовный стык со следующей секцией (About) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[22vh] bg-gradient-to-b from-transparent to-[#050505]" />

      <section className="relative z-10 w-full h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10 pointer-events-none">
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            ref={titleContainerRef}
            className="relative will-change-transform flex items-center justify-center text-center select-none w-full h-full"
          >
            {theme === "stones" && (
              <FlashlightText
                text="A&K TEAM"
                fontClass={megrimRegular.className}
              />
            )}

            {theme === "cyber" && (
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-50">
                <MagneticCyberText
                  text="A&K TEAM"
                  fontClass={megrimRegular.className}
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0 h-auto">
          <div className="max-w-full md:max-w-sm lg:max-w-md w-full relative pointer-events-auto">
            <p className="text-[#D24A43] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 md:mb-4 uppercase">
              {t("hero.web_studio")}
            </p>
            <h2
              className="text-white text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold leading-tight mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: t("hero.title") }}
            />
            <p className="text-zinc-400 text-xs md:text-sm max-w-[90%] md:max-w-full leading-relaxed">
              {t("hero.description")}
            </p>
            <div className="w-full h-[1px] bg-transparent mt-5 md:mt-6 border-dashed border-b border-white/20"></div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full justify-center md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 relative pointer-events-auto">
            <span className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
              {t("hero.scroll")}
            </span>
            <div className="text-zinc-400">
              <ScrollIcon />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
