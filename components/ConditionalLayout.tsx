"use client";

// ─────────────────────────────────────────────────────────────
// ConditionalLayout.tsx
// Renders Navbar + Footer on all routes EXCEPT /love.
// This is the only change touching root layout behaviour.
// ─────────────────────────────────────────────────────────────

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLove = pathname?.startsWith("/love");

  return (
    <>
      {!isLove && <Navbar />}
      <main style={isLove ? { display: "contents" } : undefined}>
        {children}
      </main>
      {!isLove && <Footer />}
    </>
  );
}

