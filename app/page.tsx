"use client";

import Hero from "@/components/Hero";
import { motion, Variants } from "framer-motion";
import {
  BarChart2,
  Calendar,
  PenTool,
  Palette,
  MessageCircle,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";

const services = [
  {
    icon: <TrendingUp size={22} />,
    title: "Social Media Strategy",
    description:
      "Data-driven strategies tailored to your brand goals — from audience research to full content roadmaps.",
    color: "from-[#E8B4B8]/20 to-[#C8A4D4]/20",
    border: "border-[#E8B4B8]/40",
    iconBg: "bg-[#E8B4B8]/30 text-[#C8868E]",
  },
  {
    icon: <Calendar size={22} />,
    title: "Content Scheduling & Publishing",
    description:
      "Consistent, on-time posting across all platforms using industry-leading scheduling tools.",
    color: "from-[#C8A4D4]/20 to-[#E8D5F0]/20",
    border: "border-[#C8A4D4]/40",
    iconBg: "bg-[#C8A4D4]/30 text-[#9B6DB5]",
  },
  {
    icon: <PenTool size={22} />,
    title: "Copywriting",
    description:
      "Captions, hooks, CTAs, and brand voice development that speak directly to your audience.",
    color: "from-[#8FAF8F]/20 to-[#C4D9C4]/20",
    border: "border-[#8FAF8F]/40",
    iconBg: "bg-[#8FAF8F]/30 text-[#5C7A5C]",
  },
  {
    icon: <Palette size={22} />,
    title: "Graphic Design",
    description:
      "Scroll-stopping visuals, branded templates, and aesthetic feeds that leave a lasting impression.",
    color: "from-[#F5D5DA]/30 to-[#E8B4B8]/20",
    border: "border-[#F5D5DA]/60",
    iconBg: "bg-[#F5D5DA]/50 text-[#C8868E]",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Consultation & Optimisation",
    description:
      "Social media audits, performance deep-dives, and actionable optimisation recommendations.",
    color: "from-[#E8D5F0]/20 to-[#C8A4D4]/20",
    border: "border-[#E8D5F0]/40",
    iconBg: "bg-[#E8D5F0]/40 text-[#9B6DB5]",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Meme & Trend-Based Content",
    description:
      "Timely, relatable content that rides viral trends and keeps your brand culturally relevant.",
    color: "from-[#C4D9C4]/20 to-[#8FAF8F]/20",
    border: "border-[#C4D9C4]/40",
    iconBg: "bg-[#C4D9C4]/40 text-[#5C7A5C]",
  },
  {
    icon: <Users size={22} />,
    title: "Community Management",
    description:
      "Building real human connections — responding to comments, DMs, and growing a loyal brand community.",
    color: "from-[#E8B4B8]/20 to-[#F5D5DA]/30",
    border: "border-[#E8B4B8]/30",
    iconBg: "bg-[#E8B4B8]/25 text-[#C8868E]",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile Video & Photography",
    description:
      "High-quality vertical video content, reels, and photography tailored for social-first platforms.",
    color: "from-[#C8A4D4]/20 to-[#C4D9C4]/20",
    border: "border-[#C8A4D4]/30",
    iconBg: "bg-[#C8A4D4]/25 text-[#9B6DB5]",
  },
];

const tools = [
  { name: "Canva", emoji: "🎨" },
  { name: "CapCut", emoji: "🎬" },
  { name: "Hootsuite", emoji: "📅" },
  { name: "Google Analytics", emoji: "📊" },
  { name: "Flick", emoji: "🔍" },
  { name: "Meta Ads Manager", emoji: "📢" },
  { name: "Buffer", emoji: "🗓️" },
  { name: "Meta Business Suite", emoji: "💼" },
];

const expertise = [
  "Social Media Strategy",
  "Hashtag Research",
  "Content Calendar Planning",
  "Graphic Design",
  "Community Engagement",
  "Content Creation",
  "Brand Management",
  "Customer Service",
  "Paid Social Advertising",
  "Analytics & Reporting",
  "Trend Research",
  "Influencer Coordination",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <div>
      <Hero />

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="pill bg-[#C8A4D4]/20 text-[#9B6DB5] border border-[#C8A4D4]/40 mb-4 inline-block">
              About Me
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-mauve-dark mb-6 leading-tight">
              The person behind the{" "}
              <span className="text-gradient">content</span>
            </h2>
            <p className="text-mauve/80 leading-relaxed text-lg mb-6">
              I&apos;m a result-driven social media manager with expertise in content
              creation, digital marketing, content strategy, media coverage for
              events, and video content editing.
            </p>
            <p className="text-mauve/70 leading-relaxed mb-6">
              With a passion for storytelling and audience engagement, I help brands
              create impactful digital experiences that drive growth and visibility.
              From crafting compelling content to executing strategic campaigns, I
              bring creativity and data-driven insights to every project.
            </p>
            <p className="text-mauve/70 leading-relaxed mb-8">
              What makes me a little different? I combine a scientific,
              detail-driven background (BSc Anatomy) with formal digital marketing
              training — so I see patterns, test hypotheses, and report like a
              strategist, but create like a storyteller.
            </p>
            <div className="flex items-center gap-3 text-sm text-mauve/60">
              <span className="w-8 h-px bg-[#E8B4B8]" />
              <span>📍 Lagos, Nigeria</span>
              <span className="w-8 h-px bg-[#E8B4B8]" />
              <span>🎓 BSc Anatomy, 2026</span>
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#E8B4B8]/20 to-[#C8A4D4]/20 rounded-3xl blur-xl" />
            <div className="relative glass rounded-3xl p-8 md:p-10 border border-[#E8B4B8]/30">
              <div className="text-6xl font-serif text-[#E8B4B8] mb-4 leading-none">&ldquo;</div>
              <p className="font-serif text-xl md:text-2xl text-mauve-dark italic leading-relaxed mb-6">
                Let&apos;s build something great together.
              </p>
              <p className="text-mauve/60 text-sm leading-relaxed">
                Every brand deserves a social media presence that feels human, authentic,
                and impossible to ignore. That&apos;s what I wake up to do every day.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {["Meta Certified", "Accenture Certified", "HubSpot Certified"].map((cert) => (
                  <span
                    key={cert}
                    className="pill bg-gradient-to-r from-[#E8B4B8]/20 to-[#C8A4D4]/20 text-mauve border border-[#E8B4B8]/40 text-xs"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-b from-cream-warm to-cream py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="pill bg-[#8FAF8F]/20 text-[#5C7A5C] border border-[#8FAF8F]/40 mb-4 inline-block">
              What I Do
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-mauve-dark">
              Services I Provide
            </h2>
            <p className="mt-4 text-mauve/60 max-w-xl mx-auto">
              From strategy to execution — I handle the full social media cycle so you can focus on what you do best.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${service.color} border ${service.border} shadow-card hover:shadow-card-hover transition-all duration-300 cursor-default`}
              >
                <div className={`w-10 h-10 rounded-xl ${service.iconBg} flex items-center justify-center mb-4`}>
                  {service.icon}
                </div>
                <h3 className="font-serif font-semibold text-mauve-dark mb-2 text-base leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs text-mauve/65 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="pill bg-[#E8B4B8]/20 text-[#C8868E] border border-[#E8B4B8]/40 mb-4 inline-block">
              My Toolkit
            </span>
            <h2 className="font-serif text-4xl font-bold text-mauve-dark">
              Tools I Use
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -4 }}
                animate={{
                  y: [0, -6, 0],
                  transition: {
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  },
                }}
                className="glass rounded-2xl px-6 py-4 flex items-center gap-3 shadow-card hover:shadow-rose transition-all duration-300 cursor-default"
              >
                <span className="text-2xl">{tool.emoji}</span>
                <span className="font-medium text-mauve-dark text-sm">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="bg-gradient-to-r from-[#2D2020] to-[#6B4C55] py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="pill bg-white/10 text-white border border-white/20 mb-4 inline-block">
              My Expertise
            </span>
            <h2 className="font-serif text-4xl font-bold text-white">
              What I&apos;m Really Good At
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {expertise.map((skill, i) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.08 }}
                className="pill text-sm font-medium"
                style={{
                  background: i % 3 === 0
                    ? "rgba(232,180,184,0.2)"
                    : i % 3 === 1
                    ? "rgba(200,164,212,0.2)"
                    : "rgba(143,175,143,0.2)",
                  color: i % 3 === 0 ? "#F5D5DA" : i % 3 === 1 ? "#E8D5F0" : "#C4D9C4",
                  border: `1px solid ${
                    i % 3 === 0
                      ? "rgba(232,180,184,0.3)"
                      : i % 3 === 1
                      ? "rgba(200,164,212,0.3)"
                      : "rgba(143,175,143,0.3)"
                  }`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-hero-gradient">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-mauve-dark mb-6">
              Ready to grow your brand?
            </h2>
            <p className="text-mauve/70 text-lg mb-10">
              Let&apos;s talk about your goals, your audience, and how we can build something your followers will love.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:amahiabethany13@gmail.com"
                id="cta-email-btn"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C8868E] to-[#9B6DB5] text-white font-semibold shadow-rose hover:shadow-lavender hover:scale-105 transition-all duration-250"
              >
                Email Me 📬
              </a>
              <a
                href="https://wa.me/2347065396249"
                id="cta-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border-2 border-[#E8B4B8] text-mauve font-semibold hover:bg-[#E8B4B8]/20 hover:scale-105 transition-all duration-250"
              >
                WhatsApp Me 💬
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
