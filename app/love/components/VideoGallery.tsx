"use client";

// ─────────────────────────────────────────────────────────────
// VideoGallery.tsx
// A romantic video/photo reel woven into the letter scene.
// Videos load lazily, shown with a dark cinematic frame.
// Photos get a polaroid-style treatment.
// ─────────────────────────────────────────────────────────────

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { loveConfig } from "../love.config";

export default function VideoGallery() {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse at 50% 0%, #1a0500 0%, #070510 100%)",
        padding: "60px 0 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}
      >
        <p
          style={{
            fontFamily: "var(--l-font-script)",
            fontSize: "clamp(2rem, 7vw, 3rem)",
            color: "rgba(248,240,227,0.9)",
          }}
        >
          moments of us
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
          every frame a memory I hold close
        </p>
      </motion.div>

      {/* Photo grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(180px, 42vw), 1fr))",
          gap: 16,
          padding: "0 20px",
          maxWidth: 720,
          margin: "0 auto 40px",
        }}
      >
        {loveConfig.photos.map((photo, i) => (
          <PhotoCard key={photo} src={photo} index={i} />
        ))}
      </div>

      {/* Video reel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          padding: "0 20px",
          maxWidth: 520,
          margin: "0 auto",
        }}
      >
        {loveConfig.videos.map((video, i) => (
          <VideoCard key={video} src={video} index={i} />
        ))}
      </div>
    </div>
  );
}

// ── Photo card with polaroid feel ─────────────────────────
function PhotoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-10%" });
  const tilt = (index % 2 === 0 ? -1 : 1) * (1 + (index % 3) * 0.5);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, rotate: tilt }}
      animate={isVisible ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      style={{
        background: "white",
        padding: "10px 10px 32px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "110%", overflow: "hidden" }}>
        <Image
          src={`/${src}`}
          alt="Our memory"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 42vw, 200px"
          quality={75}
        />
        {/* Romantic vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.35) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Washi tape */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -9,
          left: 0,
          right: 0,
          margin: "0 auto",
          transform: `rotate(${tilt * 0.7}deg)`,
          width: 48,
          height: 18,
          background: index % 3 === 0
            ? "rgba(232,180,184,0.6)"
            : index % 3 === 1
            ? "rgba(200,164,212,0.6)"
            : "rgba(201,151,43,0.4)",
          borderRadius: 1,
        }}
      />
    </motion.div>
  );
}

// ── Video card with cinematic frame ───────────────────────
function VideoCard({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.5)",
        aspectRatio: "9/16",
        maxHeight: "70dvh",
        background: "#0a0500",
      }}
    >
      {isVisible && (
        <video
          src={`/${src}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {/* Cinematic letterbox bars */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "8%",
          background: "rgba(0,0,0,0.85)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "8%",
          background: "rgba(0,0,0,0.85)",
          pointerEvents: "none",
        }}
      />
      {/* Warm vignette overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(26,8,0,0.4) 100%)",
          pointerEvents: "none",
        }}
      />
    </motion.div>
  );
}

