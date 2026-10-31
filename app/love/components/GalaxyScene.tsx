"use client";

// ─────────────────────────────────────────────────────────────
// GalaxyScene.tsx — A million reasons why I love you.
//
// FIXED:
// - No more huge empty scroll buffer. Scene is 100dvh, self-contained.
// - Counter animates on a timer, not scroll-driven (works on all devices).
// - All text/UI fully centered, no overflow issues.
// - WebGL star field fills the whole screen.
// - CSS fallback for no-WebGL devices.
// ─────────────────────────────────────────────────────────────

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../love.config";

function getStarCount(): number {
  if (typeof window === "undefined") return 150000;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const dpr = window.devicePixelRatio ?? 1;
  if (dpr >= 2 && mem >= 4) return 600000;
  if (mem >= 2) return 200000;
  return 60000;
}

// ── Main ───────────────────────────────────────────────────
export default function GalaxyScene({ onAdvance }: { onAdvance?: () => void }) {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [starCount, setStarCount] = useState(150000);
  const [activeReason, setActiveReason] = useState<number | null>(null);
  const [count, setCount] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Detect WebGL + star count on mount
  useEffect(() => {
    setStarCount(getStarCount());
    try {
      const c = document.createElement("canvas");
      const ctx = c.getContext("webgl2") || c.getContext("webgl");
      if (!ctx) setWebGLSupported(false);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // Intersection observer — start counter when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasEntered(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animated counter 0 → 1,000,000 over ~4 seconds
  useEffect(() => {
    if (!hasEntered) return;
    const target = 1000000;
    const duration = 4000;
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [hasEntered]);

  const handleReasonClick = useCallback((index: number) => {
    setActiveReason(index);
    if ("vibrate" in navigator) navigator.vibrate(25);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        background: "#070714",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── Star field (WebGL or CSS) ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        {webGLSupported ? (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            dpr={[1, 2]}
            style={{ width: "100%", height: "100%", background: "transparent" }}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <StarField count={starCount} />
            <AutoRotate />
          </Canvas>
        ) : (
          <CSSStarField />
        )}
      </div>

      {/* ── Tappable personal star buttons (HTML overlay) ── */}
      <PersonalStarButtons onReasonClick={handleReasonClick} />

      {/* ── UI overlay — fully centered ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
          padding: "8% 24px 10%",
          pointerEvents: "none",
        }}
      >
        {/* Top: section title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : -20 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center" }}
        >
          <p
            style={{
              fontFamily: "var(--l-font-script)",
              fontSize: "clamp(2rem, 7vw, 3.5rem)",
              color: "rgba(248,240,227,0.95)",
              textShadow: "0 2px 30px rgba(255,228,160,0.25)",
              lineHeight: 1.2,
            }}
          >
            A million reasons why
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: hasEntered ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 2.3vw, 0.95rem)",
              color: "rgba(201,151,43,0.55)",
              marginTop: 8,
              letterSpacing: "0.1em",
            }}
          >
            tap the bright stars to read each one
          </motion.p>
        </motion.div>

        {/* Bottom: counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: hasEntered ? 1 : 0, y: hasEntered ? 0 : 20 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ textAlign: "center" }}
        >
          <motion.p
            style={{
              fontFamily: "var(--l-font-mono)",
              fontSize: "clamp(2rem, 8vw, 3rem)",
              color: "#FFE4A0",
              letterSpacing: "0.05em",
              textShadow: "0 0 24px rgba(255,228,160,0.5)",
            }}
          >
            {count.toLocaleString()}
          </motion.p>
          <p
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 2.2vw, 0.9rem)",
              color: "rgba(255,228,160,0.35)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            and counting
          </p>
          {onAdvance && (
            <motion.button
              onClick={onAdvance}
              initial={{ opacity: 0 }}
              animate={{ opacity: hasEntered ? 1 : 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: 16,
                background: "transparent",
                border: "1px solid rgba(201,151,43,0.35)",
                borderRadius: 2,
                padding: "9px 24px",
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.8rem, 2.3vw, 0.92rem)",
                color: "rgba(255,228,160,0.75)",
                cursor: "pointer",
                letterSpacing: "0.08em",
                pointerEvents: "auto",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Walk through our story ↓
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* ── Reason card overlay ── */}
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
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="love-paper-aged love-paper-edges"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 320,
                width: "88%",
                padding: "36px 28px",
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--l-font-mono)",
                  fontSize: "0.68rem",
                  color: "var(--l-gold)",
                  letterSpacing: "0.22em",
                  marginBottom: 18,
                  textTransform: "uppercase",
                }}
              >
                ✦ reason {activeReason + 1} of {loveConfig.reasons.length} ✦
              </p>
              <p
                style={{
                  fontFamily: "var(--l-font-script)",
                  fontSize: "clamp(1.4rem, 5.5vw, 1.9rem)",
                  color: "var(--l-ink-sepia)",
                  lineHeight: 1.55,
                }}
              >
                {loveConfig.reasons[activeReason]}
              </p>
              <motion.button
                onClick={() => setActiveReason(null)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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

// ── R3F Star field ─────────────────────────────────────────
function StarField({ count }: { count: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 9;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Warm vs cool tint
      const warm = Math.random() > 0.65;
      col[i * 3]     = warm ? 1.0 : 0.80;
      col[i * 3 + 1] = warm ? 0.90 : 0.85;
      col[i * 3 + 2] = warm ? 0.70 : 1.0;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useEffect(() => {
    if (!meshRef.current) return;
    const size = 0.006 + Math.random() * 0.012;
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions[i*3], positions[i*3+1], positions[i*3+2]);
      dummy.scale.setScalar((0.4 + Math.random() * 0.8) * 50 * size);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(colors[i*3], colors[i*3+1], colors[i*3+2]));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, [count, positions, colors, dummy]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.018;
    meshRef.current.rotation.x += delta * 0.004;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.008, 4, 4]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

// ── Personal stars as bright glowing spheres ───────────────
function AutoRotate() {
  const { scene } = useThree();
  useFrame(({ clock }) => {
    scene.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.3;
  });
  return null;
}

// ── HTML personal star buttons — scattered across viewport ──
function PersonalStarButtons({ onReasonClick }: { onReasonClick: (i: number) => void }) {
  const reasons = loveConfig.reasons;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 15 }}>
      {reasons.map((_, i) => {
        // Scatter in a donut ring — avoid very edges and center title
        const angle = (i / reasons.length) * Math.PI * 2 + 0.4;
        const radiusX = 22 + (i % 5) * 4;
        const radiusY = 18 + (i % 4) * 3;
        const left = 50 + radiusX * Math.cos(angle);
        const top  = 52 + radiusY * Math.sin(angle);
        const size = 10 + (i % 3) * 4;
        return (
          <motion.button
            key={i}
            onClick={() => onReasonClick(i)}
            aria-label={`Reason ${i + 1}: tap to read`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: (i % 7) * 0.3,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              left: `${Math.max(5, Math.min(93, left))}%`,
              top:  `${Math.max(22, Math.min(80, top))}%`,
              x: "-50%",
              y: "-50%",
              width: size,
              height: size,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #FFFFFF, #FFE4A0)",
              boxShadow: `0 0 ${size}px ${size * 0.6}px rgba(255,228,160,0.45)`,
              border: "none",
              cursor: "pointer",
              pointerEvents: "auto",
              padding: 0,
            }}
          />
        );
      })}
    </div>
  );
}

// ── CSS fallback star field ────────────────────────────────
function CSSStarField() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, #0d0d2b 0%, #070714 100%)",
      }}
    >
      {[...Array(200)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${(Math.sin(i * 7.3) * 50 + 50).toFixed(1)}%`,
            top:  `${(Math.cos(i * 5.1) * 45 + 50).toFixed(1)}%`,
            width:  1 + (i % 3),
            height: 1 + (i % 3),
            borderRadius: "50%",
            background: "#FFE4A0",
            opacity: 0.2 + (i % 5) * 0.1,
            animation: `love-flicker ${3 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i % 7) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
