"use client";

import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, Music2 } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/beth.mahia",
    icon: <Instagram size={18} />,
    color: "hover:text-[#E8B4B8]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bethany-amahia-566188327",
    icon: <Linkedin size={18} />,
    color: "hover:text-[#C8A4D4]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@beth.mahia",
    icon: <Music2 size={18} />,
    color: "hover:text-[#8FAF8F]",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2347065396249",
    icon: <Phone size={18} />,
    color: "hover:text-[#8FAF8F]",
  },
  {
    label: "Email",
    href: "mailto:amahiabethany13@gmail.com",
    icon: <Mail size={18} />,
    color: "hover:text-[#E8B4B8]",
  },
];

const footerLinks = [
  { label: "About", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#2D2020] to-[#6B4C55] text-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#E8B4B8] opacity-5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-[#C8A4D4] opacity-5 translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8B4B8] to-[#C8A4D4] flex items-center justify-center">
                <span className="text-white text-xs font-bold font-serif">B</span>
              </div>
              <span className="font-serif text-lg font-semibold">beth.mahia</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Social media manager helping brands tell stories that stop the scroll.
              Based in Lagos, Nigeria 🇳🇬
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#E8B4B8] mb-4">
              Pages
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-[#E8B4B8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#E8B4B8] mb-4">
              Find Me On
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-sm text-white/60 transition-colors ${s.color}`}
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Bethany Amahia Chioma. All rights reserved.
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-white/40"
          >
            Crafted with{" "}
            <span className="text-[#E8B4B8]">♥</span> for storytelling
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
