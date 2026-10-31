"use client";

// ─────────────────────────────────────────────────────────────
// Fireworks.tsx
// Night sky over a city silhouette.
// Tap/swipe to launch fireworks (Canvas 2D particle system).
// Auto-synchronized finale show.
// Heart and "B" shaped burst patterns.
// Respects prefers-reduced-motion.
// ─────────────────────────────────────────────────────────────

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useReducer,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { loveConfig } from "../love.config";

// ── Types ──────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  burstType: "circle" | "heart" | "initial" | "star";
  trail: { x: number; y: number }[];
  exploded: boolean;
}

const COLORS = [
  "#FFE4A0", "#E8B4B8", "#C8A4D4", "#C8868E", "#FFB347",
  "#FF6B9D", "#C9972B", "#FFFFFF", "#FFD700", "#FF8FAB",
];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

// ── Heart shape points ─────────────────────────────────────
function heartPoints(cx: number, cy: number, r: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let t = 0; t <= Math.PI * 2; t += 0.2) {
    const x = r * 16 * Math.pow(Math.sin(t), 3) / 16;
    const y = -r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16;
    pts.push({ x: cx + x, y: cy + y });
  }
  return pts;
}

// ── Star shape points ──────────────────────────────────────
function starPoints(cx: number, cy: number, r: number, spikes = 5): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? r : r * 0.5;
    const angle = (i * Math.PI) / spikes - Math.PI / 2;
    pts.push({ x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) });
  }
  return pts;
}

// ── Main Component ─────────────────────────────────────────
export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const rafRef = useRef<number>(0);
  const [finaleStarted, setFinaleStarted] = useState(false);
  const [finalTextVisible, setFinalTextVisible] = useState(false);
  const [launched, setLaunched] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: false, margin: "-20%" });
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  const launchFirework = useCallback(
    (x: number, y: number, burstType?: Rocket["burstType"]) => {
      if (reducedMotion) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const types: Rocket["burstType"][] = ["circle", "heart", "initial", "star"];
      const type =
        burstType ?? types[Math.floor(Math.random() * types.length)];
      rocketsRef.current.push({
        x,
        y: canvas.height,
        vy: -(6 + Math.random() * 4),
        targetY: y,
        color: randomColor(),
        burstType: type,
        trail: [],
        exploded: false,
      });
      setLaunched((n) => n + 1);
      if ("vibrate" in navigator) navigator.vibrate([10, 5, 15]);
    },
    [reducedMotion]
  );

  const explodeFirework = useCallback((rocket: Rocket) => {
    const cx = rocket.x;
    const cy = rocket.y;
    const color = rocket.color;
    const newParticles: Particle[] = [];

    if (rocket.burstType === "heart") {
      const pts = heartPoints(cx, cy, 40);
      pts.forEach((pt) => {
        const vx = (pt.x - cx) * 0.06 + (Math.random() - 0.5) * 0.5;
        const vy = (pt.y - cy) * 0.06 + (Math.random() - 0.5) * 0.5;
        newParticles.push({
          x: cx, y: cy, vx, vy,
          life: 1, maxLife: 1,
          color,
          size: 3 + Math.random() * 2,
          trail: [],
        });
      });
    } else if (rocket.burstType === "star") {
      const pts = starPoints(cx, cy, 50);
      pts.forEach((pt) => {
        const vx = (pt.x - cx) * 0.07;
        const vy = (pt.y - cy) * 0.07;
        newParticles.push({
          x: cx, y: cy, vx, vy,
          life: 1, maxLife: 1,
          color,
          size: 3 + Math.random() * 2,
          trail: [],
        });
      });
    } else if (rocket.burstType === "initial") {
      // "B" shape approximated as circle + vertical line
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 2;
        const r = 30 + (i < 20 ? 0 : 5);
        newParticles.push({
          x: cx, y: cy,
          vx: (r * Math.cos(t)) * 0.06,
          vy: (r * Math.sin(t)) * 0.06,
          life: 1, maxLife: 1,
          color: "#FFE4A0",
          size: 4,
          trail: [],
        });
      }
      // Vertical bar of B
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          x: cx, y: cy,
          vx: -2.5 + (Math.random() - 0.5) * 0.3,
          vy: -3 + (i / 7) * 6,
          life: 1, maxLife: 1,
          color: "#FFE4A0",
          size: 4,
          trail: [],
        });
      }
    } else {
      // Circle burst
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 2 + Math.random() * 4;
        newParticles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, maxLife: 1,
          color: i % 3 === 0 ? randomColor() : color,
          size: 2 + Math.random() * 3,
          trail: [],
        });
      }
    }

    particlesRef.current.push(...newParticles);
  }, []);

  // ── Animation loop ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      if (!canvas || !ctx) return;
      // Dark trail effect
      ctx.fillStyle = "rgba(7, 7, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      rocketsRef.current = rocketsRef.current.filter((r) => {
        if (r.exploded) return false;
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 12) r.trail.shift();

        // Draw trail
        r.trail.forEach((pt, i) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.5 * (i / r.trail.length), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,228,160,${i / r.trail.length * 0.6})`;
          ctx.fill();
        });

        r.y += r.vy;
        // Gravity slow
        r.vy += 0.08;

        // Explode when reaching target or slowing down
        if (r.y <= r.targetY || r.vy >= -0.5) {
          r.exploded = true;
          explodeFirework(r);
          return false;
        }
        // Draw rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.fill();
        return true;
      });

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.98; // drag
        p.life -= 0.012;

        if (p.life <= 0) return false;

        // Draw trail
        p.trail.forEach((pt, i) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (p.size * 0.5 * i) / p.trail.length, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace(")", `,${(p.life * i) / p.trail.length * 0.3})`).replace("rgb", "rgba");
          ctx.fill();
        });

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1;
        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [explodeFirework]);

  // ── Finale show ───────────────────────────────────────────
  useEffect(() => {
    if (!isVisible || finaleStarted || reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Auto-launch after 3 seconds of being in view
    const delay = setTimeout(() => {
      setFinaleStarted(true);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      const pattern = [
        { x: w * 0.2, y: h * 0.25, type: "heart" as const, t: 0 },
        { x: w * 0.8, y: h * 0.3, type: "circle" as const, t: 400 },
        { x: w * 0.5, y: h * 0.15, type: "initial" as const, t: 800 },
        { x: w * 0.15, y: h * 0.4, type: "star" as const, t: 1200 },
        { x: w * 0.85, y: h * 0.2, type: "heart" as const, t: 1600 },
        { x: w * 0.4, y: h * 0.3, type: "circle" as const, t: 2000 },
        { x: w * 0.6, y: h * 0.2, type: "star" as const, t: 2400 },
        { x: w * 0.5, y: h * 0.1, type: "heart" as const, t: 3000 },
      ];

      pattern.forEach(({ x, y, type, t }) => {
        setTimeout(() => launchFirework(x, y, type), t);
      });

      // Show final text
      setTimeout(() => setFinalTextVisible(true), 4200);
    }, 3000);

    return () => clearTimeout(delay);
  }, [isVisible, finaleStarted, reducedMotion, launchFirework]);

  // ── Handle tap/click to launch ────────────────────────────
  const handleCanvasInteraction = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      launchFirework(x, y);
    },
    [launchFirework]
  );

  return (
    <div
      ref={containerRef}
      className="love-scene love-night-sky"
      style={{
        minHeight: "100dvh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Star backdrop */}
      {!reducedMotion &&
        [...Array(60)].map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: `${(Math.sin(i * 7.3) * 50 + 50).toFixed(1)}%`,
              top: `${(Math.cos(i * 5.7) * 45 + 50).toFixed(1)}%`,
              width: 1 + (i % 3),
              height: 1 + (i % 3),
              borderRadius: "50%",
              background: "#FFE4A0",
              opacity: 0.2 + (i % 5) * 0.08,
              animation: `love-flicker ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.4}s`,
              pointerEvents: "none",
            }}
          />
        ))}

      {/* City silhouette */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "30%",
          maxHeight: 200,
          pointerEvents: "none",
        }}
        viewBox="0 0 400 120"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          d="M0 120 L0 80 L20 80 L20 60 L30 60 L30 50 L40 50 L40 60 L50 60 L50 70 L60 70 L60 40 L65 40 L65 30 L70 30 L70 20 L75 20 L75 30 L80 30 L80 40 L90 40 L90 50 L100 50 L100 60 L110 60 L110 45 L115 45 L115 35 L120 35 L120 45 L130 45 L130 65 L140 65 L140 50 L150 50 L150 35 L155 35 L155 25 L160 25 L160 15 L165 15 L165 25 L170 25 L170 35 L175 35 L175 50 L185 50 L185 60 L195 60 L195 45 L205 45 L205 55 L215 55 L215 40 L220 40 L220 30 L225 30 L225 40 L235 40 L235 60 L245 60 L245 50 L255 50 L255 65 L265 65 L265 55 L275 55 L275 40 L280 40 L280 30 L285 30 L285 40 L295 40 L295 55 L305 55 L305 70 L315 70 L315 55 L325 55 L325 45 L335 45 L335 60 L345 60 L345 75 L355 75 L355 60 L365 60 L365 50 L375 50 L375 65 L385 65 L385 80 L400 80 L400 120 Z"
          fill="#070714"
          opacity="0.95"
        />
        {/* Windows */}
        {[
          [63, 43], [67, 43], [63, 36], [67, 36],
          [152, 28], [157, 28], [152, 38], [157, 38],
          [162, 18], [162, 28],
          [222, 32], [222, 42], [227, 32],
          [277, 32], [282, 32], [277, 42],
        ].map(([wx, wy], i) => (
          <rect
            key={i}
            x={wx}
            y={wy}
            width="3"
            height="4"
            fill="#FFE4A0"
            opacity={0.3 + (i % 3) * 0.2}
          />
        ))}
      </svg>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          cursor: "crosshair",
          touchAction: "none",
        }}
        onClick={handleCanvasInteraction}
        onTouchStart={handleCanvasInteraction}
        aria-label="Tap to launch fireworks"
      />

      {/* Section title */}
      {!finalTextVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            position: "absolute",
            top: "8%",
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
              textShadow: "0 2px 20px rgba(255,228,160,0.2)",
            }}
          >
            Light up the sky
          </p>
          <p
            style={{
              fontFamily: "var(--l-font-display)",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 2.3vw, 0.95rem)",
              color: "rgba(255,228,160,0.4)",
              marginTop: 6,
              letterSpacing: "0.1em",
            }}
          >
            tap anywhere to launch
          </p>
        </motion.div>
      )}

      {/* Final text */}
      <AnimatePresence>
        {finalTextVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              zIndex: 30,
              pointerEvents: "none",
              width: "90%",
            }}
          >
            <motion.p
              style={{
                fontFamily: "var(--l-font-script)",
                fontSize: "clamp(1.4rem, 5.5vw, 2.5rem)",
                color: "#F8F0E3",
                lineHeight: 1.5,
                textShadow: "0 2px 30px rgba(255,228,160,0.5), 0 0 80px rgba(200,134,142,0.3)",
              }}
            >
              You are the most extraordinary thing<br />
              that has ever happened to me.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launch count */}
      {launched > 0 && !finalTextVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "32%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--l-font-body)",
            fontStyle: "italic",
            fontSize: "0.8rem",
            color: "rgba(255,228,160,0.3)",
            pointerEvents: "none",
            letterSpacing: "0.05em",
          }}
        >
          {launched} {launched === 1 ? "firework" : "fireworks"} launched
        </div>
      )}
    </div>
  );
}

