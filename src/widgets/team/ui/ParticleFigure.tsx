"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Рисуем силуэт-бюст (голова + плечи) на canvas и сэмплируем пиксели в частицы.
function buildBustParticles() {
  const positions: number[] = [];
  const randoms: number[] = [];
  if (typeof document === "undefined") {
    return { positions: new Float32Array(), randoms: new Float32Array() };
  }

  const W = 360;
  const H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { positions: new Float32Array(), randoms: new Float32Array() };

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "white";

  // голова
  ctx.beginPath();
  ctx.ellipse(W / 2, H * 0.3, W * 0.15, H * 0.19, 0, 0, Math.PI * 2);
  ctx.fill();

  // шея + плечи (бюст)
  ctx.beginPath();
  ctx.moveTo(W * 0.16, H * 0.94);
  ctx.quadraticCurveTo(W * 0.2, H * 0.58, W * 0.5, H * 0.56);
  ctx.quadraticCurveTo(W * 0.8, H * 0.58, W * 0.84, H * 0.94);
  ctx.closePath();
  ctx.fill();

  const data = ctx.getImageData(0, 0, W, H).data;
  const scale = 0.014;
  const centerY = H * 0.55;

  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      const idx = (x + y * W) * 4;
      if (data[idx] > 128) {
        positions.push(
          (x - W / 2) * scale,
          -(y - centerY) * scale,
          (Math.random() - 0.5) * 0.3,
        );
        randoms.push(Math.random());
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    randoms: new Float32Array(randoms),
  };
}

export const ParticleFigure = ({ color }: { color: string }) => {
  const { viewport, pointer } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const targetMouse = useRef(new THREE.Vector2(0, 0));
  const currentMouse = useRef(new THREE.Vector2(0, 0));

  const { positions, randoms } = useMemo(() => buildBustParticles(), []);

  const uniforms = useMemo(
    () => ({
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value.set(color);
    }
  }, [color]);

  useFrame((state) => {
    if (!materialRef.current) return;
    targetMouse.current.x = pointer.x * (viewport.width / 2);
    targetMouse.current.y = pointer.y * (viewport.height / 2);
    currentMouse.current.lerp(targetMouse.current, 0.1);
    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y,
        pointer.x * 0.35,
        0.05,
      );
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x,
        -pointer.y * 0.2,
        0.05,
      );
    }
  });

  return (
    <points ref={pointsRef} scale={0.9}>
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
            float dist = distance(pos.xy, uMouse);
            float radius = 1.2;
            if (dist < radius) {
              float force = pow((radius - dist) / radius, 1.5);
              vec2 dir = pos.xy - uMouse;
              if (length(dir) > 0.0) { dir = normalize(dir); } else { dir = vec2(aRandom, aRandom); }
              pos.xy += dir * force * 1.2 * aRandom;
              pos.z += force * 2.0 * aRandom;
            }
            pos.x += sin(uTime + aRandom * 10.0) * 0.02;
            pos.y += cos(uTime + aRandom * 10.0) * 0.02;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = (3.5 * aRandom + 1.5) * (5.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
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
