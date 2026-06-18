"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ProgressRef = React.MutableRefObject<number>;

/**
 * Реальный 3D-объект, который вращается в пространстве по мере скролла.
 * Заменяет baked-сиквенс из 82 картинок (геймпад): тот же эффект «объект
 * крутится при скролле», но в реальном времени, релевантно бренду и легче по весу.
 */
const Core = ({ progress }: { progress: ProgressRef }) => {
  const group = useRef<THREE.Group>(null);

  const debris = useMemo(
    () =>
      new Array(16).fill(null).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 3 + Math.random() * 1.6;
        return {
          position: [
            Math.cos(angle) * radius,
            (Math.random() - 0.5) * 3.5,
            Math.sin(angle) * radius,
          ] as [number, number, number],
          scale: Math.random() * 0.22 + 0.08,
          color: Math.random() > 0.7 ? "#D24A43" : "#262626",
        };
      }),
    [],
  );

  useFrame(() => {
    if (!group.current) return;
    const p = progress.current;
    // Скролл 0 → 1 раскручивает объект на два полных оборота по Y и подкручивает по X
    group.current.rotation.y = p * Math.PI * 4;
    group.current.rotation.x = p * Math.PI * 1.5;
    group.current.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.18);
  });

  return (
    <group ref={group}>
      {/* Сплошное металлическое ядро */}
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#141414"
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>

      {/* Светящаяся каркасная оболочка */}
      <mesh scale={1.02}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          wireframe
          color="#D24A43"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Орбитальные осколки для глубины */}
      {debris.map((d, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={d.position} scale={d.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={d.color}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const TechShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2200",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#030303]"
    >
      <div className="absolute inset-0">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} />
          <pointLight position={[-6, -3, 2]} intensity={3} color="#D24A43" />
          <Core progress={progress} />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-14 flex flex-col items-center gap-3 px-6 text-center md:bottom-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D24A43] md:text-xs">
          A&amp;K Core
        </p>
        <h2 className="font-serif text-3xl font-bold italic text-white md:text-5xl">
          Engineered to the core
        </h2>
        <p className="max-w-md text-xs leading-relaxed text-zinc-400 md:text-sm">
          Scroll to see how we assemble every layer of a product — from the
          interface down to the infrastructure.
        </p>
      </div>
    </section>
  );
};
