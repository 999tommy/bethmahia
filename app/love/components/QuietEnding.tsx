"use client";

// ─────────────────────────────────────────────────────────────
// QuietEnding.tsx
// The final scene. Personal message, replay button,
// and a private "write me back" field (localStorage).
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { loveConfig } from "../love.config";

interface QuietEndingProps {
  onReplay: () => void;
}

export default function QuietEnding({ onReplay }: QuietEndingProps) {
  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [existingNote, setExistingNote] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("love-note-for-tommy");
    if (saved) setExistingNote(saved);
  }, []);

  const handleSaveNote = () => {
    if (!note.trim()) return;
    localStorage.setItem("love-note-for-tommy", note.trim());
    setNoteSaved(true);
    if ("vibrate" in navigator) navigator.vibrate([20, 10, 30, 10, 20]);
  };

  return (
    <div
      className="love-scene"
      style={{
        background:
          "radial-gradient(ellipse at 50% 60%, #1a0e00 0%, #070510 100%)",
        minHeight: "100dvh",
        padding: "60px 24px",
        flexDirection: "column",
        gap: 48,
      }}
    >
      {/* Rose */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 80 100" width="80" height="100">
          <ellipse cx="40" cy="34" rx="26" ry="30" fill="#E8B4B8" opacity="0.8" />
          <ellipse cx="40" cy="34" rx="18" ry="22" fill="#C8868E" opacity="0.85" />
          <ellipse cx="40" cy="34" rx="10" ry="13" fill="#A06070" />
          <circle cx="40" cy="34" r="5" fill="#8B4A5A" />
          <line x1="40" y1="64" x2="40" y2="98" stroke="#5C7A5C" strokeWidth="2.5" />
          <path d="M40 78 Q26 70 22 56" stroke="#5C7A5C" strokeWidth="2" fill="none" />
          <path d="M40 72 Q54 64 58 50" stroke="#5C7A5C" strokeWidth="2" fill="none" />
          <circle cx="40" cy="34" r="28" fill="none" stroke="rgba(232,180,184,0.2)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Final message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 420, textAlign: "center" }}
      >
        {loveConfig.finalMessage.map((line, i) =>
          line === "" ? (
            <div key={i} style={{ height: "1.2em" }} />
          ) : (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.12 }}
              style={{
                fontFamily:
                  i === loveConfig.finalMessage.length - 1 || line.startsWith("—")
                    ? "var(--l-font-script)"
                    : line.startsWith("Happy") || line === "Only you."
                    ? "var(--l-font-display)"
                    : "var(--l-font-body)",
                fontStyle: "italic",
                fontSize:
                  i === 0
                    ? "clamp(0.9rem, 2.8vw, 1.05rem)"
                    : line === "Only you." || line.startsWith("Happy")
                    ? "clamp(1.4rem, 5vw, 2rem)"
                    : line.startsWith("—")
                    ? "clamp(2rem, 7vw, 3rem)"
                    : "clamp(0.95rem, 3vw, 1.1rem)",
                color:
                  line.startsWith("—")
                    ? "var(--l-gold)"
                    : line === "Only you." || line.startsWith("Happy")
                    ? "#F8F0E3"
                    : "rgba(248,240,227,0.75)",
                lineHeight: 1.7,
              }}
            >
              {line}
            </motion.p>
          )
        )}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{
          width: 80,
          height: 1,
          background: "linear-gradient(90deg, transparent, #C9972B, transparent)",
        }}
      />

      {/* Write me back */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.9 }}
        style={{ maxWidth: 380, width: "100%", textAlign: "center" }}
      >
        {existingNote && !noteSaved ? (
          <div>
            <p
              style={{
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "0.85rem",
                color: "rgba(201,151,43,0.6)",
                marginBottom: 10,
                letterSpacing: "0.08em",
              }}
            >
              you left a note before:
            </p>
            <p
              style={{
                fontFamily: "var(--l-font-script)",
                fontSize: "1.3rem",
                color: "#E8B4B8",
                lineHeight: 1.5,
              }}
            >
              &ldquo;{existingNote}&rdquo;
            </p>
          </div>
        ) : noteSaved ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p
              style={{
                fontFamily: "var(--l-font-script)",
                fontSize: "clamp(1.6rem, 6vw, 2.2rem)",
                color: "#E8B4B8",
              }}
            >
              I&apos;ll keep it safe. ♡
            </p>
          </motion.div>
        ) : (
          <div>
            <p
              style={{
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
                color: "rgba(201,151,43,0.55)",
                marginBottom: 16,
                letterSpacing: "0.06em",
              }}
            >
              write me something back — I&apos;ll keep it here
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Whatever is on your heart..."
              rows={3}
              style={{
                width: "100%",
                background: "rgba(248,240,227,0.05)",
                border: "1px solid rgba(201,151,43,0.25)",
                borderRadius: 2,
                padding: "14px 16px",
                fontFamily: "var(--l-font-script)",
                fontSize: "1.2rem",
                color: "#F8F0E3",
                resize: "none",
                outline: "none",
                lineHeight: 1.6,
                caretColor: "#C9972B",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "rgba(201,151,43,0.5)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(201,151,43,0.25)";
              }}
            />
            <motion.button
              onClick={handleSaveNote}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                marginTop: 12,
                background: "transparent",
                border: "1px solid rgba(201,151,43,0.4)",
                borderRadius: 1,
                padding: "10px 28px",
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "0.95rem",
                color: "#C9972B",
                cursor: "pointer",
                letterSpacing: "0.05em",
              }}
            >
              save it for him
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* Replay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
        style={{ textAlign: "center" }}
      >
        <motion.button
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "12px 20px",
          }}
          aria-label="Replay from the beginning"
        >
          {/* Envelope replay icon */}
          <svg viewBox="0 0 40 30" width="36" height="27" fill="none">
            <rect x="1" y="1" width="38" height="28" rx="3" fill="none" stroke="rgba(201,151,43,0.4)" strokeWidth="1.5" />
            <path d="M1 1 L20 18 L39 1" stroke="rgba(201,151,43,0.4)" strokeWidth="1.5" fill="none" />
          </svg>
          <span
            style={{
              fontFamily: "var(--l-font-body)",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(201,151,43,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            read it again
          </span>
        </motion.button>
      </motion.div>

      {/* Bottom ornament */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
        style={{
          fontFamily: "var(--l-font-display)",
          fontSize: "1rem",
          color: "rgba(201,151,43,0.25)",
          letterSpacing: "0.4em",
        }}
      >
        ✦ ✦ ✦
      </motion.p>
    </div>
  );
}

