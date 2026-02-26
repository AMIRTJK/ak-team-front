"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Float, Grid, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollIcon } from "@/shared/ui/Icons";
import localFont from "next/font/local";

// 1
const aDLaMDisplayRegular = localFont({
  src: "../../../../../public/fonts/ADLaMDisplay-Regular.ttf",
  display: "swap",
});

// 2
const audiowideRegular = localFont({
  src: "../../../../../public/fonts/Audiowide-Regular.ttf",
  display: "swap",
});

// 3
const federoRegular = localFont({
  src: "../../../../../public/fonts/Federo-Regular.ttf",
  display: "swap",
});

// 4
const gurajadaRegular = localFont({
  src: "../../../../../public/fonts/Gurajada-Regular.ttf",
  display: "swap",
});

// 5
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

const ThemeSpace = () => {
  const planets = useMemo(
    () =>
      new Array(40).fill(null).map(() => ({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30 - 10,
        ],
        scale: Math.random() * 1.5 + 0.1,
        color: Math.random() > 0.9 ? "#D24A43" : "#FFFFFF",
      })),
    [],
  );

  return (
    <>
      <fog attach="fog" args={["#000000", 10, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <Stars
        radius={50}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      {planets.map((props, i) => (
        <Float key={i} speed={0.5} rotationIntensity={1} floatIntensity={1}>
          <mesh
            position={new THREE.Vector3(...props.position)}
            scale={props.scale}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={props.color} roughness={0.8} />
          </mesh>
        </Float>
      ))}
    </>
  );
};

export const Hero = ({
  theme = "cyber",
}: {
  theme?: "stones" | "cyber" | "space";
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const bgColors = {
    stones: "bg-[#111111]",
    cyber: "bg-[#0A0A0A]",
    space: "bg-[#000000]",
  };

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
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <CameraRig />
          {theme === "stones" && <ThemeStones />}
          {theme === "cyber" && <ThemeCyber />}
          {theme === "space" && <ThemeSpace />}
        </Canvas>
      </div>

      <section className="relative z-10 w-full h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10 pointer-events-none">
        <div className="flex-1 flex items-center justify-center w-full">
          <h1
            ref={titleRef}
            className={`text-white text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] select-none flex flex-col md:flex-row items-center text-center mix-blend-difference will-change-transform uppercase ${megrimRegular.className}`}
          >
            A&K TEAM
          </h1>
        </div>

        <div className="relative w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-0 h-auto">
          <div className="max-w-full md:max-w-sm lg:max-w-md w-full relative pointer-events-auto">
            <p className="text-[#D24A43] text-[10px] md:text-xs font-bold tracking-[0.2em] mb-2 md:mb-4 uppercase">
              Web Studio
            </p>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif italic font-bold leading-tight mb-3 md:mb-4">
              We craft digital <br className="hidden md:block" /> experiences
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-[90%] md:max-w-full leading-relaxed">
              We engineer the success of your vision through technology and
              innovation.
            </p>
            <div className="w-full h-[1px] bg-transparent mt-5 md:mt-6 border-dashed border-b border-white/20"></div>
          </div>

          <div className="flex flex-col items-center gap-3 w-full justify-center md:w-auto md:absolute md:left-1/2 md:-translate-x-1/2 relative pointer-events-auto">
            <span className="text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
              Scroll to discover
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