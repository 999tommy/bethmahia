"use client";

// ─────────────────────────────────────────────────────────────
// PetalTrail.tsx
// Global petal cursor/touch trail overlay.
// Falls with gravity, rotates as it falls.
// ─────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

interface TrailPetal {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotate: number;
  rotateSpeed: number;
  opacity: number;
  color: string;
  born: number;
  el: HTMLDivElement;
}

const PETAL_COLORS = ["#E8B4B8", "#C8868E", "#F5D5DA", "#D4A0AA"];
let petalId = 0;

export default function PetalTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<TrailPetal[]>([]);
  const rafRef = useRef<number>(0);
  const lastPos = useRef({ x: -999, y: -999, t: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    function spawnPetal(x: number, y: number) {
      if (!container) return;
      const now = Date.now();
      // Throttle: max 1 petal per 80ms
      if (now - lastPos.current.t < 80) return;
      const dist = Math.hypot(x - lastPos.current.x, y - lastPos.current.y);
      if (dist < 12) return;
      lastPos.current = { x, y, t: now };

      const el = document.createElement("div");
      const size = 10 + Math.random() * 8;
      const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size * 0.75}px;
        border-radius: ${40 + Math.random() * 20}% ${20 + Math.random() * 20}% ${40 + Math.random() * 20}% ${20 + Math.random() * 20}%;
        background: ${color};
        pointer-events: none;
        will-change: transform, opacity;
        left: ${x}px;
        top: ${y}px;
      `;
      container.appendChild(el);

      const petal: TrailPetal = {
        id: petalId++,
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 0.5 + Math.random() * 1,
        size,
        rotate: Math.random() * 360,
        rotateSpeed: (Math.random() - 0.5) * 4,
        opacity: 0.85,
        color,
        born: now,
        el,
      };
      petalsRef.current.push(petal);
    }

    function onMouseMove(e: MouseEvent) {
      spawnPetal(e.clientX, e.clientY);
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0];
      if (t) spawnPetal(t.clientX, t.clientY);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    function tick() {
      const now = Date.now();
      petalsRef.current = petalsRef.current.filter((p) => {
        const age = (now - p.born) / 1000; // seconds
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.99; // drag
        p.rotate += p.rotateSpeed;
        p.opacity = Math.max(0, 0.85 - age * 0.4);

        if (p.opacity <= 0) {
          p.el.remove();
          return false;
        }

        p.el.style.transform = `translate(${p.x - parseFloat(p.el.style.left)}px, ${p.y - parseFloat(p.el.style.top)}px) rotate(${p.rotate}deg)`;
        p.el.style.opacity = String(p.opacity);
        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(rafRef.current);
      petalsRef.current.forEach((p) => p.el.remove());
      petalsRef.current = [];
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9990,
        overflow: "hidden",
      }}
    />
  );
}

