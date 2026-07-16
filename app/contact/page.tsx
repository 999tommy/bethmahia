"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Music2,
  Send,
  MessageCircle,
  MapPin,
} from "lucide-react";

const socialCards = [
  {
    id: "instagram-link",
    label: "Instagram",
    handle: "@beth.mahia",
    href: "https://www.instagram.com/beth.mahia",
    icon: <Instagram size={24} />,
    color: "from-[#E8B4B8] to-[#C8A4D4]",
    bg: "from-[#E8B4B8]/15 to-[#C8A4D4]/15",
    border: "border-[#E8B4B8]/40",
    desc: "Day-to-day life, behind the scenes, and social media tips",
  },
  {
    id: "linkedin-link",
    label: "LinkedIn",
    handle: "Bethany Amahia",
    href: "https://www.linkedin.com/in/bethany-amahia-566188327",
    icon: <Linkedin size={24} />,
    color: "from-[#C8A4D4] to-[#9B6DB5]",
    bg: "from-[#C8A4D4]/15 to-[#E8D5F0]/15",
    border: "border-[#C8A4D4]/40",
    desc: "Professional updates, articles, and career milestones",
  },
  {
    id: "tiktok-link",
    label: "TikTok",
    handle: "@beth.mahia",
    href: "https://www.tiktok.com/@beth.mahia",
    icon: <Music2 size={24} />,
    color: "from-[#8FAF8F] to-[#C8A4D4]",
    bg: "from-[#8FAF8F]/15 to-[#C4D9C4]/15",
    border: "border-[#8FAF8F]/40",
    desc: "Short-form content, trends, and social media how-tos",
  },
  {
    id: "whatsapp-link",
    label: "WhatsApp",
    handle: "+234 706 539 6249",
    href: "https://wa.me/2347065396249",
    icon: <Phone size={24} />,
    color: "from-[#8FAF8F] to-[#5C7A5C]",
    bg: "from-[#8FAF8F]/15 to-[#C4D9C4]/15",
    border: "border-[#8FAF8F]/40",
    desc: "Quick DMs for project enquiries and collabs",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const subject = encodeURIComponent(
      formData.subject || `Portfolio Contact from ${formData.name}`
    );
    const body = encodeURIComponent(
      `Hi Bethany,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}\n\nBest regards,\n${formData.name}`
    );

    window.location.href = `mailto:amahiabethany13@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => setSending(false), 2000);
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#2D2020] to-[#6B4C55] overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${80 + i * 50}px`,
                height: `${80 + i * 50}px`,
                background: i % 2 === 0
                  ? "rgba(232,180,184,0.07)"
                  : "rgba(200,164,212,0.05)",
                right: `${(i * 15) % 80}%`,
                top: `${(i * 20) % 80}%`,
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pill bg-white/10 text-white border border-white/20 mb-6 inline-block"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Let&apos;s build something{" "}
            <span className="text-gradient-rose">great together</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-white/60 text-lg max-w-xl mx-auto"
          >
            Whether you have a project in mind, want to collaborate, or just want to say hi —
            my inbox is always open. I typically respond within 24 hours 💌
          </motion.p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">

        {/* Contact Form — 3 cols */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <h2 className="font-serif text-2xl font-bold text-mauve-dark mb-2">Send a message</h2>
          <p className="text-mauve/60 text-sm mb-8">
            Fill in the form below and it will open in your Gmail to send 📬
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-mauve-dark mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4B8]/50 bg-white/80 text-mauve-dark placeholder-mauve/30 focus:outline-none focus:border-[#C8868E] focus:ring-2 focus:ring-[#E8B4B8]/30 transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-mauve-dark mb-2">
                  Your Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#E8B4B8]/50 bg-white/80 text-mauve-dark placeholder-mauve/30 focus:outline-none focus:border-[#C8868E] focus:ring-2 focus:ring-[#E8B4B8]/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-mauve-dark mb-2">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E8B4B8]/50 bg-white/80 text-mauve-dark focus:outline-none focus:border-[#C8868E] focus:ring-2 focus:ring-[#E8B4B8]/30 transition-all"
              >
                <option value="">Select a topic...</option>
                <option value="Social Media Management Enquiry">Social Media Management Enquiry</option>
                <option value="Content Strategy Consultation">Content Strategy Consultation</option>
                <option value="Collaboration Opportunity">Collaboration Opportunity</option>
                <option value="General Enquiry">General Enquiry</option>
                <option value="Just Saying Hi!">Just Saying Hi! 👋</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-mauve-dark mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your brand, your goals, and how I can help..."
                className="w-full px-4 py-3 rounded-xl border border-[#E8B4B8]/50 bg-white/80 text-mauve-dark placeholder-mauve/30 focus:outline-none focus:border-[#C8868E] focus:ring-2 focus:ring-[#E8B4B8]/30 transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              id="submit-contact-btn"
              disabled={sending}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-[#C8868E] to-[#9B6DB5] text-white font-semibold shadow-rose hover:shadow-lavender transition-all duration-250 disabled:opacity-60"
            >
              <Send size={18} />
              {sending ? "Opening Gmail..." : "Send Message via Gmail"}
            </motion.button>

            <p className="text-xs text-center text-mauve/40">
              This will open your Gmail compose window with the message pre-filled.
            </p>
          </form>
        </motion.div>

        {/* Sidebar — 2 cols */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Direct contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-mauve-dark mb-4">
              Reach me directly
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:amahiabethany13@gmail.com"
                id="direct-email-link"
                className="flex items-center gap-3 p-4 glass rounded-xl border border-[#E8B4B8]/30 hover:border-[#E8B4B8]/70 hover:shadow-rose transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#E8B4B8]/20 flex items-center justify-center text-[#C8868E] group-hover:bg-[#E8B4B8]/40 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-mauve/50 font-medium">Email</p>
                  <p className="text-sm text-mauve-dark font-medium">amahiabethany13@gmail.com</p>
                </div>
              </a>
              <a
                href="https://wa.me/2347065396249"
                id="direct-whatsapp-link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass rounded-xl border border-[#8FAF8F]/30 hover:border-[#8FAF8F]/70 hover:shadow-sage transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-[#8FAF8F]/20 flex items-center justify-center text-[#5C7A5C] group-hover:bg-[#8FAF8F]/40 transition-colors">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-xs text-mauve/50 font-medium">WhatsApp</p>
                  <p className="text-sm text-mauve-dark font-medium">+234 706 539 6249</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 glass rounded-xl border border-[#C8A4D4]/30">
                <div className="w-9 h-9 rounded-lg bg-[#C8A4D4]/20 flex items-center justify-center text-[#9B6DB5]">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-mauve/50 font-medium">Location</p>
                  <p className="text-sm text-mauve-dark font-medium">Lagos, Nigeria 🇳🇬</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-serif text-lg font-bold text-mauve-dark mb-4">
              Find me on social
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {socialCards.map((s) => (
                <motion.a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ x: 4, scale: 1.02 }}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${s.bg} border ${s.border} hover:shadow-card transition-all duration-250`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-mauve-dark">{s.label}</p>
                    <p className="text-xs text-mauve/60">{s.handle}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
