"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Float, Grid, Stars } from "@react-three/drei";
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

const ParticleText = ({ visible }: { visible: boolean }) => {
  const { viewport, pointer } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
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
      uScale: { value: 1.0 },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    // Lock position and rotation to the camera to keep text centered
    if (pointsRef.current) {
      pointsRef.current.position.copy(state.camera.position);
      pointsRef.current.rotation.copy(state.camera.rotation);
      pointsRef.current.translateZ(-4);
    }

    targetMouse.current.x = pointer.x * (viewport.width / 2);
    targetMouse.current.y = pointer.y * (viewport.height / 2);
    currentMouse.current.lerp(targetMouse.current, 0.15);

    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    materialRef.current.uniforms.uScale.value = scale;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  const scale = Math.min(0.65, viewport.width / 18);

  return (
    <points ref={pointsRef} scale={scale} visible={visible}>
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
          uniform float uScale;
          uniform float uTime;
          attribute float aRandom;
          varying float vAlpha;
          varying float vRandom;
          
          void main() {
            vRandom = aRandom;
            vec3 pos = position;
            
            // World-space distance to black hole
            float dist = distance(pos.xy * uScale, uMouse);
            float radius = 2.0; 
            if (dist < radius) {
              float force = pow((radius - dist) / radius, 2.0);
              vec2 toMouse = uMouse - pos.xy * uScale;
              float len = length(toMouse);
              vec2 dir = len > 0.0 ? toMouse / len : vec2(0.0);
              vec2 swirl = vec2(-dir.y, dir.x);
              
              // Displace in world space (divide by uScale to convert to local coordinates)
              pos.xy += (dir * force * 0.8 + swirl * force * 1.2) / uScale;
              pos.z -= (force * 1.5) / uScale;
            }
            
            pos.x += sin(uTime * 0.5 + aRandom * 10.0) * 0.03;
            pos.y += cos(uTime * 0.5 + aRandom * 10.0) * 0.03;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            float sizeMultiplier = 1.0;
            if (aRandom > 0.8) {
              sizeMultiplier = 3.5;
            } else if (aRandom > 0.55) {
              sizeMultiplier = 2.0;
            }
            
            gl_PointSize = (4.0 * aRandom + 1.5) * sizeMultiplier * (5.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
            
            // Event horizon fade-out in world space (fade between 0.22 and 0.14, event horizon is at 0.19)
            float displacedWorldDist = distance(pos.xy * uScale, uMouse);
            float eventHorizonFade = smoothstep(0.14, 0.22, displacedWorldDist);
            vAlpha = eventHorizonFade * (1.0 - clamp(abs(pos.z * uScale) * 0.2, 0.0, 1.0));
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uTime;
          varying float vAlpha;
          varying float vRandom;
          
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float distToCenter = length(center);
            if (distToCenter > 0.5) discard;
            
            vec2 p = center * 2.0;
            float r = length(p);
            
            vec3 finalColor = uColor;
            float finalAlpha = vAlpha;
            
            if (vRandom > 0.4) {
              // --- BRIGHT GLOWING STARS ---
              float twinkle = sin(uTime * (3.0 + vRandom * 5.0) + vRandom * 50.0) * 0.4 + 0.6;
              float spike = exp(-abs(p.x) * 12.0 - abs(p.y) * 1.5) + exp(-abs(p.y) * 12.0 - abs(p.x) * 1.5);
              float centerGlow = exp(-r * 3.0);
              
              float starIntensity = (centerGlow + spike * 0.6) * twinkle;
              
              vec3 starColor = vec3(1.0);
              if (vRandom > 0.8) {
                // Blue giant star
                starColor = vec3(0.55, 0.8, 1.0);
              } else if (vRandom > 0.6) {
                // Yellow/gold star
                starColor = vec3(1.0, 0.9, 0.7);
              } else {
                // Red/orange star
                starColor = vec3(1.0, 0.7, 0.65);
              }
              
              finalColor = starColor;
              finalAlpha *= starIntensity;
              
            } else {
              // --- BACKGROUND DUST ---
              float twinkle = sin(uTime * 6.0 + vRandom * 100.0) * 0.5 + 0.5;
              float glow = exp(-r * 4.0);
              
              finalColor = vec3(0.9, 0.95, 1.0);
              finalAlpha *= glow * twinkle * 0.8;
            }
            
            gl_FragColor = vec4(finalColor, finalAlpha);
          }
        `}
      />
    </points>
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

const SpacePlanet = ({
  position,
  scale,
  type,
}: {
  position: [number, number, number];
  scale: number;
  type: "gas" | "ice" | "ringed" | "asteroid";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={position}>
      {type === "asteroid" ? (
        <mesh ref={meshRef} scale={scale}>
          <dodecahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#5a4d41"
            roughness={0.95}
            metalness={0.1}
            flatShading
          />
        </mesh>
      ) : type === "ringed" ? (
        <group scale={scale}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#e2bf7d"
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.5, 0, 0]} ref={ringRef}>
            <ringGeometry args={[1.4, 2.3, 64]} />
            <meshStandardMaterial
              color="#a88c52"
              roughness={0.8}
              transparent
              opacity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ) : type === "ice" ? (
        <mesh ref={meshRef} scale={scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#4ba3e3"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ) : (
        <mesh ref={meshRef} scale={scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial
            color="#d24a43"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      )}
    </group>
  );
};

const ThemeSpace = () => {
  const planets = useMemo(() => {
    const list = [];
    const types: ("gas" | "ice" | "ringed" | "asteroid")[] = ["gas", "ice", "ringed", "asteroid"];
    for (let i = 0; i < 30; i++) {
      const type = types[i % types.length];
      list.push({
        id: i,
        position: [
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 45,
          (Math.random() - 0.5) * 35 - 15,
        ] as [number, number, number],
        scale: type === "asteroid"
          ? Math.random() * 0.6 + 0.3
          : Math.random() * 1.2 + 0.4,
        type,
      });
    }
    return list;
  }, []);

  return (
    <>
      <fog attach="fog" args={["#000000", 10, 35]} />
      <ambientLight intensity={0.6} />
      <pointLight position={[15, 15, 15]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-15, -15, -15]} intensity={1.5} color="#3c1478" />
      <Stars
        radius={50}
        depth={50}
        count={3500}
        factor={5}
        saturation={0.5}
        fade
        speed={1.2}
      />
      {planets.map((props) => (
        <Float key={props.id} speed={0.4} rotationIntensity={1} floatIntensity={1}>
          <SpacePlanet
            position={props.position}
            scale={props.scale}
            type={props.type}
          />
        </Float>
      ))}
    </>
  );
};

const BlackHole = ({ visible }: { visible: boolean }) => {
  const { viewport, pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const diskRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);

  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state) => {
    if (!groupRef.current) return;

    targetMouse.current.x = pointer.x * (viewport.width / 2);
    targetMouse.current.y = pointer.y * (viewport.height / 2);
    currentMouse.current.lerp(targetMouse.current, 0.15);

    groupRef.current.position.copy(state.camera.position);
    groupRef.current.rotation.copy(state.camera.rotation);

    groupRef.current.translateZ(-4);
    groupRef.current.translateX(currentMouse.current.x);
    groupRef.current.translateY(currentMouse.current.y);

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  if (!visible) return null;

  return (
    <group ref={groupRef}>
      {/* 1. Outer Swirling Accretion Disk (Procedural Shader with Doppler Beaming) */}
      <mesh ref={diskRef} position={[0, 0, -0.05]}>
        <ringGeometry args={[0.25, 0.9, 64]} />
        <shaderMaterial
          ref={shaderRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          vertexShader={`
            varying vec3 vPosition;
            void main() {
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vPosition;
            uniform float uTime;
            
            void main() {
              float r = length(vPosition.xy);
              float angle = atan(vPosition.y, vPosition.x);
              
              // Swirling flow pattern (spiral accretion)
              float swirl = angle - uTime * 2.5 - r * 8.0;
              float noise = sin(swirl * 4.0) * cos(swirl * 2.0 - r * 4.0) * 0.5 + 0.5;
              
              float innerR = 0.25;
              float outerR = 0.9;
              float intensity = smoothstep(innerR, innerR + 0.08, r) * smoothstep(outerR, outerR - 0.15, r);
              
              // Relativistic Doppler Shift simulation
              // The side moving towards us (right side, x > 0) is brighter and shifted towards hot yellow/white.
              // The side moving away (left side, x < 0) is dimmer and shifted towards cooler red.
              float doppler = 1.0 + (vPosition.x / (r + 0.001)) * 0.45;
              
              // Apply doppler effect to accretion disk intensity
              intensity *= doppler;
              
              // Color gradient: hot yellow-white at inner edge, dark red-brown at outer edge
              float tColor = (r - innerR) / (outerR - innerR);
              
              // Doppler-affected colors: shifting inner/outer colors based on velocity
              vec3 colorInner = mix(vec3(1.0, 0.4, 0.0), vec3(1.0, 0.95, 0.8), clamp(doppler - 0.6, 0.0, 1.0));
              vec3 colorOuter = mix(vec3(0.3, 0.02, 0.0), vec3(0.8, 0.2, 0.0), clamp(doppler - 0.6, 0.0, 1.0));
              vec3 baseColor = mix(colorInner, colorOuter, tColor);
              
              // Add swirling hot plasma flares (modulated by Doppler)
              baseColor = mix(baseColor, vec3(1.0, 0.95, 0.7), noise * 0.4 * doppler);
              
              gl_FragColor = vec4(baseColor, intensity * (0.4 + noise * 0.6));
            }
          `}
        />
      </mesh>

      {/* 2. Inner Gravitational Lensing Halo (White-hot lensed light ring) */}
      <mesh position={[0, 0, -0.04]}>
        <ringGeometry args={[0.2, 0.27, 64]} />
        <meshBasicMaterial
          color="#ffe066"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 3. Event Horizon */}
      <mesh scale={0.19} position={[0, 0, -0.08]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      
      {/* 4. Corona Glow (Warm reddish-orange cosmic dust halo) */}
      <mesh scale={1.3} position={[0, 0, -0.1]}>
        <ringGeometry args={[0.0, 1.0, 32]} />
        <meshBasicMaterial
          color="#aa2200"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

export const Hero = ({
  theme = "cyber",
}: {
  theme?: "stones" | "cyber" | "space";
}) => {
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

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

      if (theme === "space" && titleContainerRef.current) {
        const rect = titleContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        titleContainerRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
        titleContainerRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [theme]);

  return (
    <div
      className={`relative w-full h-[100svh] overflow-hidden transition-colors duration-1000 ${bgColors[theme]}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <CameraRig />
          {theme === "stones" && <ThemeStones />}
          {theme === "cyber" && <ThemeCyber />}
          {theme === "space" && <ThemeSpace />}
          <ParticleText visible={theme === "space"} />
          <BlackHole visible={theme === "space"} />
        </Canvas>
      </div>

      {/* Растушёвка низа Hero в тёмный #050505 — бесшовный стык со следующей секцией (About) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[22vh] bg-gradient-to-b from-transparent to-[#050505]" />

      <section className="relative z-10 w-full h-full flex flex-col justify-between pt-28 pb-8 md:pt-32 md:pb-10 pointer-events-none">
        <div className="flex-1 flex items-center justify-center w-full">
          <div
            ref={titleContainerRef}
            className="relative will-change-transform flex items-center justify-center text-center select-none w-full h-full"
            style={
              { "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties
            }
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

            {theme === "space" && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background:
                    "radial-gradient(circle 12vw at var(--mouse-x) var(--mouse-y), rgba(60,20,120,0.2) 0%, rgba(0,0,0,0) 70%)",
                  mixBlendMode: "normal",
                }}
              />
            )}

            <h1 className={`sr-only ${theme !== "space" ? "hidden" : "block"}`}>
              A&K TEAM
            </h1>
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
