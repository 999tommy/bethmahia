"use client";

// ─────────────────────────────────────────────────────────────
// Timeline.tsx
// A cinematic, natural-scrolling walk through our story.
// Polaroids enter smoothly from the bottom into the middle as you scroll.
// Each polaroid expands on tap with the full photo, caption, and memory.
// ─────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { loveConfig } from "../love.config";

export default function Timeline() {
  const [activePolaroid, setActivePolaroid] = useState<number | null>(null);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background: "radial-gradient(ellipse at 50% 30%, #150900 0%, #070510 100%)",
        overflowX: "hidden",
        paddingBottom: "40px",
      }}
    >
      {/* Starfield backdrop */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${(Math.sin(i * 7.1) * 48 + 50).toFixed(1)}%`,
              top: `${(Math.cos(i * 5.3) * 48 + 50).toFixed(1)}%`,
              width: 1 + (i % 2),
              height: 1 + (i % 2),
              borderRadius: "50%",
              background: "#FFE4A0",
              opacity: 0.12 + (i % 5) * 0.08,
            }}
          />
        ))}
      </div>

      {/* Section title — centered with 100% width, NO translateX(-50%) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          textAlign: "center",
          padding: "70px 20px 50px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <p
          style={{
            fontFamily: "var(--l-font-script)",
            fontSize: "clamp(2.2rem, 8vw, 3.8rem)",
            color: "rgba(248,240,227,0.95)",
            textShadow: "0 2px 25px rgba(201,151,43,0.35)",
            lineHeight: 1.2,
          }}
        >
          Our story, in moments
        </p>
        <p
          style={{
            fontFamily: "var(--l-font-display)",
            fontStyle: "italic",
            fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
            color: "rgba(201,151,43,0.65)",
            marginTop: 8,
            letterSpacing: "0.08em",
          }}
        >
          tap a memory to open it
        </p>
      </motion.div>

      {/* Memories Container with central constellation line */}
      <div
        style={{
          position: "relative",
          maxWidth: 680,
          width: "100%",
          margin: "0 auto",
          padding: "0 20px 40px",
          display: "flex",
          flexDirection: "column",
          gap: "50px",
        }}
      >
        {/* Central glowing vertical dotted line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 20,
            bottom: 40,
            left: 0,
            right: 0,
            margin: "0 auto",
            width: 2,
            background:
              "linear-gradient(180deg, rgba(201,151,43,0) 0%, rgba(201,151,43,0.3) 15%, rgba(201,151,43,0.3) 85%, rgba(201,151,43,0) 100%)",
            borderRight: "1px dashed rgba(255,228,160,0.35)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Polaroid Cards — alternate left and right, float in from bottom */}
        {loveConfig.timelineDates.map((item, i) => {
          const isLeft = i % 2 === 0;
          const tilt = isLeft ? -2.5 : 2.5;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex",
                justifyContent: isLeft ? "flex-start" : "flex-end",
                width: "100%",
                position: "relative",
                zIndex: 10,
              }}
            >
              <motion.button
                onClick={() => setActivePolaroid(i)}
                whileHover={{ scale: 1.04, rotate: 0 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  width: "min(260px, 78vw)",
                  rotate: tilt,
                  textAlign: "left",
                }}
                aria-label={`Memory: ${item.label}`}
              >
                <div
                  className="love-polaroid"
                  style={{
                    width: "100%",
                    borderRadius: 2,
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
                  }}
                >
                  {/* Photo */}
                  <div
                    style={{
                      width: "100%",
                      paddingBottom: "92%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`/${item.photo}`}
                      alt={item.label}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 600px) 78vw, 260px"
                      quality={80}
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

                  {/* Caption & Date */}
                  <div style={{ padding: "12px 10px 8px", textAlign: "center" }}>
                    <p
                      style={{
                        fontFamily: "var(--l-font-script)",
                        fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)",
                        color: "#2D2020",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--l-font-body)",
                        fontSize: "0.75rem",
                        color: "#8B6347",
                        marginTop: 4,
                        fontStyle: "italic",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.emoji} {item.date}
                    </p>
                  </div>

                  {/* Washi tape on top edge */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: -9,
                      left: 0,
                      right: 0,
                      margin: "0 auto",
                      width: 50,
                      height: 18,
                      background: isLeft ? "rgba(232,180,184,0.65)" : "rgba(200,164,212,0.65)",
                      borderRadius: 1,
                      transform: `rotate(${isLeft ? -1.5 : 2}deg)`,
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded polaroid overlay modal */}
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
              initial={{ scale: 0.75, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="love-polaroid"
              style={{
                maxWidth: 320,
                width: "88%",
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
                  sizes="320px"
                  quality={85}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Caption */}
              <div style={{ padding: "16px 12px 10px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "var(--l-font-script)",
                    fontSize: "1.35rem",
                    color: "#2D2020",
                    lineHeight: 1.45,
                  }}
                >
                  {loveConfig.timelineDates[activePolaroid].caption}
                </p>
                <p
                  style={{
                    fontFamily: "var(--l-font-body)",
                    fontStyle: "italic",
                    fontSize: "0.8rem",
                    color: "#8B6347",
                    marginTop: 8,
                    letterSpacing: "0.05em",
                  }}
                >
                  {loveConfig.timelineDates[activePolaroid].emoji}{" "}
                  {loveConfig.timelineDates[activePolaroid].date}
                </p>
              </div>

              {/* Washi tape */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: -10,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                  width: 65,
                  height: 22,
                  background: "rgba(232,180,184,0.65)",
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
