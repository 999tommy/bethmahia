"use client";

// ─────────────────────────────────────────────────────────────
// GalaxyScene.tsx
// A million reasons why I love you.
// GPU-instanced star field with tappable personal stars.
// Performance-tiered: 800k / 300k / CSS fallback.
// ─────────────────────────────────────────────────────────────

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { loveConfig } from "../love.config";

// Detect device tier
function getStarCount(): number {
  if (typeof window === "undefined") return 300000;
  const dpr = window.devicePixelRatio;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  if (dpr >= 2 && mem >= 4) return 800000;
  if (dpr >= 1.5 || mem >= 2) return 300000;
  return 80000;
}

// ── Main export ────────────────────────────────────────────
export default function GalaxyScene() {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [starCount, setStarCount] = useState(300000);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const counterProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1000000]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setStarCount(getStarCount());
    // Check WebGL
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("webgl2") || canvas.getContext("webgl");
      if (!ctx) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    return counterProgress.on("change", (v) => {
      setCount(Math.floor(v));
    });
  }, [counterProgress]);

  const handleReasonClick = useCallback((index: number) => {
    setActiveReason(index);
    if ("vibrate" in navigator) navigator.vibrate(25);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "280dvh",
        background: "#070714",
      }}
    >
      {/* Sticky canvas container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            top: "7%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
            pointerEvents: "none",
            width: "90%",
          }}
        >
          <p
            style={{
              fontFamily: "var(--l-font-script)",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              color: "rgba(248,240,227,0.95)",
              textShadow: "0 2px 30px rgba(255,228,160,0.3)",
            }}
          >
            A million reasons why
          </p>
          <p
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
              color: "rgba(201,151,43,0.6)",
              marginTop: 6,
              letterSpacing: "0.1em",
            }}
          >
            tap the bright stars to read each one
          </p>
        </motion.div>

        {/* Counter */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <motion.p
            style={{
              fontFamily: "var(--l-font-mono)",
              fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
              color: "#FFE4A0",
              letterSpacing: "0.08em",
              textShadow: "0 0 20px rgba(255,228,160,0.6)",
            }}
          >
            {count.toLocaleString()}
          </motion.p>
          <p
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 2.2vw, 0.9rem)",
              color: "rgba(255,228,160,0.4)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            and counting
          </p>
        </motion.div>

        {/* WebGL Galaxy or CSS Fallback */}
        {webGLSupported ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 2]}
            style={{ background: "transparent" }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <StarField starCount={starCount} />
            <PersonalStars
              reasons={loveConfig.reasons}
              onReasonClick={handleReasonClick}
            />
            <GalaxyRotation scrollProgress={scrollYProgress} />
          </Canvas>
        ) : (
          <CSSStarFallback onReasonClick={handleReasonClick} />
        )}

        {/* Personal star labels (overlaid as HTML) */}
        <PersonalStarOverlays onReasonClick={handleReasonClick} />
      </div>

      {/* Reason card overlay */}
      <AnimatePresence>
        {activeReason !== null && (
          <motion.div
            className="love-card-overlay"
            style={{ position: "fixed", zIndex: 1000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReason(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="love-paper-aged love-paper-edges"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 320,
                width: "88%",
                padding: "36px 28px",
                borderRadius: 2,
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Star number */}
              <p
                style={{
                  fontFamily: "var(--l-font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--l-gold)",
                  letterSpacing: "0.2em",
                  marginBottom: 16,
                  textTransform: "uppercase",
                }}
              >
                ✦ reason {activeReason + 1} ✦
              </p>
              <p
                style={{
                  fontFamily: "var(--l-font-script)",
                  fontSize: "clamp(1.5rem, 5.5vw, 2rem)",
                  color: "var(--l-ink-sepia)",
                  lineHeight: 1.5,
                }}
              >
                {loveConfig.reasons[activeReason]}
              </p>
              <motion.button
                onClick={() => setActiveReason(null)}
                style={{
                  marginTop: 24,
                  background: "transparent",
                  border: "1px solid rgba(92,61,30,0.3)",
                  borderRadius: 1,
                  padding: "8px 24px",
                  fontFamily: "var(--l-font-body)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "var(--l-ink-faded)",
                  cursor: "pointer",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Background star field (InstancedMesh) ──────────────────
function StarField({ starCount }: { starCount: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(starCount * 3);
    const sz = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 10;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = 0.002 + Math.random() * 0.008;
    }
    return { positions: pos, sizes: sz };
  }, [starCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < starCount; i++) {
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );
      dummy.scale.setScalar(sizes[i] * 50);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      // Vary colour slightly warm/cool
      const warm = Math.random() > 0.7;
      meshRef.current.setColorAt(
        i,
        new THREE.Color(
          warm ? 1.0 : 0.85,
          warm ? 0.92 : 0.88,
          warm ? 0.72 : 1.0
        )
      );
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [starCount, positions, sizes, dummy]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.02;
    meshRef.current.rotation.x += delta * 0.005;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, starCount]}>
      <sphereGeometry args={[0.01, 4, 4]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

// ── Personal bright stars ──────────────────────────────────
function PersonalStars({
  reasons,
  onReasonClick,
}: {
  reasons: string[];
  onReasonClick: (i: number) => void;
}) {
  const { viewport } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const positions = useMemo(() => {
    return reasons.map((_, i) => {
      const angle = (i / reasons.length) * Math.PI * 2;
      const r = 1.5 + (i % 4) * 0.4;
      return new THREE.Vector3(
        r * Math.cos(angle) * (viewport.width / 4),
        r * Math.sin(angle) * (viewport.height / 4),
        -1 + (i % 3) * 0.5
      );
    });
  }, [reasons, viewport]);

  useEffect(() => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      dummy.scale.setScalar(1.2);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, new THREE.Color("#FFE4A0"));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [positions, dummy]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.forEach((pos, i) => {
      dummy.position.copy(pos);
      const pulse = 1.0 + 0.3 * Math.sin(t * 1.5 + i * 0.7);
      dummy.scale.setScalar(pulse);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, reasons.length]}
      onClick={(e) => {
        e.stopPropagation();
        if (e.instanceId !== undefined) onReasonClick(e.instanceId);
      }}
    >
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#FFE4A0" toneMapped={false} />
    </instancedMesh>
  );
}

// ── Auto-rotate galaxy based on scroll ────────────────────
function GalaxyRotation({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const { scene } = useThree();
  useFrame(() => {
    const p = scrollProgress.get();
    scene.rotation.y = p * Math.PI * 0.5;
  });
  return null;
}

// ── HTML overlays for tappable personal stars ──────────────
function PersonalStarOverlays({
  onReasonClick,
}: {
  onReasonClick: (i: number) => void;
}) {
  const reasons = loveConfig.reasons;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10,
      }}
      aria-hidden="true"
    >
      {reasons.map((_, i) => {
        const angle = (i / reasons.length) * Math.PI * 2;
        const r = 28 + (i % 4) * 6;
        const left = 50 + r * Math.cos(angle);
        const top = 50 + r * Math.sin(angle);
        return (
          <button
            key={i}
            onClick={() => onReasonClick(i)}
            aria-label={`Reason ${i + 1}`}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          />
        );
      })}
    </div>
  );
}

// ── CSS fallback for no-WebGL devices ─────────────────────
function CSSStarFallback({
  onReasonClick,
}: {
  onReasonClick: (i: number) => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, #0d0d2b 0%, #070714 100%)",
      }}
    >
      {[...Array(150)].map((_, i) => {
        const left = Math.sin(i * 7.3) * 50 + 50;
        const top = Math.cos(i * 5.1) * 45 + 50;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              borderRadius: "50%",
              background: "#FFE4A0",
              opacity: 0.3 + (i % 5) * 0.1,
              animation: `love-flicker ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        );
      })}
      {loveConfig.reasons.map((_, i) => {
        const angle = (i / loveConfig.reasons.length) * Math.PI * 2;
        const r = 28 + (i % 4) * 7;
        const left = 50 + r * Math.cos(angle);
        const top = 50 + r * Math.sin(angle);
        return (
          <button
            key={i}
            onClick={() => onReasonClick(i)}
            aria-label={`Reason ${i + 1}`}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              transform: "translate(-50%, -50%)",
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#FFE4A0",
              border: "2px solid rgba(255,228,160,0.5)",
              cursor: "pointer",
              boxShadow: "0 0 8px 3px rgba(255,228,160,0.5)",
              animation: `love-heartbeat ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${(i % 5) * 0.3}s`,
            }}
          />
        );
      })}
    </div>
  );
}
