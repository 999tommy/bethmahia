"use client";

// ─────────────────────────────────────────────────────────────
// Letter.tsx
// Aged parchment letter with:
//  - KJV-style love poem revealed line by line as user scrolls
//  - Heartbeat/voice-note animated SVG (inspired by her letter)
//  - Tappable ink blots that reveal hidden phrases
//  - Pressed rose illustration
//  - Scroll-driven text reveal via Intersection Observer
// ─────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { loveConfig } from "../love.config";

interface LetterProps {
  onComplete?: () => void;
}

export default function Letter({ onComplete }: LetterProps) {
  const [revealedBlots, setRevealedBlots] = useState<Set<number>>(new Set());
  const [activeBlot, setActiveBlot] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const isNearBottom = useInView(bottomRef, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isNearBottom && onComplete) {
      setTimeout(onComplete, 800);
    }
  }, [isNearBottom, onComplete]);

  const handleBlotClick = (i: number) => {
    setRevealedBlots((prev) => new Set([...prev, i]));
    setActiveBlot(i);
    if ("vibrate" in navigator) navigator.vibrate(20);
  };

  return (
    <div
      className="love-scene"
      style={{
        minHeight: "auto",
        alignItems: "stretch",
        background: "radial-gradient(ellipse at 50% 0%, #1a0e00 0%, #0a0500 100%)",
        padding: "60px 0",
      }}
    >
      {/* Floating petals background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: "fixed",
            width: 12,
            height: 9,
            borderRadius: `${50 + (i % 3) * 10}% ${20 + i * 5}% ${50 + i * 3}% ${30 + i * 4}%`,
            background: i % 2 === 0 ? "#E8B4B8" : "#C8868E",
            left: `${10 + i * 14}%`,
            top: `${5 + ((i * 19) % 80)}%`,
            opacity: 0.15,
            pointerEvents: "none",
            zIndex: 0,
          }}
          animate={{
            y: [0, 20, 0],
            x: [0, (i % 2 === 0 ? 6 : -6), 0],
            rotate: [i * 30, i * 30 + 12, i * 30],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Parchment paper */}
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -0.5 }}
        animate={{ opacity: 1, y: 0, rotate: -0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="love-paper-aged love-paper-edges"
        style={{
          position: "relative",
          maxWidth: 580,
          width: "calc(100% - 32px)",
          margin: "0 auto",
          padding: "clamp(32px, 8vw, 64px) clamp(24px, 7vw, 56px)",
          borderRadius: 1,
          zIndex: 1,
        }}
      >
        {/* Foxing spots (aged paper marks) */}
        <FoxingSpots />

        {/* Margin flower cluster — top left */}
        <MarginFlower x={-18} y={20} rotate={-15} opacity={0.12} scale={0.7} />
        {/* Margin flower cluster — bottom right */}
        <MarginFlower x="88%" y="75%" rotate={20} opacity={0.1} scale={0.6} />
        {/* Small scattered petals on paper */}
        <PaperPetals />

        {/* Letter lines */}
        <div style={{ position: "relative" }}>
          {loveConfig.letterLines.map((line, i) => (
            <LetterLine key={i} line={line} index={i} />
          ))}

          {/* Ink blots */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 24,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{
                fontFamily: "var(--l-font-body)",
                fontStyle: "italic",
                fontSize: "0.8rem",
                color: "var(--l-ink-faded)",
              }}
            >
              (and more, hidden in the ink...)
            </motion.p>
            {loveConfig.inkBlots.map((blot, i) => (
              <InkBlot
                key={i}
                index={i}
                text={blot}
                revealed={revealedBlots.has(i)}
                onClick={() => handleBlotClick(i)}
              />
            ))}
          </div>
        </div>

        {/* Heartbeat / Voice Note SVG — inspired by her drawing */}
        <HeartbeatSection />

        <div ref={bottomRef} style={{ height: 1 }} />
      </motion.div>

      {/* Ink blot reveal overlay */}
      <AnimatePresence>
        {activeBlot !== null && (
          <motion.div
            className="love-card-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveBlot(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="love-paper-aged"
              style={{
                maxWidth: 320,
                width: "85%",
                padding: "32px 28px",
                borderRadius: 2,
                textAlign: "center",
                position: "relative",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--l-font-script)",
                  fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
                  color: "var(--l-ink-sepia)",
                  lineHeight: 1.5,
                }}
              >
                {activeBlot !== null ? loveConfig.inkBlots[activeBlot] : ""}
              </p>
              <p
                style={{
                  marginTop: 16,
                  fontFamily: "var(--l-font-body)",
                  fontStyle: "italic",
                  fontSize: "0.75rem",
                  color: "var(--l-ink-faded)",
                }}
              >
                tap anywhere to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Single letter line component ───────────────────────────
function LetterLine({
  line,
  index,
}: {
  line: (typeof loveConfig.letterLines)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-5%" });

  if (line.style === "spacer") {
    return <div style={{ height: "1.2em" }} />;
  }

  const styleMap = {
    salutation: {
      fontFamily: "var(--l-font-script)",
      fontSize: "clamp(2rem, 6vw, 2.8rem)",
      color: "var(--l-ink)",
      marginBottom: 8,
    },
    verse: {
      fontFamily: "var(--l-font-body)",
      fontStyle: "italic" as const,
      fontSize: "clamp(1rem, 3vw, 1.15rem)",
      color: "var(--l-ink-sepia)",
      lineHeight: 1.9,
    },
    "verse-indent": {
      fontFamily: "var(--l-font-body)",
      fontStyle: "italic" as const,
      fontSize: "clamp(1rem, 3vw, 1.15rem)",
      color: "var(--l-ink-sepia)",
      lineHeight: 1.9,
      paddingLeft: "clamp(16px, 4vw, 32px)",
    },
    "verse-emphasis": {
      fontFamily: "var(--l-font-display)",
      fontStyle: "italic" as const,
      fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
      color: "var(--l-ink)",
      lineHeight: 1.7,
    },
    closing: {
      fontFamily: "var(--l-font-script)",
      fontSize: "clamp(1.4rem, 4.5vw, 1.8rem)",
      color: "var(--l-ink)",
      marginTop: 16,
    },
    signature: {
      fontFamily: "var(--l-font-script)",
      fontSize: "clamp(2rem, 7vw, 3rem)",
      color: "var(--l-ink)",
      paddingLeft: "clamp(24px, 8vw, 60px)",
    },
  };

  const s = styleMap[line.style as keyof typeof styleMap] || styleMap.verse;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -8 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={s}
    >
      {line.text}
    </motion.div>
  );
}

// ── Ink Blot ───────────────────────────────────────────────
function InkBlot({
  index,
  text: _text,
  revealed,
  onClick,
}: {
  index: number;
  text: string;
  revealed: boolean;
  onClick: () => void;
}) {
  const shapes = [
    "M8 4 Q14 0 18 6 Q22 12 16 16 Q10 20 5 14 Q0 8 8 4Z",
    "M6 3 Q13 0 17 7 Q21 14 14 17 Q7 20 3 13 Q-1 6 6 3Z",
    "M9 2 Q16 0 19 8 Q22 16 15 18 Q8 20 4 12 Q0 4 9 2Z",
  ];

  return (
    <motion.button
      aria-label={`Reveal hidden phrase ${index + 1}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 4,
        position: "relative",
      }}
    >
      <svg width="28" height="22" viewBox="0 0 24 20">
        <motion.path
          d={shapes[index % shapes.length]}
          fill={revealed ? "#C9972B" : "#1A0A00"}
          animate={revealed ? { fill: "#C9972B" } : {}}
          transition={{ duration: 0.4 }}
        />
        {revealed && (
          <motion.path
            d={shapes[index % shapes.length]}
            fill="none"
            stroke="rgba(201,151,43,0.5)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </svg>
    </motion.button>
  );
}

// ── Heartbeat + Voice Note SVG (animated) ─────────────────
function HeartbeatSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-10%" });

  // ECG path that morphs toward voice note bars
  const ecgPath =
    "M0,30 L20,30 L25,30 L30,10 L35,50 L40,30 L50,30 L55,20 L60,40 L65,30 L80,30";
  const voicePath =
    "M0,30 L10,30 L15,18 L20,42 L25,12 L30,48 L35,15 L40,45 L45,22 L50,38 L55,30 L65,30 L70,20 L75,40 L80,30";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: 40,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        borderTop: "1px solid rgba(92,61,30,0.2)",
        paddingTop: 32,
      }}
    >
      {/* Animated heartbeat / voice note signal */}
      <svg
        viewBox="0 0 80 60"
        style={{ width: "min(260px, 70%)", overflow: "visible" }}
        aria-label="A heartbeat and voice signal — this is what it feels like to love you"
      >
        {/* Heartbeat line */}
        <motion.path
          d={ecgPath}
          stroke="#C8868E"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  pathLength: [0, 1, 1, 1],
                  opacity: [0, 1, 1, 0.6],
                  d: [ecgPath, ecgPath, voicePath, ecgPath],
                }
              : {}
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
          }}
        />
        {/* Glow */}
        <motion.path
          d={ecgPath}
          stroke="rgba(200,134,142,0.3)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            isVisible
              ? {
                  pathLength: [0, 1],
                  opacity: [0, 0.4],
                  d: [ecgPath, ecgPath, voicePath, ecgPath],
                }
              : {}
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.3, 0.6, 1],
          }}
        />
        {/* Travelling dot */}
        {isVisible && (
          <motion.circle
            r="2"
            fill="#C8868E"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={ecgPath}
            />
          </motion.circle>
        )}
      </svg>

      {/* Caption */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        style={{
          fontFamily: "var(--l-font-script)",
          fontSize: "clamp(1.1rem, 3.5vw, 1.4rem)",
          color: "var(--l-ink-sepia)",
          textAlign: "center",
          fontStyle: "italic",
        }}
      >
        this is what it feels like to love thee
      </motion.p>
    </motion.div>
  );
}

// ── Foxing spots (aged paper effect) ──────────────────────
function FoxingSpots() {
  const spots = [
    { x: "8%", y: "12%", w: 18, h: 12, r: "60% 40% 55% 45%" },
    { x: "85%", y: "22%", w: 14, h: 10, r: "45% 55% 40% 60%" },
    { x: "5%", y: "55%", w: 22, h: 14, r: "55% 45% 60% 40%" },
    { x: "90%", y: "70%", w: 10, h: 8, r: "50% 50% 50% 50%" },
    { x: "15%", y: "85%", w: 16, h: 11, r: "40% 60% 45% 55%" },
    { x: "75%", y: "90%", w: 12, h: 9, r: "60% 40% 60% 40%" },
  ];

  return (
    <>
      {spots.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.w,
            height: s.h,
            borderRadius: s.r,
            background: `rgba(139, 99, 60, ${0.04 + (i % 3) * 0.025})`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}


// ── Margin rose illustration ───────────────────────────────
function MarginFlower({
  x,
  y,
  rotate,
  opacity,
  scale,
}: {
  x: number | string;
  y: number | string;
  rotate: number;
  opacity: number;
  scale: number;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 80"
      style={{
        position: "absolute",
        left: typeof x === "number" ? x : undefined,
        right: typeof x === "string" ? (100 - parseFloat(x)) + "%" : undefined,
        top: y,
        width: 60 * scale,
        height: 80 * scale,
        opacity,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
      }}
      fill="none"
    >
      {/* Stem */}
      <line x1="30" y1="80" x2="30" y2="30" stroke="#5C7A5C" strokeWidth="2" />
      {/* Left leaf */}
      <path d="M30 60 Q16 52 12 40" stroke="#5C7A5C" strokeWidth="1.5" fill="none" />
      {/* Right leaf */}
      <path d="M30 50 Q44 42 48 30" stroke="#5C7A5C" strokeWidth="1.5" fill="none" />
      {/* Outer petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={30 + 13 * Math.cos((angle * Math.PI) / 180)}
          cy={22 + 13 * Math.sin((angle * Math.PI) / 180)}
          rx="10"
          ry="7"
          fill="#E8B4B8"
          opacity="0.9"
          transform={`rotate(${angle}, ${30 + 13 * Math.cos((angle * Math.PI) / 180)}, ${22 + 13 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      {/* Inner */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => (
        <ellipse
          key={`in-${i}`}
          cx={30 + 8 * Math.cos((angle * Math.PI) / 180)}
          cy={22 + 8 * Math.sin((angle * Math.PI) / 180)}
          rx="7"
          ry="5"
          fill="#C8868E"
          opacity="0.9"
          transform={`rotate(${angle}, ${30 + 8 * Math.cos((angle * Math.PI) / 180)}, ${22 + 8 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <circle cx="30" cy="22" r="5" fill="#8B4A5A" />
    </svg>
  );
}

// ── Scattered paper petals (decorative) ───────────────────
function PaperPetals() {
  const petals = [
    { x: "12%", y: "38%", r: 8, rotate: 22, color: "#E8B4B8" },
    { x: "85%", y: "52%", r: 7, rotate: -15, color: "#C8868E" },
    { x: "20%", y: "68%", r: 9, rotate: 40, color: "#F5D5DA" },
    { x: "78%", y: "20%", r: 6, rotate: -30, color: "#E8B4B8" },
    { x: "60%", y: "80%", r: 8, rotate: 55, color: "#D4A0AA" },
  ];

  return (
    <>
      {petals.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.r,
            height: p.r * 0.7,
            borderRadius: "50% 0 50% 0",
            background: p.color,
            opacity: 0.18,
            transform: `rotate(${p.rotate}deg)`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}
