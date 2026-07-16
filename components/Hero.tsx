"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">
      {/* Three.js background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-cream/30 via-transparent to-cream/60 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="pill bg-[#E8B4B8]/30 text-[#6B4C55] border border-[#E8B4B8]/50 mb-6 inline-flex items-center gap-2">
              <Sparkles size={14} className="text-[#C8868E]" />
              Social Media Manager • Lagos, NG
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-mauve-dark mb-6"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient">Bethany.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-mauve leading-relaxed mb-4 max-w-lg"
          >
            I tell stories that make people{" "}
            <em className="text-[#C8868E] not-italic font-semibold">stop scrolling.</em>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-base text-mauve/70 leading-relaxed mb-10 max-w-md"
          >
            A result-driven social media manager with a passion for storytelling,
            audience engagement, and data-backed creativity. Let&apos;s build something great together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/portfolio"
              id="hero-portfolio-btn"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#C8868E] to-[#9B6DB5] text-white font-semibold shadow-rose hover:shadow-lavender hover:scale-105 transition-all duration-250"
            >
              View My Work
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              id="hero-contact-btn"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#E8B4B8] text-mauve font-semibold hover:bg-[#E8B4B8]/20 hover:scale-105 transition-all duration-250"
            >
              Let&apos;s Talk ✨
            </Link>
          </motion.div>

          {/* Stat badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            {[
              { value: "1+", label: "Year Experience" },
              { value: "30-40%", label: "Follower Growth" },
              { value: "20-25%", label: "Engagement Boost" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-5 py-3 flex flex-col items-center min-w-[90px]"
              >
                <span className="font-serif font-bold text-xl text-gradient">
                  {stat.value}
                </span>
                <span className="text-xs text-mauve/60 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Photo Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative">
            {/* Decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-24px] rounded-full border border-dashed border-[#E8B4B8]/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-48px] rounded-full border border-dashed border-[#C8A4D4]/20"
            />

            {/* Photo frame */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-[40%_60%_55%_45%/45%_55%_60%_40%] overflow-hidden shadow-[0_20px_60px_rgba(200,134,142,0.35)] border-4 border-white">
              <Image
                src="/beth.jpeg"
                alt="Bethany Amahia — Social Media Manager"
                fill
                className="object-cover"
                priority
                onError={(e) => {
                  // Show initials placeholder if image not found
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              {/* Fallback gradient if no photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#E8B4B8] to-[#C8A4D4] flex items-center justify-center">
                <span className="font-serif text-white text-7xl font-bold opacity-30">B</span>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-6 glass rounded-2xl px-4 py-2.5 shadow-card"
            >
              <span className="text-xs text-mauve font-semibold">✨ Meta Certified</span>
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-4 -right-6 glass rounded-2xl px-4 py-2.5 shadow-card"
            >
              <span className="text-xs text-mauve font-semibold">🌟 HubSpot Certified</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-mauve/50 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-[#E8B4B8] to-transparent"
        />
      </motion.div>
    </section>
  );
}
