"use client";

// ─────────────────────────────────────────────────────────────
// AudioManager.tsx
// Manages background music: "Save Your Tears" by The Weeknd.
// - Always visible music pill / button (z-index 9999).
// - Unlocks and plays on first tap/touch anywhere on the page.
// - Direct volume set to 0.65 (audible and clear across all devices).
// - Click toggle for Play / Pause / Mute.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import { loveConfig } from "../love.config";

interface AudioManagerProps {
  unlocked?: boolean;
}

const SONG_SRC = loveConfig.audioTrack || "/save-your-tears.mp3";
const DEFAULT_VOLUME = 0.65;

export default function AudioManager({ unlocked }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Helper to start playback safely
  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = DEFAULT_VOLUME;
      await audio.play();
      setIsPlaying(true);
      setHasInteracted(true);
    } catch {
      // Browser autoplay policy might block until explicit user gesture
    }
  }, []);

  // Hook into first user interaction anywhere on the screen
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = DEFAULT_VOLUME;
    }

    const onFirstUserAction = () => {
      attemptPlay();
      window.removeEventListener("pointerdown", onFirstUserAction);
      window.removeEventListener("touchstart", onFirstUserAction);
      window.removeEventListener("click", onFirstUserAction);
      window.removeEventListener("keydown", onFirstUserAction);
    };

    window.addEventListener("pointerdown", onFirstUserAction, { passive: true });
    window.addEventListener("touchstart", onFirstUserAction, { passive: true });
    window.addEventListener("click", onFirstUserAction, { passive: true });
    window.addEventListener("keydown", onFirstUserAction, { passive: true });

    // Also attempt play immediately in case browser allows it (or already interacted)
    attemptPlay();

    return () => {
      window.removeEventListener("pointerdown", onFirstUserAction);
      window.removeEventListener("touchstart", onFirstUserAction);
      window.removeEventListener("click", onFirstUserAction);
      window.removeEventListener("keydown", onFirstUserAction);
    };
  }, [attemptPlay]);

  // When unlocked prop changes from parent (e.g. gate unlocked), ensure play
  useEffect(() => {
    if (unlocked) {
      attemptPlay();
    }
  }, [unlocked, attemptPlay]);

  // Toggle button click
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = DEFAULT_VOLUME;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch((err) => {
        console.warn("Audio play failed:", err);
      });
    }

    if ("vibrate" in navigator) navigator.vibrate(15);
  };

  return (
    <>
      {/* HTML5 Audio element in the DOM */}
      <audio
        ref={audioRef}
        src={SONG_SRC}
        loop
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => console.warn("[Love] Audio failed to load:", e)}
      />

      {/* Floating Music Control Button (Always visible on top) */}
      <button
        onClick={togglePlayPause}
        className="love-volume-btn"
        aria-label={isPlaying ? "Pause music" : "Play Save Your Tears"}
        title={isPlaying ? "Save Your Tears · Playing (tap to pause)" : "Save Your Tears · Paused (tap to play)"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          width: isPlaying ? "auto" : "auto",
          padding: isPlaying ? "8px 14px" : "10px 16px",
          borderRadius: "9999px",
          background: isPlaying
            ? "rgba(26, 10, 0, 0.75)"
            : "linear-gradient(135deg, rgba(201, 151, 43, 0.85) 0%, rgba(139, 26, 26, 0.85) 100%)",
          border: isPlaying
            ? "1px solid rgba(201, 151, 43, 0.5)"
            : "1px solid rgba(255, 228, 160, 0.8)",
          boxShadow: isPlaying
            ? "0 4px 20px rgba(0, 0, 0, 0.4)"
            : "0 4px 25px rgba(201, 151, 43, 0.5)",
          color: isPlaying ? "var(--l-gold)" : "#FFF",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          animation: !isPlaying && !hasInteracted ? "love-pulse 2s infinite ease-in-out" : "none",
        }}
      >
        {isPlaying ? (
          <>
            {/* Animated sound waves */}
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            <span
              style={{
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                color: "#FFE4A0",
              }}
            >
              Save Your Tears
            </span>
          </>
        ) : (
          <>
            {/* Play icon */}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span
              style={{
                fontFamily: "var(--l-font-display)",
                fontStyle: "italic",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                fontWeight: 600,
              }}
            >
              Play Music ♫
            </span>
          </>
        )}
      </button>
    </>
  );
}
