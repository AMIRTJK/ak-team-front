"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Float, Grid, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollIcon } from "@/shared/ui/Icons";
import localFont from "next/font/local";

// Подключение шрифтов
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

// --- УПРАВЛЕНИЕ КАМЕРОЙ ---
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

// ==========================================
// 🚀 3D ЧАСТИЦЫ ТЕКСТА (ТОЛЬКО ДЛЯ ТЕМЫ КОСМОС)
// ==========================================
const ParticleText = ({ visible }: { visible: boolean }) => {
  const { viewport, pointer } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  const { positions, randoms } = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "900 140px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText("A&K TEAM", canvas.width / 2, canvas.height / 2);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const posArray = [];
      const rndArray = [];

      for (let y = 0; y < canvas.height; y += 3) {
        for (let x = 0; x < canvas.width; x += 3) {
          const index = (x + y * canvas.width) * 4;
          if (imgData[index] > 128) {
            const pX = (x - canvas.width / 2) * 0.012;
            const pY = -(y - canvas.height / 2) * 0.012;
            posArray.push(pX, pY, 0);
            rndArray.push(Math.random());
          }
        }
      }
      return {
        positions: new Float32Array(posArray),
        randoms: new Float32Array(rndArray),
      };
    }
    return { positions: new Float32Array(), randoms: new Float32Array() };
  }, []);

  const uniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    targetMouse.current.x = pointer.x * (viewport.width / 2);
    targetMouse.current.y = pointer.y * (viewport.height / 2);
    currentMouse.current.lerp(targetMouse.current, 0.1);

    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const scale = Math.min(1, viewport.width / 12);

  return (
    <points scale={scale} position={[0, 0, 1]} visible={visible}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          uniform vec2 uMouse;
          uniform float uTime;
          attribute float aRandom;
          varying float vAlpha;

          void main() {
            vec3 pos = position;
            
            // Расстояние до мыши
            float dist = distance(pos.xy, uMouse);
            // Адекватный радиус отталкивания
            float radius = 1.5; 
            
            // ВОЗВРАЩЕНО СТАРОЕ ПОВЕДЕНИЕ (РАЗЛЕТ ЧАСТИЦ)
            if (dist < radius) {
              float force = pow((radius - dist) / radius, 1.5);
              vec2 dir = pos.xy - uMouse;
              if (length(dir) > 0.0) {
                dir = normalize(dir);
              } else {
                dir = vec2(aRandom, aRandom);
              }
              
              // Частицы разлетаются в стороны и выпрыгивают вперед
              pos.xy += dir * force * 1.5 * aRandom;
              pos.z += force * 2.0 * aRandom;
            }

            // Фоновое плавное "дыхание" частиц
            pos.x += sin(uTime * 1.0 + aRandom * 10.0) * 0.02;
            pos.y += cos(uTime * 1.0 + aRandom * 10.0) * 0.02;

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Размер точек
            gl_PointSize = (4.0 * aRandom + 1.5) * (5.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            
            // Прозрачность: частицы гаснут, когда выпрыгивают далеко вперед
            vAlpha = 1.0 - clamp(pos.z * 0.5, 0.0, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            if (length(center) > 0.5) discard;
            float alpha = smoothstep(0.5, 0.2, length(center)) * vAlpha;
            gl_FragColor = vec4(uColor, alpha);
          }
        `}
      />
    </points>
  );
};

// --- ТЕМЫ ФОНА ---
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

// --- ОСНОВНОЙ КОМПОНЕНТ HERO ---
export const Hero = ({
  theme = "cyber",
}: {
  theme?: "stones" | "cyber" | "space";
}) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);

  const bgColors = {
    stones: "bg-[#111111]",
    cyber: "bg-[#0A0A0A]",
    space: "bg-[#000000]",
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

      if (titleContainerRef.current) {
        const rect = titleContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        titleContainerRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
        titleContainerRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`relative w-full h-[100svh] overflow-hidden transition-colors duration-1000 ${bgColors[theme]}`}
    >
      {/* 3D Сцена */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <CameraRig />
          {theme === "stones" && <ThemeStones />}
          {theme === "cyber" && <ThemeCyber />}
          {theme === "space" && <ThemeSpace />}

          {/* Частицы */}
          <ParticleText visible={theme === "space"} />
        </Canvas>
      </div>

      <section className="relative z-10 w-full h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10 pointer-events-none">
        {/* КОНТЕЙНЕР ТЕКСТА (Здесь живет курсор/эффекты) */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            ref={titleContainerRef}
            className="relative will-change-transform flex items-center justify-center text-center select-none w-full h-full"
            style={
              { "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties
            }
          >
            {/* ЕСЛИ ТЕМА КАМНИ/КИБЕР: Показываем эффект фонарика */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${theme === "space" ? "opacity-0" : "opacity-100"}`}
            >
              <h1
                className={`text-white/50 text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] uppercase flex flex-col md:flex-row items-center ${megrimRegular.className}`}
              >
                A&K TEAM
              </h1>
              <h1
                aria-hidden="true"
                className={`absolute inset-0 pointer-events-none text-transparent bg-clip-text text-[20vw] md:text-[14vw] font-[900] tracking-[-0.04em] leading-[0.8] uppercase flex items-center justify-center ${megrimRegular.className}`}
                style={{
                  backgroundImage:
                    "radial-gradient(circle 25vw at var(--mouse-x) var(--mouse-y), rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                A&K TEAM
              </h1>
            </div>

            {/* ВИЗУАЛЬНАЯ ЧЕРНАЯ ДЫРА ДЛЯ КУРСОРА (ТОЛЬКО В КОСМОСЕ) */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${theme === "space" ? "opacity-100" : "opacity-0"}`}
              style={{
                // Черное ядро в центре курсора с фиолетовым свечением по краям (аккреционный диск)
                background:
                  "radial-gradient(circle 8vw at var(--mouse-x) var(--mouse-y), rgba(0,0,0,1) 15%, rgba(60,20,120,0.5) 30%, transparent 60%)",
                mixBlendMode: "normal", // Чтобы черная дыра перекрывала звезды
              }}
            />

            {/* Скрытый текст для Космоса (чтобы сохранить сетку) */}
            <h1 className={`sr-only ${theme !== "space" ? "hidden" : "block"}`}>
              A&K TEAM
            </h1>
          </div>
        </div>

        {/* НИЖНИЙ ИНТЕРФЕЙС */}
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
