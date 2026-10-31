// app/love/layout.tsx
// ─────────────────────────────────────────────────────────────
// This layout COMPLETELY REPLACES the root layout for /love.
// The root Navbar and Footer are intentionally absent here.
// This page is private, full-screen, and self-contained.
// ─────────────────────────────────────────────────────────────

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For You",
  description: "A private page.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="love-root" style={{ isolation: "isolate" }}>
      {children}
    </div>
  );
}

