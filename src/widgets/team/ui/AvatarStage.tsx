"use client";

import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
  useAnimations,
  useFBX,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Сцена с 3D-аватаром, который плавно поворачивается при смене вкладки.
 * Грузит и .glb (useGLTF), и .fbx (useFBX) — определяет по расширению.
 * Нет модели → стилизованный placeholder-манекен.
 * Как появятся аватары: проставить `model` участнику в members.ts.
 */

const TARGET_HEIGHT = 1.6; // целевая высота модели в кадре (юниты)
const FEET_Y = -0.9; // куда ставим «ноги» (на уровень тени/постамента)

/**
 * Авто-подгон любого меша под кадр: масштаб к фикс. высоте + центрирование +
 * посадка ног на FEET_Y. Снимает разницу единиц (FBX в см vs GLB в метрах).
 */
function useFitTransform(object: THREE.Object3D) {
  return useMemo(() => {
    const box = new THREE.Box3().setFromObject(object);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = TARGET_HEIGHT / (size.y || 1);
    const position: [number, number, number] = [
      -center.x * scale,
      FEET_Y - box.min.y * scale,
      -center.z * scale,
    ];
    return { scale, position };
  }, [object]);
}

/**
 * Опускает руки из T-позы вниз. Ориентируется по фактическому направлению кости
 * (child − bone), поэтому работает независимо от того, как повёрнуты локальные оси
 * рига. Рассчитан на стандартный humanoid-скелет (LeftArm/RightArm + ForeArm).
 */
function poseRestArms(root: THREE.Object3D) {
  root.updateWorldMatrix(true, true);
  const pairs: [string, string][] = [
    ["LeftArm", "LeftForeArm"],
    ["RightArm", "RightForeArm"],
  ];
  for (const [boneName, childName] of pairs) {
    const bone = root.getObjectByName(boneName);
    const child = root.getObjectByName(childName);
    if (!bone || !child) continue;

    bone.updateWorldMatrix(true, false);
    child.updateWorldMatrix(true, false);
    const a = new THREE.Vector3().setFromMatrixPosition(bone.matrixWorld);
    const b = new THREE.Vector3().setFromMatrixPosition(child.matrixWorld);
    const currentDir = b.sub(a).normalize();

    // целевое направление: вниз, чуть в свою сторону и чуть вперёд
    const lateral = 0.18 * Math.sign(currentDir.x || 1);
    const desired = new THREE.Vector3(lateral, -1, 0.12).normalize();

    const delta = new THREE.Quaternion().setFromUnitVectors(currentDir, desired);
    const boneWorld = new THREE.Quaternion().setFromRotationMatrix(bone.matrixWorld);
    const newWorld = delta.multiply(boneWorld); // delta * boneWorld
    const parentWorld = new THREE.Quaternion();
    bone.parent?.getWorldQuaternion(parentWorld);
    bone.quaternion.copy(parentWorld.invert().multiply(newWorld));
    bone.updateMatrixWorld(true);
  }
}

function FittedModel({
  object,
  animations,
}: {
  object: THREE.Object3D;
  animations?: THREE.AnimationClip[];
}) {
  const { scale, position } = useFitTransform(object);
  const group = useRef<THREE.Group>(null);
  const { actions, names } = useAnimations(animations ?? [], group);
  const hasClips = names.length > 0;
  const chest = useRef<{ bone: THREE.Object3D; rest: THREE.Quaternion } | null>(null);

  // 1) Если в модель зашит клип (Mixamo idle и т.п.) — играем его, он главнее.
  useEffect(() => {
    if (!hasClips) return;
    const idleName = names.find((n) => /idle|breath|stand/i.test(n)) ?? names[0];
    const action = actions[idleName];
    action?.reset().fadeIn(0.4).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names, hasClips]);

  // 2) Нет клипа → процедурный idle: опускаем руки + готовим грудь для «дыхания».
  useEffect(() => {
    if (hasClips) return;
    poseRestArms(object);
    const c =
      object.getObjectByName("Spine2") ??
      object.getObjectByName("Spine1") ??
      object.getObjectByName("Spine");
    chest.current = c ? { bone: c, rest: c.quaternion.clone() } : null;
    return () => {
      chest.current = null;
    };
  }, [object, hasClips]);

  // Лёгкое дыхание грудью (только в процедурном режиме).
  useFrame((state) => {
    const c = chest.current;
    if (!c) return;
    c.bone.quaternion.copy(c.rest);
    c.bone.rotateX(Math.sin(state.clock.elapsedTime * 1.6) * 0.025);
  });

  // Трансформацию вешаем на ОБёртку, а не на саму модель: useFBX/useGLTF кэшируют
  // объект, и если мутировать его scale/position, при возврате к участнику он
  // меряется уже масштабированным → «прыжок» и обрезанная голова.
  return (
    <group ref={group} scale={scale} position={position}>
      <primitive object={object} />
    </group>
  );
}

function GLBModel({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url);
  return <FittedModel object={scene} animations={animations} />;
}

function FBXModel({ url }: { url: string }) {
  const fbx = useFBX(url);
  return <FittedModel object={fbx} animations={fbx.animations} />;
}

/** Заглушка-манекен из примитивов: читается как фигура, поворот демонстрируется честно. */
function MannequinFallback({ accent }: { accent: string }) {
  const skin = "#d8d8de";
  const cloth = "#17171c";

  return (
    <group>
      {/* голова */}
      <mesh position={[0, 1.18, 0]} scale={[1, 1.12, 1]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.45} metalness={0.05} />
      </mesh>
      {/* шея */}
      <mesh position={[0, 0.96, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.16, 16]} />
        <meshStandardMaterial color={skin} roughness={0.5} />
      </mesh>
      {/* торс */}
      <mesh position={[0, 0.45, 0]}>
        <capsuleGeometry args={[0.27, 0.5, 8, 24]} />
        <meshStandardMaterial color={cloth} roughness={0.55} metalness={0.15} />
      </mesh>
      {/* таз */}
      <mesh position={[0, 0.02, 0]}>
        <capsuleGeometry args={[0.22, 0.14, 8, 20]} />
        <meshStandardMaterial color={cloth} roughness={0.55} metalness={0.12} />
      </mesh>
      {/* руки */}
      {[-1, 1].map((s) => (
        <mesh key={`arm${s}`} position={[s * 0.4, 0.46, 0]} rotation={[0, 0, s * 0.12]}>
          <capsuleGeometry args={[0.085, 0.6, 8, 16]} />
          <meshStandardMaterial color={cloth} roughness={0.55} metalness={0.12} />
        </mesh>
      ))}
      {/* ноги */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={`leg${x}`} position={[x, -0.5, 0]}>
          <capsuleGeometry args={[0.12, 0.58, 8, 16]} />
          <meshStandardMaterial color={cloth} roughness={0.6} metalness={0.1} />
        </mesh>
      ))}
      {/* свечение-постамент */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.88, 0]}>
        <ringGeometry args={[0.72, 0.85, 64]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2.4}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function ModelOrFallback({ accent, modelUrl }: { accent: string; modelUrl?: string }) {
  if (!modelUrl) return <MannequinFallback accent={accent} />;
  return /\.fbx$/i.test(modelUrl) ? <FBXModel url={modelUrl} /> : <GLBModel url={modelUrl} />;
}

/** Ловит ошибки загрузки модели → манекен вместо краша всей сцены (+ лог причины). */
class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[AvatarStage] не удалось загрузить модель:", error);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function RotatingRig({
  accent,
  targetAngle,
  modelUrl,
}: {
  accent: string;
  targetAngle: number;
  modelUrl?: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    // framerate-независимое сглаживание к целевому углу вкладки
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetAngle, 3.5, delta);
    // лёгкое «дыхание»
    g.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.04;
  });

  return (
    <group ref={group}>
      {/* fallback = null: пока модель грузится, НЕ показываем манекен (иначе на
          первой загрузке мелькает «чужая» фигура). Манекен только если модели нет вовсе. */}
      <ModelErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <ModelOrFallback accent={accent} modelUrl={modelUrl} />
        </Suspense>
      </ModelErrorBoundary>
    </group>
  );
}

export const AvatarStage = ({
  accent,
  targetAngle,
  modelUrl,
}: {
  accent: string;
  targetAngle: number;
  modelUrl?: string;
}) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ background: "transparent" }}
    >
      {/* студийный свет: ключ + холодная заливка + акцентный rim */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 4]} intensity={1.5} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#6688ff" />
      <pointLight position={[0, 1.2, -3]} intensity={3} color={accent} distance={8} />

      <RotatingRig accent={accent} targetAngle={targetAngle} modelUrl={modelUrl} />

      <ContactShadows
        position={[0, -0.9, 0]}
        opacity={0.55}
        scale={5}
        blur={2.6}
        far={2.2}
        color="#000000"
      />

      {/* Зажал ЛКМ → вращаешь обзор вокруг аватара. Без зума/пана, вертикаль ограничена. */}
      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        enableDamping
        minPolarAngle={Math.PI * 0.32}
        maxPolarAngle={Math.PI * 0.6}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
};
