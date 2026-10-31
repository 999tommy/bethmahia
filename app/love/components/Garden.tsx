"use client";

// ─────────────────────────────────────────────────────────────
// Garden.tsx
// A rose garden that grows as you scroll.
// Uses CSS + SVG for maximum phone compatibility.
// Roses bloom procedurally; petals drift in wind.
// Long-press/hold a rose to make it bloom.
// ─────────────────────────────────────────────────────────────

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface RoseDef {
  id: number;
  x: number;       // 0-100 (percent)
  delay: number;   // animation delay s
  scale: number;   // 0.6 - 1.4
  hue: number;     // rotation for colour variety
  swaySpeed: number;
}

// Deterministic "random" based on seed
function seededRand(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateRoses(count: number): RoseDef[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 3 + (seededRand(i * 7 + 1) * 94),
    delay: seededRand(i * 3 + 2) * 1.5,
    scale: 0.55 + seededRand(i * 5 + 3) * 0.85,
    hue: seededRand(i * 11 + 4) * 30 - 15,
    swaySpeed: 4 + seededRand(i * 13 + 5) * 5,
  }));
}

const ROSES = generateRoses(28);

export default function Garden() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const gardenProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const [progress, setProgress] = useState(0);
  const [bloomingRose, setBloomingRose] = useState<number | null>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return gardenProgress.on("change", (v) => setProgress(v));
  }, [gardenProgress]);

  const handleRoseHoldStart = useCallback((id: number) => {
    holdTimer.current = setTimeout(() => {
      setBloomingRose(id);
      if ("vibrate" in navigator) navigator.vibrate([20, 10, 20]);
      setTimeout(() => setBloomingRose(null), 2500);
    }, 400);
  }, []);

  const handleRoseHoldEnd = useCallback(() => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  }, []);

  // Sky gradient: dawn (warm gold) → midday (rose) → dusk based on scroll
  const skyBg = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "radial-gradient(ellipse at 50% 0%, #3d1a00 0%, #0a0500 100%)",
      "radial-gradient(ellipse at 50% 0%, #5c2a00 0%, #1a0800 100%)",
      "radial-gradient(ellipse at 50% 0%, #2d0a15 0%, #0d0005 100%)",
      "radial-gradient(ellipse at 50% 100%, #0a0514 0%, #050208 100%)",
    ]
  );

  return (
    <motion.div
      ref={containerRef}
      className="love-scene"
      style={{
        minHeight: "200dvh",
        alignItems: "stretch",
        justifyContent: "flex-end",
        background: skyBg as unknown as string,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          position: "sticky",
          top: "12%",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            fontFamily: "var(--l-font-script)",
            fontSize: "clamp(2rem, 7vw, 3.5rem)",
            color: "rgba(248,240,227,0.9)",
            textShadow: "0 2px 20px rgba(200,134,142,0.4)",
          }}
        >
          A garden, just for thee
        </p>
        <p
          style={{
            fontFamily: "var(--l-font-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
            color: "rgba(201,151,43,0.6)",
            marginTop: 8,
            letterSpacing: "0.1em",
          }}
        >
          hold a rose to make it bloom
        </p>
      </motion.div>

      {/* Fireflies */}
      {[...Array(14)].map((_, i) => (
        <motion.div
          key={`ff-${i}`}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#FFE4A0",
            boxShadow: "0 0 8px 3px rgba(255,228,160,0.6)",
            left: `${5 + seededRand(i * 17) * 90}%`,
            top: `${20 + seededRand(i * 23) * 60}%`,
            zIndex: 5,
            pointerEvents: "none",
          }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [0, -20 - seededRand(i) * 30, 0],
            x: [0, (seededRand(i * 3) - 0.5) * 20, 0],
          }}
          transition={{
            duration: 3 + seededRand(i * 7) * 4,
            repeat: Infinity,
            delay: seededRand(i * 11) * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Ground */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          height: "60dvh",
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Grass / ground gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "25%",
            background:
              "linear-gradient(to top, rgba(20,40,20,0.9) 0%, transparent 100%)",
          }}
        />

        {/* Roses */}
        {ROSES.map((rose) => {
          const roseProgress = Math.max(
            0,
            Math.min(1, (progress - rose.delay * 0.1) * 2)
          );
          return (
            <Rose
              key={rose.id}
              rose={rose}
              progress={roseProgress}
              isBlooming={bloomingRose === rose.id}
              onHoldStart={() => handleRoseHoldStart(rose.id)}
              onHoldEnd={handleRoseHoldEnd}
            />
          );
        })}
      </div>

      {/* Drifting petals */}
      <DriftingPetals count={10} />
    </motion.div>
  );
}

// ── Single Rose ────────────────────────────────────────────
function Rose({
  rose,
  progress,
  isBlooming,
  onHoldStart,
  onHoldEnd,
}: {
  rose: RoseDef;
  progress: number;
  isBlooming: boolean;
  onHoldStart: () => void;
  onHoldEnd: () => void;
}) {
  const stemHeight = 80 + rose.scale * 50;

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 0,
        left: `${rose.x}%`,
        x: "-50%",
        cursor: "pointer",
        zIndex: Math.floor(rose.scale * 3),
        userSelect: "none",
        touchAction: "none",
      }}
      animate={{
        rotate: [0, rose.scale > 1 ? 2 : -1.5, 0],
      }}
      transition={{
        duration: rose.swaySpeed,
        repeat: Infinity,
        ease: "easeInOut",
        delay: rose.delay,
      }}
      onPointerDown={onHoldStart}
      onPointerUp={onHoldEnd}
      onPointerLeave={onHoldEnd}
    >
      <svg
        viewBox={`0 0 60 ${stemHeight + 60}`}
        style={{
          width: `${40 * rose.scale}px`,
          height: `${(stemHeight + 60) * rose.scale}px`,
          filter: isBlooming
            ? `drop-shadow(0 0 12px rgba(232,180,184,0.8)) hue-rotate(${rose.hue}deg)`
            : `hue-rotate(${rose.hue}deg) brightness(${0.7 + progress * 0.3})`,
          transition: "filter 0.3s",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        {/* Stem */}
        <motion.line
          x1="30"
          y1={stemHeight + 55}
          x2="30"
          y2={60}
          stroke="#3D6B3D"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Leaves */}
        {progress > 0.3 && (
          <>
            <motion.path
              d="M30 120 Q14 105 10 90 Q20 98 30 110"
              fill="#4A7A4A"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: progress > 0.4 ? 1 : 0, opacity: progress > 0.4 ? 1 : 0 }}
              style={{ transformOrigin: "30px 110px" }}
            />
            <motion.path
              d="M30 90 Q46 75 50 60 Q40 68 30 80"
              fill="#5C8A5C"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: progress > 0.55 ? 1 : 0, opacity: progress > 0.55 ? 1 : 0 }}
              style={{ transformOrigin: "30px 80px" }}
            />
          </>
        )}

        {/* Rose bloom */}
        <motion.g
          style={{ transformOrigin: "30px 50px" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isBlooming ? [1, 1.3, 1.1] : progress > 0.6 ? 1 : 0,
            opacity: progress > 0.6 ? 1 : 0,
          }}
          transition={{ duration: isBlooming ? 0.8 : 0.5 }}
        >
          {/* Petals outer */}
          {[0, 60, 120, 180, 240, 300].map((angle, pi) => (
            <motion.ellipse
              key={pi}
              cx={30 + 16 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 16 * Math.sin((angle * Math.PI) / 180)}
              rx="12"
              ry="8"
              fill="#E8B4B8"
              opacity="0.85"
              transform={`rotate(${angle}, ${30 + 16 * Math.cos((angle * Math.PI) / 180)}, ${50 + 16 * Math.sin((angle * Math.PI) / 180)})`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: pi * 0.06, duration: 0.4 }}
            />
          ))}
          {/* Inner petals */}
          {[30, 90, 150, 210, 270, 330].map((angle, pi) => (
            <motion.ellipse
              key={`i-${pi}`}
              cx={30 + 10 * Math.cos((angle * Math.PI) / 180)}
              cy={50 + 10 * Math.sin((angle * Math.PI) / 180)}
              rx="9"
              ry="6"
              fill="#C8868E"
              opacity="0.9"
              transform={`rotate(${angle}, ${30 + 10 * Math.cos((angle * Math.PI) / 180)}, ${50 + 10 * Math.sin((angle * Math.PI) / 180)})`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + pi * 0.05, duration: 0.35 }}
            />
          ))}
          {/* Center */}
          <circle cx="30" cy="50" r="8" fill="#A06070" />
          <circle cx="30" cy="50" r="5" fill="#8B4A5A" />
        </motion.g>

        {/* Scattered petals on bloom */}
        <AnimatePresence>
          {isBlooming &&
            [0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <motion.ellipse
                key={`sp-${i}`}
                cx={30}
                cy={50}
                rx="5"
                ry="3"
                fill="#E8B4B8"
                initial={{ opacity: 0.9, cx: 30, cy: 50 }}
                animate={{
                  opacity: 0,
                  cx: 30 + 40 * Math.cos((angle * Math.PI) / 180),
                  cy: 50 + 40 * Math.sin((angle * Math.PI) / 180) + 20,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.05 }}
              />
            ))}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
}

// ── Drifting petals overlay ────────────────────────────────
function DriftingPetals({ count }: { count: number }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: 12,
            height: 9,
            borderRadius: `${40 + (i % 4) * 10}% ${20 + i * 5}% ${50 + i * 3}% ${30 + i * 4}%`,
            background: i % 3 === 0 ? "#E8B4B8" : i % 3 === 1 ? "#C8868E" : "#F5D5DA",
            left: `${seededRand(i * 29) * 100}%`,
            top: "-5%",
            opacity: 0.7,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, (seededRand(i * 31) - 0.5) * 120],
            rotate: [0, seededRand(i * 37) * 720],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 8 + seededRand(i * 41) * 8,
            repeat: Infinity,
            delay: seededRand(i * 43) * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

