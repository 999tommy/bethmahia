"use client";

// ─────────────────────────────────────────────────────────────
// Timeline.tsx
// A cinematic scroll through our story.
// Polaroid photos + key dates appear as you scroll down.
// Each polaroid expands on tap with a caption and memory.
// ─────────────────────────────────────────────────────────────

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
import { loveConfig } from "../love.config";

export default function Timeline() {
  const [activePolaroid, setActivePolaroid] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathProgress = useTransform<number, number>(scrollYProgress, [0.1, 0.9], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "350dvh",
        background: "#0a0500",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100dvh",
          overflow: "hidden",
        }}
      >
        {/* Starfield backdrop */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, #1a0e00 0%, #070510 100%)",
          }}
        >
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: `${(Math.sin(i * 7.1) * 50 + 50).toFixed(1)}%`,
                top: `${(Math.cos(i * 5.3) * 45 + 50).toFixed(1)}%`,
                width: 1 + (i % 2),
                height: 1 + (i % 2),
                borderRadius: "50%",
                background: "#FFE4A0",
                opacity: 0.15 + (i % 5) * 0.08,
              }}
            />
          ))}
        </div>

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            position: "absolute",
            top: "6%",
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
              color: "rgba(248,240,227,0.9)",
              textShadow: "0 2px 20px rgba(201,151,43,0.3)",
            }}
          >
            Our story, in moments
          </p>
          <p
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 2.3vw, 0.95rem)",
              color: "rgba(201,151,43,0.5)",
              marginTop: 6,
              letterSpacing: "0.1em",
            }}
          >
            tap a memory to open it
          </p>
        </motion.div>

        {/* Constellation connecting line */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
            pointerEvents: "none",
          }}
        >
          <ConstellationPath progress={pathProgress} />
        </svg>

        {/* Polaroids */}
        {loveConfig.timelineDates.map((item, i) => (
          <TimelinePolaroid
            key={item.id}
            item={item}
            index={i}
            total={loveConfig.timelineDates.length}
            scrollProgress={scrollYProgress}
            onClick={() => setActivePolaroid(i)}
          />
        ))}
      </div>

      {/* Expanded polaroid overlay */}
      <AnimatePresence>
        {activePolaroid !== null && (
          <motion.div
            className="love-card-overlay"
            style={{ position: "fixed", zIndex: 1000 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolaroid(null)}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="love-polaroid"
              style={{
                maxWidth: 300,
                width: "85%",
                position: "relative",
                borderRadius: 2,
              }}
            >
              {/* Photo */}
              <div
                style={{
                  width: "100%",
                  paddingBottom: "100%",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 1,
                }}
              >
                <Image
                  src={`/${loveConfig.timelineDates[activePolaroid].photo}`}
                  alt={loveConfig.timelineDates[activePolaroid].label}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="300px"
                  quality={80}
                />
                {/* Romantic vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ padding: "14px 8px 6px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--l-font-script)",
                    fontSize: "1.2rem",
                    color: "#2D2020",
                    lineHeight: 1.4,
                  }}
                >
                  {loveConfig.timelineDates[activePolaroid].caption}
                </p>
                <p
                  style={{
                    fontFamily: "var(--l-font-body)",
                    fontStyle: "italic",
                    fontSize: "0.72rem",
                    color: "#8B6347",
                    marginTop: 6,
                    letterSpacing: "0.05em",
                  }}
                >
                  {loveConfig.timelineDates[activePolaroid].emoji}{" "}
                  {loveConfig.timelineDates[activePolaroid].date}
                </p>
              </div>

              {/* Tape across corner */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -10,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-2deg)",
                  width: 60,
                  height: 22,
                  background: "rgba(232,180,184,0.5)",
                  borderRadius: 1,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Single polaroid ────────────────────────────────────────
function TimelinePolaroid({
  item,
  index,
  total,
  scrollProgress,
  onClick,
}: {
  item: (typeof loveConfig.timelineDates)[0];
  index: number;
  total: number;
  scrollProgress: MotionValue<number>;
  onClick: () => void;
}) {
  // Position in a gentle arc across the screen
  const col = index % 2; // left or right side
  const leftPercent = col === 0 ? 8 : 52;
  const topPercent = 18 + (index / (total - 1)) * 55;

  const opacity = useTransform(
    scrollProgress,
    [
      (index / total) * 0.6,
      (index / total) * 0.6 + 0.12,
      ((index + 1) / total) * 0.6 + 0.25,
      ((index + 1) / total) * 0.6 + 0.38,
    ],
    [0, 1, 1, 0.5]
  );
  const scale = useTransform(
    scrollProgress,
    [(index / total) * 0.6, (index / total) * 0.6 + 0.12],
    [0.7, 1]
  );
  const rotate = (index % 2 === 0 ? -3 : 3) + ((index % 3) - 1) * 1.5;

  return (
    <motion.button
      style={{
        position: "absolute",
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        opacity,
        scale,
        rotate,
        zIndex: 10,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        width: "38%",
        maxWidth: 200,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      aria-label={`Memory: ${item.label}`}
    >
      <div
        className="love-polaroid"
        style={{ width: "100%", borderRadius: 2, position: "relative" }}
      >
        {/* Photo */}
        <div
          style={{
            width: "100%",
            paddingBottom: "90%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={`/${item.photo}`}
            alt={item.label}
            fill
            style={{ objectFit: "cover" }}
            sizes="200px"
            quality={70}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </div>

        {/* Bottom caption */}
        <div style={{ padding: "10px 6px 4px" }}>
          <p
            style={{
              fontFamily: "var(--l-font-script)",
              fontSize: "clamp(0.8rem, 2.5vw, 1rem)",
              color: "#2D2020",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            {item.label}
          </p>
          <p
            style={{
              fontFamily: "var(--l-font-body)",
              fontSize: "0.65rem",
              color: "#8B6347",
              textAlign: "center",
              marginTop: 3,
              fontStyle: "italic",
            }}
          >
            {item.date}
          </p>
        </div>

        {/* Washi tape */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -8,
            left: "50%",
            transform: `translateX(-50%) rotate(${index % 2 === 0 ? -1 : 2}deg)`,
            width: 44,
            height: 18,
            background: "rgba(232,180,184,0.55)",
            borderRadius: 1,
          }}
        />
      </div>
    </motion.button>
  );
}

// ── Constellation connecting SVG path ─────────────────────
function ConstellationPath({
  progress,
}: {
  progress: ReturnType<typeof useTransform<number, number>>;
}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    return progress.on("change", (v: number) => setP(v));
  }, [progress]);

  // Points matching the polaroid positions
  const points = loveConfig.timelineDates.map((_, i) => {
    const col = i % 2;
    const x = col === 0 ? 27 : 71;
    const y = 18 + (i / (loveConfig.timelineDates.length - 1)) * 55;
    return { x, y };
  });

  if (points.length < 2) return null;

  const pathD = points.reduce((acc, pt, i) => {
    if (i === 0) return `M${pt.x} ${pt.y}`;
    return `${acc} L${pt.x} ${pt.y}`;
  }, "");

  return (
    <path
      d={pathD}
      stroke="rgba(201,151,43,0.2)"
      strokeWidth="1"
      strokeDasharray="4 6"
      fill="none"
      vectorEffect="non-scaling-stroke"
      strokeDashoffset={0}
      style={{
        strokeDashoffset: `${(1 - p) * 1000}`,
        transition: "stroke-dashoffset 0.3s",
      }}
    />
  );
}


