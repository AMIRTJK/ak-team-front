"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollIcon } from "@/shared/ui/Icons";

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

      xTo(x * 1.5);
      yTo(y * 1.5);
      rotXTo(y * 0.1);
      rotYTo(-x * 0.1);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  return null;
};

const FloatingParticles = ({ count = 40 }) => {
  const particles = useMemo(() => {
    return new Array(count).fill(null).map(() => ({
      position: [
        (Math.random() - 0.5) * 30, // Расширили зону по X
        (Math.random() - 0.5) * 30, // Расширили зону по Y
        (Math.random() - 0.5) * 20 - 5, // Увеличили разброс по глубине (от -15 до +5)
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      // Делаем разный размер: от маленьких осколков до крупных
      scale: Math.random() * 0.6 + 0.1,
      color: Math.random() > 0.8 ? "#D24A43" : "#2A2A2A",
    }));
  }, [count]);

  return (
    <>
      {particles.map((props, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <mesh
            position={new THREE.Vector3(...props.position)}
            rotation={new THREE.Euler(...props.rotation)}
            scale={props.scale}
          >
            {/* Используем икосаэдр с детализацией 0 - получаются крутые 3D-осколки/камни */}
            <icosahedronGeometry args={[1, 0]} />

            {/* StandardMaterial реагирует на свет, у него есть шероховатость и металличность */}
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

// 3. Главный компонент (ОБНОВЛЕНО место с Canvas)
export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const xTo = gsap.quickTo(titleRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(titleRef.current, "y", {
      duration: 1.5,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      const smoothX = Math.pow(x, 3);
      const smoothY = Math.pow(y, 3);

      xTo(smoothX * 50);
      yTo(smoothY * 25);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          {/* 1. ДОБАВЛЯЕМ ТУМАН. Цвет тумана совпадает с фоном сайта. 
              Объекты дальше 15 единиц будут полностью скрыты. */}
          <fog attach="fog" args={["#111111", 5, 15]} />

          {/* 2. ДОБАВЛЯЕМ СВЕТ */}
          {/* Мягкий общий свет, чтобы тени не были абсолютно черными */}
          <ambientLight intensity={1.5} />

          {/* Основной направленный свет (как солнце), дает объем и блики */}
          <directionalLight position={[10, 10, 10]} intensity={3} />

          {/* Контровой (задний) красный свет для кинематографичности */}
          <directionalLight
            position={[-10, -10, -10]}
            intensity={2}
            color="#D24A43"
          />

          <CameraRig />
          {/* Увеличили количество частиц, так как мы расширили пространство */}
          <FloatingParticles count={80} />
        </Canvas>
      </div>

      {/* ... Ваша HTML секция остается абсолютно без изменений ... */}
      <section className="relative z-10 w-full h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10 pointer-events-none">
        <div className="flex-1 flex items-center justify-center w-full">
          <h1
            ref={titleRef}
            className="text-[#EAE4D3] text-[24vw] md:text-[12vw] font-black tracking-tighter leading-[0.85] md:leading-none select-none flex flex-col md:flex-row items-center md:gap-4 text-center mix-blend-difference will-change-transform"
          >
            A&K TEAM
          </h1>
        </div>

        {/* ... остальная верстка ... */}
        <div className="relative w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0 h-auto">
          <div className="max-w-full md:max-w-sm lg:max-w-md w-full relative pointer-events-auto">
            <p className="text-[#D24A43] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 md:mb-4 uppercase">
              Web Studio
            </p>
            <h2 className="text-[#EAE4D3] text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold leading-tight mb-3 md:mb-4">
              We craft digital <br className="hidden md:block" /> experiences
            </h2>
            <p className="text-[#888888] text-xs md:text-sm max-w-[90%] md:max-w-full">
              We engineer the success of your vision through technology and
              innovation.
            </p>
            <div className="w-full h-[1px] bg-transparent mt-5 md:mt-6 border-dashed border-b border-[#444]"></div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full justify-center md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 relative pointer-events-auto">
            <span className="text-[#EAE4D3] text-[10px] font-bold tracking-widest uppercase">
              Scroll to discover
            </span>
            <ScrollIcon />
          </div>
        </div>
      </section>
    </div>
  );
};
