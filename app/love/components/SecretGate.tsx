"use client";

// ─────────────────────────────────────────────────────────────
// SecretGate.tsx
// Full-screen overlay that guards the /love experience.
// Correct answer → dissolves. Wrong answer → ink blot shake.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../love.config";

interface SecretGateProps {
  onUnlock: () => void;
}

export default function SecretGate({ onUnlock }: SecretGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const normalized = value.replace(/\s/g, "").toLowerCase();
      const answer = loveConfig.secretAnswer.toLowerCase();
      if (normalized === answer) {
        onUnlock();
      } else {
        setError(true);
        setAttempts((n) => n + 1);
        setTimeout(() => {
          setError(false);
          setValue("");
          inputRef.current?.focus();
        }, 800);
      }
    },
    [value, onUnlock]
  );

  return (
    <motion.div
      className="love-scene"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #1a0e00 0%, #0a0500 100%)",
        position: "fixed",
        inset: 0,
        zIndex: 9998,
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
    >
      {/* Background rose watermark */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "-5%",
          width: "55vw",
          maxWidth: 380,
          opacity: 0.06,
          pointerEvents: "none",
        }}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 20 C100 20, 140 40, 155 80 C170 120, 140 160, 100 170 C60 160, 30 120, 45 80 C60 40, 100 20, 100 20Z"
          fill="#E8B4B8"
        />
        <path
          d="M100 35 C100 35, 130 50, 142 82 C154 114, 132 148, 100 155 C68 148, 46 114, 58 82 C70 50, 100 35, 100 35Z"
          fill="#C8868E"
        />
        <path
          d="M100 55 C100 55, 120 65, 128 88 C136 111, 120 135, 100 140 C80 135, 64 111, 72 88 C80 65, 100 55, 100 55Z"
          fill="#A06070"
        />
        {/* Stem */}
        <line x1="100" y1="170" x2="100" y2="200" stroke="#5C7A5C" strokeWidth="3" />
        <path d="M100 185 Q85 178 80 165" stroke="#5C7A5C" strokeWidth="2" fill="none" />
      </svg>

      {/* Scattered petals */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 14,
            height: 10,
            borderRadius: "50% 0 50% 0",
            background: "#E8B4B8",
            left: `${10 + i * 11}%`,
            top: `${15 + ((i * 17) % 70)}%`,
            rotate: `${i * 47}deg`,
            opacity: 0.15 + (i % 3) * 0.07,
          }}
          animate={{
            y: [0, -6, 0],
            rotate: [`${i * 47}deg`, `${i * 47 + 8}deg`, `${i * 47}deg`],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "0 32px",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: 60,
            height: 1,
            background: "linear-gradient(90deg, transparent, #C9972B, transparent)",
          }}
        />

        {/* Question */}
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
              color: "rgba(201,151,43,0.7)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Before you enter
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              fontFamily: "var(--l-font-script)",
              fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
              color: "#F8F0E3",
              lineHeight: 1.4,
            }}
          >
            {loveConfig.secretQuestion}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            style={{
              fontFamily: "var(--l-font-body)",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(248,240,227,0.35)",
              marginTop: 10,
              letterSpacing: "0.05em",
            }}
          >
            {loveConfig.secretHint}
          </motion.p>
        </div>

        {/* Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}
        >
          <motion.div
            animate={error ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", position: "relative" }}
          >
            <input
              ref={inputRef}
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="···"
              autoComplete="off"
              style={{
                width: "100%",
                background: "rgba(248,240,227,0.06)",
                border: `1px solid ${error ? "rgba(139,26,26,0.8)" : "rgba(201,151,43,0.3)"}`,
                borderRadius: 2,
                padding: "14px 20px",
                fontFamily: "var(--l-font-mono)",
                fontSize: "1.3rem",
                letterSpacing: "0.4em",
                color: "#F8F0E3",
                textAlign: "center",
                outline: "none",
                transition: "border-color 0.3s",
                caretColor: "#C9972B",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(201,151,43,0.7)";
              }}
              onBlur={(e) => {
                if (!error)
                  e.target.style.borderColor = "rgba(201,151,43,0.3)";
              }}
            />
            {/* Ink blot on error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  style={{
                    position: "absolute",
                    right: -8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 18,
                    height: 18,
                    borderRadius: "60% 40% 55% 45%",
                    background: "#1A0A00",
                    boxShadow: "0 0 0 3px rgba(26,10,0,0.6)",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: "var(--l-font-body)",
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  color: "rgba(139,26,26,0.9)",
                }}
              >
                {attempts === 1
                  ? "That is not the date, my love."
                  : "Think back to the beginning — when everything changed."}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "transparent",
              border: "1px solid rgba(201,151,43,0.5)",
              borderRadius: 1,
              padding: "12px 36px",
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "1.05rem",
              letterSpacing: "0.08em",
              color: "#C9972B",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background =
                "rgba(201,151,43,0.12)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "transparent";
            }}
          >
            Open
          </motion.button>
        </motion.form>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            fontFamily: "var(--l-font-display)",
            fontSize: "1.2rem",
            color: "rgba(201,151,43,0.3)",
            letterSpacing: "0.3em",
          }}
        >
          ✦ ✦ ✦
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

