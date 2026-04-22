"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

type AICoreSceneProps = {
  className?: string;
};

const GRADIENT_STOPS = [
  { at: 0, color: new THREE.Color("#e0f2fe") },
  { at: 0.26, color: new THREE.Color("#2563eb") },
  { at: 0.62, color: new THREE.Color("#4f46e5") },
  { at: 1, color: new THREE.Color("#7c3aed") },
] as const;

function gradientColor(t: number): THREE.Color {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  const currentIndex = GRADIENT_STOPS.findIndex((stop) => clamped <= stop.at);
  const upperIndex = currentIndex === -1 ? GRADIENT_STOPS.length - 1 : Math.max(currentIndex, 1);
  const lowerStop = GRADIENT_STOPS[upperIndex - 1];
  const upperStop = GRADIENT_STOPS[upperIndex];
  const range = upperStop.at - lowerStop.at || 1;
  const localT = (clamped - lowerStop.at) / range;

  return lowerStop.color.clone().lerp(upperStop.color, localT);
}

function createGradientTorusGeometry(
  radius: number,
  tube: number,
  radialSegments: number,
  tubularSegments: number,
  phaseShift = 0
): THREE.TorusGeometry {
  const geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  const uvAttribute = geometry.attributes.uv;
  const colorArray = new Float32Array(uvAttribute.count * 3);

  for (let index = 0; index < uvAttribute.count; index += 1) {
    const t = (uvAttribute.getX(index) + phaseShift) % 1;
    const color = gradientColor(t);
    colorArray[index * 3] = color.r;
    colorArray[index * 3 + 1] = color.g;
    colorArray[index * 3 + 2] = color.b;
  }

  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
  return geometry;
}

function GradientCoreSphere() {
  const geometry = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(1, 92, 92);
    const positionAttribute = sphereGeometry.attributes.position;
    const colorArray = new Float32Array(positionAttribute.count * 3);
    const tempVector = new THREE.Vector3();

    for (let index = 0; index < positionAttribute.count; index += 1) {
      tempVector.fromBufferAttribute(positionAttribute, index).normalize();

      const latitude = (tempVector.y + 1) * 0.5;
      const swirl = (Math.sin(tempVector.x * 4.3 + tempVector.z * 3.9) + 1) * 0.12;
      const diagonalShift = (tempVector.x + tempVector.z + 2) * 0.08;
      const mappedT = THREE.MathUtils.clamp(latitude * 0.82 + swirl + diagonalShift, 0, 1);
      const color = gradientColor(mappedT);

      colorArray[index * 3] = color.r;
      colorArray[index * 3 + 1] = color.g;
      colorArray[index * 3 + 2] = color.b;
    }

    sphereGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));
    return sphereGeometry;
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry]
  );

  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        vertexColors
        metalness={0.55}
        roughness={0.14}
        clearcoat={1}
        clearcoatRoughness={0.08}
        reflectivity={1}
        transmission={0.22}
        thickness={1}
        ior={1.45}
        emissive="#4f46e5"
        emissiveIntensity={0.16}
      />
    </mesh>
  );
}

type GradientRingProps = {
  meshRef: RefObject<THREE.Mesh | null>;
  radius: number;
  tube: number;
  radialSegments: number;
  tubularSegments: number;
  phaseShift: number;
  rotation: [number, number, number];
  opacity: number;
};

function GradientOrbitRing({
  meshRef,
  radius,
  tube,
  radialSegments,
  tubularSegments,
  phaseShift,
  rotation,
  opacity,
}: GradientRingProps) {
  const geometry = useMemo(
    () => createGradientTorusGeometry(radius, tube, radialSegments, tubularSegments, phaseShift),
    [phaseShift, radialSegments, radius, tube, tubularSegments]
  );

  useEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry]
  );

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={rotation}>
      <meshPhysicalMaterial
        vertexColors
        metalness={0.42}
        roughness={0.27}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        emissive="#6366f1"
        emissiveIntensity={0.16}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

type ParticleCloudProps = {
  color: string;
  count: number;
  radiusMin: number;
  radiusMax: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
};

function ParticleCloud({
  color,
  count,
  radiusMin,
  radiusMax,
  size,
  speedX,
  speedY,
  opacity,
}: ParticleCloudProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = THREE.MathUtils.randFloat(radiusMin, radiusMax);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }

    return arr;
  }, [count, radiusMax, radiusMin]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    pointsRef.current.rotation.y += delta * speedY;
    pointsRef.current.rotation.x += delta * speedX;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={size} transparent opacity={opacity} sizeAttenuation />
    </points>
  );
}

function SoftGlowDots() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const geometry = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = THREE.MathUtils.randFloat(1.45, 3.1);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const color = gradientColor(Math.random());

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const glowGeometry = new THREE.BufferGeometry();
    glowGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    glowGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return glowGeometry;
  }, []);

  useEffect(
    () => () => {
      geometry.dispose();
    },
    [geometry]
  );

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.022;
      pointsRef.current.rotation.x += delta * 0.012;
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 1.4) * 0.09;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        ref={materialRef}
        vertexColors
        size={0.048}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AnimatedOrbitLines() {
  const lineGroupRef = useRef<THREE.Group>(null);
  const lineOneRef = useRef<THREE.Mesh>(null);
  const lineTwoRef = useRef<THREE.Mesh>(null);
  const lineThreeRef = useRef<THREE.Mesh>(null);
  const lineFourRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (lineGroupRef.current) {
      lineGroupRef.current.rotation.y += delta * 0.24;
      lineGroupRef.current.rotation.x += delta * 0.09;
      lineGroupRef.current.rotation.z += delta * 0.05;
    }

    const pulse = 0.39 + Math.sin(state.clock.elapsedTime * 2.1) * 0.09;
    const pulseSecondary = 0.36 + Math.sin(state.clock.elapsedTime * 1.45 + 1.6) * 0.08;
    const pulseTertiary = 0.34 + Math.sin(state.clock.elapsedTime * 1.75 + 2.3) * 0.07;
    const pulseQuaternary = 0.3 + Math.sin(state.clock.elapsedTime * 2.25 + 0.85) * 0.07;

    const lineOneMaterial = lineOneRef.current?.material;
    const lineTwoMaterial = lineTwoRef.current?.material;
    const lineThreeMaterial = lineThreeRef.current?.material;
    const lineFourMaterial = lineFourRef.current?.material;

    if (lineOneMaterial instanceof THREE.MeshBasicMaterial) {
      lineOneMaterial.opacity = pulse;
    }

    if (lineTwoMaterial instanceof THREE.MeshBasicMaterial) {
      lineTwoMaterial.opacity = pulseSecondary;
    }

    if (lineThreeMaterial instanceof THREE.MeshBasicMaterial) {
      lineThreeMaterial.opacity = pulseTertiary;
    }

    if (lineFourMaterial instanceof THREE.MeshBasicMaterial) {
      lineFourMaterial.opacity = pulseQuaternary;
    }
  });

  return (
    <group ref={lineGroupRef}>
      <mesh ref={lineOneRef} rotation={[0.58, 0.3, 0]}>
        <torusGeometry args={[1.37, 0.0044, 12, 230]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.4} />
      </mesh>

      <mesh ref={lineTwoRef} rotation={[-0.42, 1.08, 0.18]}>
        <torusGeometry args={[1.64, 0.0045, 12, 240]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.37} />
      </mesh>

      <mesh ref={lineThreeRef} rotation={[1.2, 0.25, 0.9]}>
        <torusGeometry args={[1.92, 0.0044, 12, 250]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.35} />
      </mesh>

      <mesh ref={lineFourRef} rotation={[-1.05, 0.64, 0.2]}>
        <torusGeometry args={[2.16, 0.0036, 10, 240]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

function OrbitRings() {
  const ringsRef = useRef<THREE.Group>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const ringThreeRef = useRef<THREE.Mesh>(null);
  const ringFourRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.y += delta * 0.25;
      ringsRef.current.rotation.x += delta * 0.08;
    }

    const pulse = 0.27 + Math.sin(state.clock.elapsedTime * 1.5) * 0.07;
    const pulseSecondary = 0.32 + Math.sin(state.clock.elapsedTime * 1.65 + 1.3) * 0.08;
    const pulseTertiary = 0.25 + Math.sin(state.clock.elapsedTime * 1.35 + 2.2) * 0.06;
    const pulseQuaternary = 0.24 + Math.sin(state.clock.elapsedTime * 1.9 + 2.6) * 0.07;

    const ringOneMaterial = ringOneRef.current?.material;
    const ringTwoMaterial = ringTwoRef.current?.material;
    const ringThreeMaterial = ringThreeRef.current?.material;
    const ringFourMaterial = ringFourRef.current?.material;

    if (ringOneMaterial instanceof THREE.MeshPhysicalMaterial) {
      ringOneMaterial.opacity = pulse;
      ringOneMaterial.emissiveIntensity = 0.18 + pulse * 0.22;
    }

    if (ringTwoMaterial instanceof THREE.MeshPhysicalMaterial) {
      ringTwoMaterial.opacity = pulseSecondary;
      ringTwoMaterial.emissiveIntensity = 0.2 + pulseSecondary * 0.24;
    }

    if (ringThreeMaterial instanceof THREE.MeshPhysicalMaterial) {
      ringThreeMaterial.opacity = pulseTertiary;
      ringThreeMaterial.emissiveIntensity = 0.19 + pulseTertiary * 0.2;
    }

    if (ringFourMaterial instanceof THREE.MeshPhysicalMaterial) {
      ringFourMaterial.opacity = pulseQuaternary;
      ringFourMaterial.emissiveIntensity = 0.18 + pulseQuaternary * 0.2;
    }
  });

  return (
    <group ref={ringsRef}>
      <GradientOrbitRing
        meshRef={ringOneRef}
        radius={1.3}
        tube={0.015}
        radialSegments={22}
        tubularSegments={210}
        phaseShift={0}
        rotation={[0.5, 0.2, 0]}
        opacity={0.88}
      />
      <GradientOrbitRing
        meshRef={ringTwoRef}
        radius={1.56}
        tube={0.012}
        radialSegments={22}
        tubularSegments={210}
        phaseShift={0.25}
        rotation={[-0.4, 1.1, 0.15]}
        opacity={0.84}
      />
      <GradientOrbitRing
        meshRef={ringThreeRef}
        radius={1.82}
        tube={0.009}
        radialSegments={20}
        tubularSegments={190}
        phaseShift={0.5}
        rotation={[1.2, 0.3, 0.9]}
        opacity={0.8}
      />
      <GradientOrbitRing
        meshRef={ringFourRef}
        radius={2.06}
        tube={0.007}
        radialSegments={18}
        tubularSegments={190}
        phaseShift={0.74}
        rotation={[-1.08, 0.64, 0.2]}
        opacity={0.76}
      />
    </group>
  );
}

function FloatingPanels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y -= delta * 0.08;
    groupRef.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[1.85, 0.5, 0.2]} rotation={[0.35, 0.2, -0.25]}>
        <boxGeometry args={[0.34, 0.2, 0.045]} />
        <meshStandardMaterial
          color="#93c5fd"
          emissive="#2563eb"
          emissiveIntensity={0.25}
          metalness={0.36}
          roughness={0.28}
        />
      </mesh>
      <mesh position={[-1.7, -0.35, 0.4]} rotation={[-0.2, 0.3, 0.15]}>
        <boxGeometry args={[0.3, 0.18, 0.04]} />
        <meshStandardMaterial
          color="#a5b4fc"
          emissive="#4f46e5"
          emissiveIntensity={0.24}
          metalness={0.34}
          roughness={0.29}
        />
      </mesh>
      <mesh position={[0.2, 1.8, -0.25]} rotation={[0.5, -0.5, 0.18]}>
        <boxGeometry args={[0.22, 0.22, 0.03]} />
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#7c3aed"
          emissiveIntensity={0.22}
          metalness={0.3}
          roughness={0.26}
        />
      </mesh>
    </group>
  );
}

function ReflectiveLights() {
  const movingBlueLightRef = useRef<THREE.PointLight>(null);
  const movingIndigoLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!movingBlueLightRef.current || !movingIndigoLightRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    movingBlueLightRef.current.position.x = Math.cos(t * 0.65) * 2.5;
    movingBlueLightRef.current.position.y = 0.75 + Math.sin(t * 1.15) * 1.05;
    movingBlueLightRef.current.position.z = 2.5 + Math.sin(t * 0.95) * 0.28;
    movingBlueLightRef.current.intensity = 0.88 + Math.sin(t * 1.25) * 0.15;

    movingIndigoLightRef.current.position.x = Math.sin(t * 0.72) * -2.35;
    movingIndigoLightRef.current.position.y = -0.5 + Math.cos(t * 1.04) * 1.1;
    movingIndigoLightRef.current.position.z = 2 + Math.cos(t * 0.8) * 0.2;
    movingIndigoLightRef.current.intensity = 0.74 + Math.sin(t * 1.42 + 1.1) * 0.14;
  });

  return (
    <>
      <pointLight ref={movingBlueLightRef} position={[2.6, 1.1, 2.4]} intensity={0.88} color="#60a5fa" />
      <pointLight ref={movingIndigoLightRef} position={[-2.2, 0.1, 2.1]} intensity={0.72} color="#4f46e5" />
    </>
  );
}

function SphereDepthShadow() {
  const innerShadowRef = useRef<THREE.Mesh>(null);
  const outerShadowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.3) * 0.04;

    if (innerShadowRef.current) {
      innerShadowRef.current.scale.setScalar(pulse);
      const material = innerShadowRef.current.material;
      if (material instanceof THREE.MeshBasicMaterial) {
        material.opacity = 0.28 + Math.sin(t * 1.1) * 0.03;
      }
    }

    if (outerShadowRef.current) {
      outerShadowRef.current.scale.setScalar(1.02 + Math.sin(t * 1.2 + 0.8) * 0.03);
      const material = outerShadowRef.current.material;
      if (material instanceof THREE.MeshBasicMaterial) {
        material.opacity = 0.16 + Math.sin(t * 1 + 0.6) * 0.025;
      }
    }
  });

  return (
    <group position={[0, -1.42, 0]}>
      <mesh ref={outerShadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.92, 64]} />
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.15} depthWrite={false} />
      </mesh>
      <mesh ref={innerShadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <circleGeometry args={[1.46, 64]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.28} depthWrite={false} />
      </mesh>
    </group>
  );
}

function CoreModel() {
  const coreGroupRef = useRef<THREE.Group>(null);
  const coreShellRef = useRef<THREE.Group>(null);
  const auraLayerOneRef = useRef<THREE.Mesh>(null);
  const auraLayerTwoRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!coreGroupRef.current) {
      return;
    }

    const targetX = -state.pointer.y * 0.36;
    const targetY = state.pointer.x * 0.56;
    const targetPosX = state.pointer.x * 0.2;
    const targetPosY = Math.sin(state.clock.elapsedTime * 1.15) * 0.08 - state.pointer.y * 0.14;
    const targetPosZ = state.pointer.x * 0.06;

    coreGroupRef.current.rotation.x = THREE.MathUtils.lerp(coreGroupRef.current.rotation.x, targetX, 0.08);
    coreGroupRef.current.rotation.y = THREE.MathUtils.lerp(coreGroupRef.current.rotation.y, targetY, 0.08);
    coreGroupRef.current.position.x = THREE.MathUtils.lerp(coreGroupRef.current.position.x, targetPosX, 0.08);
    coreGroupRef.current.position.y = THREE.MathUtils.lerp(coreGroupRef.current.position.y, targetPosY, 0.08);
    coreGroupRef.current.position.z = THREE.MathUtils.lerp(coreGroupRef.current.position.z, targetPosZ, 0.08);

    if (coreShellRef.current) {
      coreShellRef.current.rotation.y += delta * 0.35;
      coreShellRef.current.rotation.x += delta * 0.14;
    }

    if (auraLayerOneRef.current) {
      auraLayerOneRef.current.rotation.y -= delta * 0.2;
      auraLayerOneRef.current.rotation.z += delta * 0.07;
    }

    if (auraLayerTwoRef.current) {
      auraLayerTwoRef.current.rotation.y += delta * 0.12;
      auraLayerTwoRef.current.rotation.x -= delta * 0.06;
    }
  });

  return (
    <Float speed={1.45} rotationIntensity={0.24} floatIntensity={0.74}>
      <group ref={coreGroupRef}>
        <group ref={coreShellRef}>
          <GradientCoreSphere />
        </group>

        <mesh ref={auraLayerOneRef} scale={1.12}>
          <sphereGeometry args={[1, 56, 56]} />
          <meshPhysicalMaterial
            color="#c4b5fd"
            transparent
            opacity={0.2}
            transmission={0.92}
            roughness={0.06}
            metalness={0.12}
            thickness={0.95}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            reflectivity={0.9}
          />
        </mesh>

        <mesh ref={auraLayerTwoRef} scale={1.28}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} />
        </mesh>

        <OrbitRings />
        <AnimatedOrbitLines />
        <SoftGlowDots />
        <ParticleCloud
          color="#93c5fd"
          count={430}
          radiusMin={1.6}
          radiusMax={2.45}
          size={0.024}
          speedX={0.024}
          speedY={0.048}
          opacity={0.56}
        />
        <ParticleCloud
          color="#c4b5fd"
          count={320}
          radiusMin={1.9}
          radiusMax={2.75}
          size={0.021}
          speedX={0.017}
          speedY={0.032}
          opacity={0.45}
        />
        <SphereDepthShadow />
        <FloatingPanels />
      </group>
    </Float>
  );
}

export default function AICoreScene({ className }: AICoreSceneProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 4.5], fov: 47 }}
      >
        <color attach="background" args={["#04091c"]} />
        <fog attach="fog" args={["#0a1231", 4.5, 8.9]} />
        <ambientLight intensity={0.42} />
        <hemisphereLight args={["#bfdbfe", "#312e81", 0.72]} />
        <directionalLight position={[2.9, 2.6, 3]} intensity={1.04} color="#93c5fd" />
        <pointLight position={[-2.4, -0.9, 2.2]} intensity={1.02} color="#2563eb" />
        <pointLight position={[2.2, 0.4, 2.4]} intensity={0.88} color="#4f46e5" />
        <spotLight position={[0, 3.8, 3.2]} intensity={0.62} angle={0.4} penumbra={0.68} color="#7c3aed" />
        <ReflectiveLights />
        <CoreModel />
      </Canvas>
    </div>
  );
}
