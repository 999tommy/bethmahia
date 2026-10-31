"use client";

// ─────────────────────────────────────────────────────────────
// app/love/page.tsx — The /love experience orchestrator
//
// Scene order:
//   0. SecretGate      — passphrase guard
//   1. Envelope        — tap to open
//   2. Letter          — KJV love poem, scroll-revealed
//   3. Garden          — roses grow, petals drift
//   4. GalaxyScene     — a million reasons
//   5. Timeline        — polaroid memory lane
//   6. Scrapbook       — draggable stickers & easter eggs
//   7. Fireworks       — tap-to-launch + finale show
//   8. QuietEnding     — final message + write-back
//
// Global overlays: PetalTrail, AudioManager, skip button
// ─────────────────────────────────────────────────────────────

import "./love.css";
import { Suspense, lazy, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

import SecretGate from "./components/SecretGate";
import Envelope from "./components/Envelope";
import PetalTrail from "./components/PetalTrail";
import AudioManager from "./components/AudioManager";

// Heavy scenes lazy-loaded with Suspense
const Letter = lazy(() => import("./components/Letter"));
const Garden = lazy(() => import("./components/Garden"));
const Timeline = lazy(() => import("./components/Timeline"));
const Scrapbook = lazy(() => import("./components/Scrapbook"));
const Fireworks = lazy(() => import("./components/Fireworks"));
const QuietEnding = lazy(() => import("./components/QuietEnding"));
const VideoGallery = lazy(() => import("./components/VideoGallery"));

// GalaxyScene uses React Three Fiber / WebGL — SSR must be disabled
const GalaxyScene = dynamic(() => import("./components/GalaxyScene"), {
  ssr: false,
  loading: () => <LoveLoader />,
});

type Scene =
  | "gate"
  | "envelope"
  | "letter"
  | "garden"
  | "galaxy"
  | "timeline"
  | "scrapbook"
  | "fireworks"
  | "ending";

const SCENE_ORDER: Scene[] = [
  "gate",
  "envelope",
  "letter",
  "garden",
  "galaxy",
  "timeline",
  "scrapbook",
  "fireworks",
  "ending",
];

// ── Themed loading screen ──────────────────────────────────
function LoveLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        background: "#070510",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Pulsing rose */}
        <motion.svg
          viewBox="0 0 60 70"
          width="52"
          height="62"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 4, -4, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="30" cy="26" rx="22" ry="24" fill="#E8B4B8" opacity="0.45" />
          <ellipse cx="30" cy="26" rx="14" ry="16" fill="#C8868E" opacity="0.45" />
          <ellipse cx="30" cy="26" rx="7" ry="9" fill="#A06070" opacity="0.5" />
          <line x1="30" y1="50" x2="30" y2="68" stroke="#5C7A5C" strokeWidth="2" opacity="0.4" />
        </motion.svg>
        <motion.p
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "1.4rem",
            color: "rgba(248,240,227,0.4)",
            letterSpacing: "0.08em",
          }}
        >
          preparing...
        </motion.p>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function LovePage() {
  const [scene, setScene] = useState<Scene>("gate");
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Scroll to top on scene change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [scene]);

  const goToScene = useCallback((s: Scene) => {
    setScene(s);
  }, []);

  const handleUnlock = useCallback(() => {
    setAudioUnlocked(true);
    goToScene("envelope");
  }, [goToScene]);

  const handleEnvelopeOpen = useCallback(() => {
    setAudioUnlocked(true);
    goToScene("letter");
  }, [goToScene]);

  const handleLetterComplete = useCallback(() => {
    goToScene("garden");
  }, [goToScene]);

  const handleReplay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    goToScene("envelope");
  }, [goToScene]);

  const handleSkip = useCallback(() => {
    const idx = SCENE_ORDER.indexOf(scene);
    if (idx >= 0 && idx < SCENE_ORDER.length - 1) {
      goToScene(SCENE_ORDER[idx + 1]);
    }
  }, [scene, goToScene]);

  return (
    <div
      className="love-root"
      style={{ minHeight: "100dvh", position: "relative" }}
    >
      {/* Global: petal cursor/touch trail */}
      {scene !== "gate" && <PetalTrail />}

      {/* Global: audio manager + mute toggle */}
      <AudioManager unlocked={audioUnlocked} />

      {/* Skip button — visible on scrollable scenes */}
      <AnimatePresence>
        {scene !== "gate" && scene !== "envelope" && scene !== "ending" && (
          <motion.button
            key="skip-btn"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="love-skip-btn"
            onClick={handleSkip}
            aria-label="Skip to next scene"
          >
            skip →
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Scenes ── */}
      <AnimatePresence mode="wait">

        {scene === "gate" && (
          <motion.div key="gate"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.4 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <SecretGate onUnlock={handleUnlock} />
          </motion.div>
        )}

        {scene === "envelope" && (
          <motion.div key="envelope"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Envelope onOpen={handleEnvelopeOpen} />
          </motion.div>
        )}

        {scene === "letter" && (
          <motion.div key="letter"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <Letter onComplete={handleLetterComplete} />
              <VideoGallery />
              <SceneAdvance label="Scroll into the garden" onAdvance={() => goToScene("garden")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "garden" && (
          <motion.div key="garden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <Garden />
              <VideoGallery />
              <SceneAdvance label="See a million reasons" onAdvance={() => goToScene("galaxy")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "galaxy" && (
          <motion.div key="galaxy"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            {/* GalaxyScene is dynamic (no SSR), wrapped in Suspense for loading UI */}
            <Suspense fallback={<LoveLoader />}>
              <GalaxyScene onAdvance={() => goToScene("timeline")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "timeline" && (
          <motion.div key="timeline"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <Timeline />
              <SceneAdvance label="See our little board" onAdvance={() => goToScene("scrapbook")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "scrapbook" && (
          <motion.div key="scrapbook"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <Scrapbook />
              <SceneAdvance label="Light up the sky" onAdvance={() => goToScene("fireworks")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "fireworks" && (
          <motion.div key="fireworks"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <Fireworks />
              <SceneAdvance label="One last thing..." onAdvance={() => goToScene("ending")} />
            </Suspense>
          </motion.div>
        )}

        {scene === "ending" && (
          <motion.div key="ending"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Suspense fallback={<LoveLoader />}>
              <QuietEnding onReplay={handleReplay} />
            </Suspense>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ── Scene advance button ───────────────────────────────────
function SceneAdvance({ label, onAdvance }: { label: string; onAdvance: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "56px 24px 48px",
        background: "transparent",
      }}
    >
      <motion.button
        onClick={onAdvance}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "transparent",
          border: "1px solid rgba(201,151,43,0.28)",
          borderRadius: 2,
          padding: "13px 30px",
          fontFamily: "var(--l-font-display)",
          fontStyle: "italic",
          fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
          color: "rgba(201,151,43,0.5)",
          cursor: "pointer",
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          gap: 10,
          transition: "color 0.2s, border-color 0.2s",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget;
          btn.style.color = "rgba(201,151,43,0.8)";
          btn.style.borderColor = "rgba(201,151,43,0.5)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget;
          btn.style.color = "rgba(201,151,43,0.5)";
          btn.style.borderColor = "rgba(201,151,43,0.28)";
        }}
        aria-label={label}
      >
        {label}
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ fontSize: "0.75rem", lineHeight: 1 }}
        >
          ↓
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
