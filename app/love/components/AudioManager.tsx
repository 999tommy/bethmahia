"use client";

// ─────────────────────────────────────────────────────────────
// AudioManager.tsx
// Manages ambient background music and sound effects.
// Audio starts ONLY after first user gesture (iOS compliance).
// Provides mute/unmute toggle.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef, useState, useCallback } from "react";

interface AudioManagerProps {
  unlocked: boolean; // true after first user gesture
}

// Royalty-free ambient piano from Pixabay
// Attribution: "Love Memories" by Lesfm (Pixabay License)
// URL: https://pixabay.com/music/beautiful-plays-love-memories-108735/
// We use a URL so no file needs to be bundled. Swap with a local file
// by replacing the src with e.g. "/music/ambient.mp3"
const AMBIENT_SRC = "https://cdn.pixabay.com/audio/2022/03/09/audio_ff1e839cc7.mp3";

export default function AudioManager({ unlocked }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.src = AMBIENT_SRC;
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "none";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setLoaded(true));
    audio.addEventListener("error", () => {
      // Silently fail — audio is optional
      console.warn("[Love] Ambient audio failed to load — continuing without sound.");
    });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Start playback after unlock
  useEffect(() => {
    if (!unlocked || !audioRef.current || playing) return;
    const audio = audioRef.current;

    const startPlay = async () => {
      try {
        audio.load();
        await audio.play();
        setPlaying(true);
        // Fade in
        fadeVolume(audio, 0, 0.18, 3000);
      } catch {
        // Autoplay blocked — will try again on next interaction
      }
    };

    startPlay();
  }, [unlocked, playing]);

  // Mute/unmute
  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        if (next) {
          fadeVolume(audioRef.current, audioRef.current.volume, 0, 500);
        } else {
          fadeVolume(audioRef.current, 0, 0.18, 800);
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
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? (
        // Muted icon
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        // Speaker icon
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
  const steps = 30;
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

