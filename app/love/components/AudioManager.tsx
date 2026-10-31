"use client";

// ─────────────────────────────────────────────────────────────
// AudioManager.tsx
// Manages background music: "Save Your Tears" by The Weeknd.
// Audio starts gracefully after first user interaction.
// Provides volume fade-in, looping, and mute/unmute control.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";
import { loveConfig } from "../love.config";

interface AudioManagerProps {
  unlocked: boolean; // true after user enters or taps to begin
}

const SONG_SRC = loveConfig.audioTrack || "/save-your-tears.mp3";
const TARGET_VOLUME = 0.45;

export default function AudioManager({ unlocked }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Initialize audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.src = SONG_SRC;
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("error", (e) => {
      console.warn("[Love] Audio playback failed to load:", e);
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Start playback when unlocked, with gesture-fallback for mobile
  useEffect(() => {
    if (!unlocked || !audioRef.current || playing) return;
    const audio = audioRef.current;

    const playAudio = async () => {
      try {
        await audio.play();
        setPlaying(true);
        fadeVolume(audio, 0, TARGET_VOLUME, 2000);
      } catch {
        // If browser autoplay policy blocks, hook into next touch/click anywhere
        const resumeOnNextTap = async () => {
          try {
            await audio.play();
            setPlaying(true);
            fadeVolume(audio, 0, TARGET_VOLUME, 2000);
            cleanupListeners();
          } catch {}
        };

        const cleanupListeners = () => {
          window.removeEventListener("pointerdown", resumeOnNextTap);
          window.removeEventListener("touchstart", resumeOnNextTap);
          window.removeEventListener("click", resumeOnNextTap);
        };

        window.addEventListener("pointerdown", resumeOnNextTap, { once: true });
        window.addEventListener("touchstart", resumeOnNextTap, { once: true });
        window.addEventListener("click", resumeOnNextTap, { once: true });
      }
    };

    playAudio();
  }, [unlocked, playing]);

  // Mute / Unmute handler
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (next) {
          fadeVolume(audioRef.current, audioRef.current.volume, 0, 400);
        } else {
          // If paused, ensure it's playing
          if (audioRef.current.paused) {
            audioRef.current.play().catch(() => {});
          }
          fadeVolume(audioRef.current, 0, TARGET_VOLUME, 600);
        }
      }
      return next;
    });
    if ("vibrate" in navigator) navigator.vibrate(10);
  }, []);

  if (!unlocked) return null;

  return (
    <button
      onClick={toggleMute}
      className="love-volume-btn"
      aria-label={muted ? "Unmute music" : "Mute music"}
      title={muted ? "Unmute Save Your Tears" : "Mute Save Your Tears"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {muted ? (
        // Muted icon
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Speaker playing icon with subtle sound waves
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}

// ── Volume fade utility ────────────────────────────────────
function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number
) {
  const steps = 25;
  const stepTime = durationMs / steps;
  const step = (to - from) / steps;
  let current = from;
  let count = 0;

  const interval = setInterval(() => {
    current += step;
    count++;
    audio.volume = Math.max(0, Math.min(1, current));
    if (count >= steps) clearInterval(interval);
  }, stepTime);
}
