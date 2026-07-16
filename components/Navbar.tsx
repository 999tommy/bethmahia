"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-card py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8B4B8] to-[#C8A4D4] flex items-center justify-center shadow-rose">
              <span className="text-white text-xs font-bold font-serif">B</span>
            </div>
            <span className="font-serif text-lg font-semibold text-mauve-dark group-hover:text-[#C8868E] transition-colors duration-200">
              beth.mahia
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover-underline ${
                  pathname === link.href
                    ? "text-[#C8868E]"
                    : "text-mauve hover:text-[#C8868E]"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8B4B8] to-[#C8A4D4] rounded-full"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#C8A4D4] text-white text-sm font-semibold shadow-rose hover:shadow-lavender hover:scale-105 transition-all duration-200"
            >
              Let&apos;s Talk ✨
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-mauve hover:text-[#C8868E] transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 glass flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  className={`text-2xl font-serif font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-gradient"
                      : "text-mauve-dark hover:text-[#C8868E]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#C8A4D4] text-white font-semibold shadow-rose"
              >
                Let&apos;s Talk ✨
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
