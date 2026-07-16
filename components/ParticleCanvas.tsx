"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null!);
  const elapsed = useRef(0);

  const [positions, colors] = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#E8B4B8"),
      new THREE.Color("#C8A4D4"),
      new THREE.Color("#8FAF8F"),
      new THREE.Color("#F5D5DA"),
      new THREE.Color("#E8D5F0"),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 4;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  // Use delta accumulation to avoid deprecated THREE.Clock
  useFrame((_, delta) => {
    elapsed.current += delta;
    if (ref.current) {
      ref.current.rotation.y = elapsed.current * 0.04;
      ref.current.rotation.x = Math.sin(elapsed.current * 0.02) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function FloatingOrbs() {
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);
  const meshRef3 = useRef<THREE.Mesh>(null!);
  const elapsed = useRef(0);

  // Use delta accumulation to avoid deprecated THREE.Clock
  useFrame((_, delta) => {
    elapsed.current += delta;
    const t = elapsed.current;
    if (meshRef1.current) {
      meshRef1.current.position.y = Math.sin(t * 0.5) * 0.5;
      meshRef1.current.rotation.z = t * 0.2;
    }
    if (meshRef2.current) {
      meshRef2.current.position.y = Math.sin(t * 0.4 + 1) * 0.4;
      meshRef2.current.rotation.z = -t * 0.15;
    }
    if (meshRef3.current) {
      meshRef3.current.position.y = Math.sin(t * 0.3 + 2) * 0.6;
    }
  });

  return (
    <>
      <mesh ref={meshRef1} position={[-3, 0, -2]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#E8B4B8" transparent opacity={0.25} roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh ref={meshRef2} position={[3.5, 0.5, -3]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#C8A4D4" transparent opacity={0.2} roughness={0.1} metalness={0.1} />
      </mesh>
      <mesh ref={meshRef3} position={[0, -2, -4]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#8FAF8F" transparent opacity={0.2} roughness={0.1} metalness={0.1} />
      </mesh>
    </>
  );
}

export default function ParticleCanvas() {
  return (
    <Canvas
      className="three-canvas"
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#E8B4B8" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#C8A4D4" />
      <FloatingParticles />
      <FloatingOrbs />
    </Canvas>
  );
}
