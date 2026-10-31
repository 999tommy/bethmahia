"use client";

// ─────────────────────────────────────────────────────────────
// Envelope.tsx
// A vintage envelope with a wax seal. Tap/click the seal
// to crack it open, unfold the flap, and reveal the letter.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../love.config";

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  const [phase, setPhase] = useState<"idle" | "cracking" | "opening" | "open">(
    "idle"
  );

  const handleSealClick = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("cracking");
    // Haptic on mobile
    if ("vibrate" in navigator) navigator.vibrate([30, 20, 10]);
    setTimeout(() => setPhase("opening"), 700);
    setTimeout(() => setPhase("open"), 1400);
    setTimeout(() => onOpen(), 2200);
  }, [phase, onOpen]);

  return (
    <div
      className="love-scene"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, #1a0e00 0%, #0a0500 100%)",
        cursor: phase === "idle" ? "default" : "default",
      }}
    >
      {/* Ambient dust particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            borderRadius: "50%",
            background: "#C9972B",
            left: `${5 + i * 8}%`,
            top: `${20 + ((i * 13) % 60)}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -30 - i * 3, -60],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.6,
          }}
        />
      ))}

      {/* Prompt text */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              position: "absolute",
              top: "15%",
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 3vw, 1.1rem)",
              color: "rgba(201,151,43,0.6)",
              letterSpacing: "0.1em",
              textAlign: "center",
              padding: "0 24px",
            }}
          >
            Something arrived for you
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          width: "min(340px, 88vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Envelope body */}
        <motion.div
          animate={
            phase === "idle"
              ? { y: [0, -6, 0], rotate: [0, 0.3, -0.3, 0] }
              : {}
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: "100%", position: "relative" }}
        >
          <svg
            viewBox="0 0 340 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.7))" }}
          >
            {/* Envelope back */}
            <rect x="0" y="30" width="340" height="210" rx="3" fill="#D4B896" />

            {/* Flap — animated open */}
            <motion.path
              d="M0 30 L170 140 L340 30 L340 30 L0 30Z"
              fill="#C9A87A"
              stroke="#B89060"
              strokeWidth="0.5"
              style={{ transformOrigin: "170px 30px" }}
              animate={
                phase === "opening" || phase === "open"
                  ? { rotateX: -175 }
                  : { rotateX: 0 }
              }
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Left triangle */}
            <path d="M0 30 L0 240 L170 140 Z" fill="#BFA07A" />
            {/* Right triangle */}
            <path d="M340 30 L340 240 L170 140 Z" fill="#BFA07A" />
            {/* Bottom */}
            <path d="M0 240 L170 140 L340 240 Z" fill="#C9A87A" />

            {/* Postmark */}
            <circle
              cx="295"
              cy="60"
              r="28"
              stroke="#8B6347"
              strokeWidth="1"
              strokeDasharray="3 2"
              fill="none"
            />
            <text
              x="295"
              y="55"
              textAnchor="middle"
              fill="#8B6347"
              fontSize="5"
              fontFamily="serif"
              fontStyle="italic"
            >
              Sent from
            </text>
            <text
              x="295"
              y="63"
              textAnchor="middle"
              fill="#8B6347"
              fontSize="4.5"
              fontFamily="serif"
            >
              the heart
            </text>
            <text
              x="295"
              y="71"
              textAnchor="middle"
              fill="#8B6347"
              fontSize="4"
              fontFamily="serif"
            >
              13.05.2024
            </text>

            {/* Postage stamp outline */}
            <rect
              x="264"
              y="32"
              width="30"
              height="36"
              rx="1"
              fill="#F8F0E3"
              stroke="#8B6347"
              strokeWidth="1"
              strokeDasharray="2 1.5"
            />
            <rect x="267" y="35" width="24" height="30" rx="0.5" fill="#E8B4B8" opacity="0.7" />
            <text x="279" y="53" textAnchor="middle" fill="#8B6347" fontSize="10">
              ♡
            </text>

            {/* Envelope body shade line */}
            <line x1="1" y1="30" x2="339" y2="30" stroke="#B89060" strokeWidth="0.5" />
          </svg>

          {/* Wax seal — layered SVG on top of the envelope */}
          <motion.button
            onClick={handleSealClick}
            aria-label="Break the seal and open the letter"
            className="love-seal"
            style={{
              position: "absolute",
              bottom: "18%",
              left: "50%",
              transform: "translateX(-50%)",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              width: 72,
              height: 72,
            }}
            whileHover={phase === "idle" ? { scale: 1.08 } : {}}
            whileTap={phase === "idle" ? { scale: 0.95 } : {}}
          >
            <WaxSeal
              initial={loveConfig.herInitial}
              cracking={phase === "cracking" || phase === "opening" || phase === "open"}
            />
          </motion.button>
        </motion.div>

        {/* Tap hint */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
              style={{
                marginTop: 28,
                fontFamily: "var(--l-font-body)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "rgba(201,151,43,0.5)",
                letterSpacing: "0.08em",
              }}
            >
              tap the seal to open
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tap anywhere hint (secondary) */}
      <AnimatePresence>
        {phase === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3 }}
            style={{
              position: "absolute",
              bottom: "8%",
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "0.75rem",
              color: "rgba(248,240,227,0.2)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            ✦ A note awaits ✦
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Wax Seal SVG ───────────────────────────────────────────
function WaxSeal({
  initial,
  cracking,
}: {
  initial: string;
  cracking: boolean;
}) {
  return (
    <motion.svg
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      animate={cracking ? { scale: [1, 1.15, 0.9] } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Glow behind */}
      <circle cx="36" cy="36" r="34" fill="rgba(139,26,26,0.3)" />
      {/* Main disc */}
      <circle cx="36" cy="36" r="30" fill="#8B1A1A" />
      <circle cx="36" cy="36" r="29" fill="#9B2020" />
      {/* Radial texture */}
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="36"
          y1="36"
          x2={36 + 29 * Math.cos((i * 30 * Math.PI) / 180)}
          y2={36 + 29 * Math.sin((i * 30 * Math.PI) / 180)}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="1"
        />
      ))}
      {/* Border ring */}
      <circle cx="36" cy="36" r="26" stroke="#C9972B" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      <circle cx="36" cy="36" r="28" stroke="rgba(201,151,43,0.3)" strokeWidth="0.5" fill="none" />
      {/* Letter initial */}
      <text
        x="36"
        y="43"
        textAnchor="middle"
        fill="#F8D080"
        fontSize="20"
        fontFamily="'Pinyon Script', cursive"
        fontStyle="italic"
      >
        {initial}
      </text>

      {/* Crack lines — animated in */}
      <AnimatePresence>
        {cracking && (
          <>
            {[
              "M36 6 L40 20",
              "M36 6 L32 22",
              "M64 26 L50 32",
              "M66 44 L52 40",
              "M48 66 L44 52",
              "M24 66 L28 52",
              "M8 44 L22 40",
              "M6 26 L20 32",
            ].map((d, i) => (
              <motion.path
                key={i}
                d={d}
                stroke="rgba(248,240,227,0.7)"
                strokeWidth="0.7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.svg>
  );
}

