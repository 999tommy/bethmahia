"use client";

// ─────────────────────────────────────────────────────────────
// Scrapbook.tsx
// A corkboard / journal spread with draggable SVG stickers.
// 3 hidden stickers trigger an easter egg message.
// ─────────────────────────────────────────────────────────────

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../love.config";

interface StickerState {
  id: string;
  x: number;
  y: number;
  rotate: number;
  found: boolean; // for hidden ones
  label: string;
  isHidden: boolean;
}

function initStickers(): StickerState[] {
  // Spread stickers around the board
  const positions = [
    { x: 8, y: 10 }, { x: 55, y: 6 }, { x: 72, y: 30 },
    { x: 12, y: 45 }, { x: 40, y: 38 }, { x: 65, y: 55 },
    { x: 20, y: 68 }, { x: 50, y: 65 }, { x: 78, y: 72 },
    // Hidden stickers — placed subtly
    { x: 3, y: 88 }, { x: 88, y: 8 }, { x: 46, y: 92 },
  ];
  return loveConfig.stickers.map((s, i) => ({
    id: s.id,
    label: s.label,
    isHidden: s.isHidden,
    x: positions[i]?.x ?? 40,
    y: positions[i]?.y ?? 40,
    rotate: (Math.sin(i * 7) * 15),
    found: false,
  }));
}

export default function Scrapbook() {
  const [stickers, setStickers] = useState<StickerState[]>(initStickers);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const foundCount = stickers.filter((s) => s.isHidden && s.found).length;
  const totalHidden = stickers.filter((s) => s.isHidden).length;

  const handleHiddenTap = useCallback(
    (id: string) => {
      setStickers((prev) =>
        prev.map((s) => (s.id === id ? { ...s, found: true } : s))
      );
      const newFoundCount =
        stickers.filter((s) => s.isHidden && s.found).length + 1;
      if (newFoundCount >= totalHidden) {
        setTimeout(() => setEasterEggActive(true), 400);
      }
      if ("vibrate" in navigator) navigator.vibrate(30);
    },
    [stickers, totalHidden]
  );

  return (
    <div
      style={{
        background: "#0a0500",
        padding: "60px 0",
        position: "relative",
      }}
    >
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{
          textAlign: "center",
          marginBottom: 32,
          padding: "0 24px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--l-font-script)",
            fontSize: "clamp(2rem, 7vw, 3.5rem)",
            color: "rgba(248,240,227,0.9)",
          }}
        >
          Our little board
        </p>
        <p
          style={{
            fontFamily: "var(--l-font-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.75rem, 2.3vw, 0.9rem)",
            color: "rgba(201,151,43,0.5)",
            marginTop: 6,
            letterSpacing: "0.1em",
          }}
        >
          drag the stickers around · find the 3 hidden ones
        </p>
        {/* Hidden sticker progress */}
        {foundCount > 0 && foundCount < totalHidden && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "var(--l-font-body)",
              fontStyle: "italic",
              fontSize: "0.8rem",
              color: "rgba(232,180,184,0.7)",
              marginTop: 8,
            }}
          >
            {foundCount}/{totalHidden} hidden stickers found ✦
          </motion.p>
        )}
      </motion.div>

      {/* Cork board */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        ref={boardRef}
        style={{
          position: "relative",
          width: "min(680px, calc(100vw - 32px))",
          height: "min(520px, 90vw)",
          margin: "0 auto",
          borderRadius: 4,
          // Cork texture
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(180,130,70,0.15) 0%, transparent 60%),
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 3px,
              rgba(120,80,30,0.06) 3px,
              rgba(120,80,30,0.06) 6px
            ),
            #5C3D1E
          `,
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,220,160,0.1)",
          border: "8px solid #3D2410",
          overflow: "hidden",
        }}
      >
        {/* Cork grain overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Push-pin corner decorations */}
        {[
          { top: "2%", left: "2%" },
          { top: "2%", right: "2%" },
          { bottom: "2%", left: "2%" },
          { bottom: "2%", right: "2%" },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              ...pos,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #FFE4A0, #C9972B)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
              zIndex: 10,
            }}
          />
        ))}

        {/* Stickers */}
        {stickers.map((sticker, i) => (
          <DraggableSticker
            key={sticker.id}
            sticker={sticker}
            index={i}
            isDragging={dragId === sticker.id}
            onDragStart={() => setDragId(sticker.id)}
            onDragEnd={(x, y) => {
              setDragId(null);
              setStickers((prev) =>
                prev.map((s) => (s.id === sticker.id ? { ...s, x, y } : s))
              );
            }}
            onHiddenTap={() => handleHiddenTap(sticker.id)}
            boardRef={boardRef}
          />
        ))}
      </motion.div>

      {/* Easter egg overlay */}
      <AnimatePresence>
        {easterEggActive && (
          <motion.div
            className="love-card-overlay"
            style={{ position: "fixed", zIndex: 1000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEasterEggActive(false)}
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -3, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
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
                  fontFamily: "var(--l-font-script)",
                  fontSize: "2rem",
                  color: "var(--l-gold)",
                  marginBottom: 16,
                }}
              >
                ✦ ✦ ✦
              </p>
              <p
                style={{
                  fontFamily: "var(--l-font-script)",
                  fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
                  color: "var(--l-ink-sepia)",
                  lineHeight: 1.5,
                }}
              >
                You found them all.
              </p>
              <p
                style={{
                  fontFamily: "var(--l-font-body)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--l-ink-faded)",
                  marginTop: 12,
                  lineHeight: 1.7,
                }}
              >
                You always find the things that matter.
              </p>
              <motion.button
                onClick={() => setEasterEggActive(false)}
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

// ── Draggable sticker ──────────────────────────────────────
function DraggableSticker({
  sticker,
  index,
  isDragging,
  onDragStart,
  onDragEnd,
  onHiddenTap,
  boardRef,
}: {
  sticker: StickerState;
  index: number;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: (x: number, y: number) => void;
  onHiddenTap: () => void;
  boardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number } }) => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      // Convert pixel drag offset to percent
      const dx = (info.offset.x / rect.width) * 100;
      const dy = (info.offset.y / rect.height) * 100;
      const newX = Math.max(2, Math.min(92, sticker.x + dx));
      const newY = Math.max(2, Math.min(92, sticker.y + dy));
      onDragEnd(newX, newY);
    },
    [boardRef, sticker.x, sticker.y, onDragEnd]
  );

  // Hidden stickers: rendered very small / semi-transparent until found
  const isHiddenAndNotFound = sticker.isHidden && !sticker.found;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={boardRef}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onTap={sticker.isHidden && !sticker.found ? onHiddenTap : undefined}
      style={{
        position: "absolute",
        left: `${sticker.x}%`,
        top: `${sticker.y}%`,
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 100 : 10 + index,
        userSelect: "none",
        touchAction: "none",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isHiddenAndNotFound ? 0.7 : 1,
        opacity: isHiddenAndNotFound ? 0.25 : 1,
        rotate: sticker.rotate,
      }}
      whileHover={{ scale: isHiddenAndNotFound ? 0.75 : 1.08, zIndex: 150 }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 24 }}
    >
      <StickerSVG id={sticker.id} label={sticker.label} found={sticker.found} />
    </motion.div>
  );
}

// ── Sticker SVG library ────────────────────────────────────
function StickerSVG({ id, label, found }: { id: string; label: string; found?: boolean }) {
  const style: React.CSSProperties = {
    filter: found ? "drop-shadow(0 0 8px rgba(201,151,43,0.7))" : "drop-shadow(0 2px 6px rgba(0,0,0,0.4))",
  };

  const svgs: Record<string, React.ReactNode> = {
    rose: (
      <svg viewBox="0 0 60 70" width="60" height="70" style={style} aria-label={label}>
        <ellipse cx="30" cy="26" rx="22" ry="24" fill="#E8B4B8" />
        <ellipse cx="30" cy="26" rx="16" ry="18" fill="#C8868E" />
        <ellipse cx="30" cy="26" rx="10" ry="11" fill="#A06070" />
        <circle cx="30" cy="26" r="5" fill="#8B4A5A" />
        <line x1="30" y1="50" x2="30" y2="68" stroke="#5C7A5C" strokeWidth="2.5" />
        <path d="M30 60 Q20 54 16 44" stroke="#5C7A5C" strokeWidth="2" fill="none" />
        <path d="M30 55 Q40 49 44 39" stroke="#5C7A5C" strokeWidth="2" fill="none" />
      </svg>
    ),
    boba: (
      <svg viewBox="0 0 50 70" width="50" height="70" style={style} aria-label={label}>
        <rect x="12" y="20" width="26" height="38" rx="6" fill="#F5EDE0" stroke="#C9A87A" strokeWidth="1.5" />
        <ellipse cx="25" cy="20" rx="13" ry="5" fill="#D4B896" />
        <ellipse cx="25" cy="58" rx="13" ry="5" fill="#C9A87A" />
        <circle cx="19" cy="50" r="4" fill="#3D2410" opacity="0.8" />
        <circle cx="25" cy="52" r="4" fill="#3D2410" opacity="0.8" />
        <circle cx="31" cy="50" r="4" fill="#3D2410" opacity="0.8" />
        <line x1="25" y1="8" x2="25" y2="20" stroke="#A06070" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="5" x2="25" y2="8" stroke="#A06070" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 38 Q8 32 12 26" stroke="rgba(180,130,70,0.4)" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    ticket: (
      <svg viewBox="0 0 80 40" width="80" height="40" style={style} aria-label={label}>
        <rect x="2" y="2" width="76" height="36" rx="3" fill="#EAD8B1" stroke="#C9A87A" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="56" y1="2" x2="56" y2="38" stroke="#C9A87A" strokeWidth="1" strokeDasharray="3 2" />
        <text x="28" y="16" textAnchor="middle" fill="#5C3D1E" fontSize="6" fontFamily="serif" fontStyle="italic">Michael</text>
        <text x="28" y="26" textAnchor="middle" fill="#8B6347" fontSize="5" fontFamily="serif">Cinema · 2024</text>
        <text x="28" y="35" textAnchor="middle" fill="#C9A87A" fontSize="4" fontFamily="serif">♡</text>
        <text x="66" y="23" textAnchor="middle" fill="#8B6347" fontSize="9">🎬</text>
      </svg>
    ),
    taco: (
      <svg viewBox="0 0 60 50" width="60" height="50" style={style} aria-label={label}>
        <path d="M10 40 Q30 10 50 40Z" fill="#D4A845" />
        <path d="M15 40 Q30 16 45 40" fill="none" stroke="#C9972B" strokeWidth="1" />
        <ellipse cx="30" cy="36" rx="12" ry="5" fill="#8FAF8F" opacity="0.9" />
        <ellipse cx="24" cy="34" rx="6" ry="4" fill="#C8868E" opacity="0.8" />
        <ellipse cx="36" cy="34" rx="6" ry="4" fill="#C8868E" opacity="0.8" />
        <path d="M18 38 Q30 28 42 38" stroke="#E8B4B8" strokeWidth="0.5" fill="none" opacity="0.5" />
      </svg>
    ),
    washi: (
      <svg viewBox="0 0 100 22" width="100" height="22" style={style} aria-label={label}>
        <rect x="0" y="0" width="100" height="22" rx="2" fill="rgba(232,180,184,0.75)" />
        {[...Array(8)].map((_, i) => (
          <circle key={i} cx={6 + i * 13} cy="11" r="2" fill="rgba(200,134,142,0.4)" />
        ))}
        <text x="50" y="15" textAnchor="middle" fill="#5C3D1E" fontSize="8" fontFamily="serif" letterSpacing="1">13.05.2024</text>
      </svg>
    ),
    stamp: (
      <svg viewBox="0 0 50 55" width="50" height="55" style={style} aria-label={label}>
        <rect x="2" y="2" width="46" height="50" rx="2" fill="#F8F0E3" stroke="#8B6347" strokeWidth="1.5" strokeDasharray="3 2" />
        <rect x="6" y="6" width="38" height="42" rx="1" fill="#E8D5F0" opacity="0.7" />
        <text x="25" y="34" textAnchor="middle" fill="#9B6DB5" fontSize="22">♡</text>
        <text x="25" y="44" textAnchor="middle" fill="#8B6347" fontSize="5" fontFamily="serif" letterSpacing="0.5">LOVE</text>
      </svg>
    ),
    icecream: (
      <svg viewBox="0 0 40 60" width="40" height="60" style={style} aria-label={label}>
        <path d="M12 32 L20 58 L28 32" fill="#EAD8B1" stroke="#C9A87A" strokeWidth="1" />
        <ellipse cx="20" cy="24" rx="16" ry="18" fill="#F5D5DA" />
        <ellipse cx="20" cy="16" rx="10" ry="12" fill="#E8B4B8" />
        <path d="M8 28 Q20 22 32 28" stroke="rgba(200,134,142,0.4)" strokeWidth="1" fill="none" />
        <circle cx="26" cy="14" r="2" fill="#C8868E" opacity="0.6" />
        <circle cx="16" cy="20" r="1.5" fill="#C8868E" opacity="0.6" />
      </svg>
    ),
    quill: (
      <svg viewBox="0 0 60 70" width="60" height="70" style={style} aria-label={label}>
        <path d="M50 5 Q60 0 58 10 Q55 22 40 35 Q30 45 20 62 Q16 68 12 65 Q10 58 16 52 Q28 38 38 26 Q48 14 50 5Z" fill="#F8F0E3" stroke="#C9A87A" strokeWidth="1" />
        <path d="M50 5 Q58 8 55 18 Q50 30 38 26" fill="#EAD8B1" opacity="0.6" />
        <path d="M20 62 L14 58" stroke="#1A0A00" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25 55 Q22 50 18 55" stroke="#5C3D1E" strokeWidth="1" fill="none" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 80 55" width="80" height="55" style={style} aria-label={label}>
        <rect x="1" y="1" width="78" height="53" rx="3" fill="rgba(248,240,227,0.9)" stroke="#E8B4B8" strokeWidth="1.5" />
        <text x="40" y="30" textAnchor="middle" fill="#C8868E" fontSize="9" fontFamily="serif" fontStyle="italic" letterSpacing="0.5">you + me</text>
        <path d="M34 38 C34 34 28 30 28 34 C28 38 34 42 40 46 C46 42 52 38 52 34 C52 30 46 34 46 38 C46 34 40 34 40 38Z" fill="#C8868E" transform="scale(0.7) translate(17, 4)" />
      </svg>
    ),
    // Hidden stickers
    secret1: (
      <svg viewBox="0 0 30 30" width="30" height="30" style={{ ...style, filter: found ? "drop-shadow(0 0 10px rgba(201,151,43,0.9))" : style.filter }} aria-label={found ? "Secret found!" : "..."}>
        <circle cx="15" cy="15" r="13" fill={found ? "#C9972B" : "#3D2410"} />
        <text x="15" y="20" textAnchor="middle" fontSize="14">{found ? "🌸" : "·"}</text>
      </svg>
    ),
    secret2: (
      <svg viewBox="0 0 30 30" width="30" height="30" style={{ ...style, filter: found ? "drop-shadow(0 0 10px rgba(201,151,43,0.9))" : style.filter }} aria-label={found ? "Secret found!" : "..."}>
        <circle cx="15" cy="15" r="13" fill={found ? "#C9972B" : "#3D2410"} />
        <text x="15" y="20" textAnchor="middle" fontSize="14">{found ? "✨" : "·"}</text>
      </svg>
    ),
    secret3: (
      <svg viewBox="0 0 30 30" width="30" height="30" style={{ ...style, filter: found ? "drop-shadow(0 0 10px rgba(201,151,43,0.9))" : style.filter }} aria-label={found ? "Secret found!" : "..."}>
        <circle cx="15" cy="15" r="13" fill={found ? "#C9972B" : "#3D2410"} />
        <text x="15" y="20" textAnchor="middle" fontSize="14">{found ? "💫" : "·"}</text>
      </svg>
    ),
  };

  return (
    <>{svgs[id] ?? <div style={{ width: 40, height: 40, background: "#E8B4B8", borderRadius: 4 }} />}</>
  );
}

