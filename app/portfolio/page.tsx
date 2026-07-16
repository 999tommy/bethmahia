"use client";

import { motion, Variants } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  TrendingUp,
  Users,
  BarChart2,
  Heart,
  Star,
} from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const works = [
  {
    id: "naijabiz",
    role: "Junior Social Media Manager",
    company: "Naijabiz Organisation",
    period: "November 2025 – July 2026",
    duration: "9 months",
    platforms: ["Instagram", "Facebook", "X/Twitter"],
    color: "from-[#E8B4B8] to-[#C8A4D4]",
    bg: "from-[#E8B4B8]/10 to-[#C8A4D4]/10",
    border: "border-[#E8B4B8]/40",
    accent: "#C8868E",
    emoji: "🌸",
    story: `This is where I grew up professionally. When I stepped into the Junior Social Media Manager role at Naijabiz, I wasn't just handed tasks — I was handed ownership. I owned the entire social media presence: the strategy, the content, the publishing, the community, the ads, and the reports.

There were weeks when I'd refresh analytics at midnight, not because I had to, but because I genuinely wanted to see how a caption tweak had moved the needle. I refined posting times, experimented with formats, listened to the community's feedback in the comments, and watched the numbers respond. That feedback loop — creativity, data, and community — became my favourite part of the job.

What I'm most proud of isn't just the follower growth. It's the fact that real people began to *expect* our content. They showed up for it. That's brand loyalty you can't fake.`,
    love: "I loved watching a perfectly timed post spark real conversations in the comments.",
    stats: [
      { label: "Follower Growth", value: "30-40%", icon: <TrendingUp size={18} />, color: "#C8868E" },
      { label: "Engagement Boost", value: "20-25%", icon: <BarChart2 size={18} />, color: "#9B6DB5" },
      { label: "Months of Growth", value: "9", icon: <Star size={18} />, color: "#5C7A5C" },
      { label: "Monthly Reports", value: "9+", icon: <BarChart2 size={18} />, color: "#C8868E" },
    ],
    achievements: [
      "Owned end-to-end social media management across 3 platforms",
      "Planned and executed monthly content calendars aligned with brand campaigns",
      "Set up and monitored paid ad campaigns on Meta Ads Manager",
      "Managed day-to-day community engagement — comments & DMs",
      "Compiled performance reports with actionable recommendations",
      "Collaborated with design and marketing teams to keep content on-brand",
    ],
  },
  {
    id: "axist",
    role: "Social Media Marketing Intern",
    company: "Axist Technology",
    period: "July 2025 – October 2025",
    duration: "4 months",
    platforms: ["Instagram", "LinkedIn", "X/Twitter"],
    color: "from-[#8FAF8F] to-[#C8A4D4]",
    bg: "from-[#8FAF8F]/10 to-[#C8A4D4]/10",
    border: "border-[#8FAF8F]/40",
    accent: "#5C7A5C",
    emoji: "🌿",
    story: `Axist is where the fire started. I walked in as an intern and walked out as someone who knew — without question — that social media management was her path.

Every task felt like a discovery. Scheduling a post, I'd think: what time will this land best? Writing a caption, I'd ask: what would make me stop mid-scroll? Monitoring comments, I'd notice patterns in what people were asking, laughing at, pushing back on. The internship gave me the foundation — tools, rhythm, instincts — and I absorbed every bit of it.

I was never just doing tasks. I was studying how a brand lives on the internet, and I fell completely in love with the process. That curiosity and passion is what I carry into every project I work on now.`,
    love: "I loved the moment I realised: every scroll is a chance to make someone feel something.",
    stats: [
      { label: "Platforms Managed", value: "3+", icon: <Instagram size={18} />, color: "#5C7A5C" },
      { label: "Months of Learning", value: "4", icon: <Star size={18} />, color: "#9B6DB5" },
      { label: "Community Touchpoints", value: "100s", icon: <Users size={18} />, color: "#5C7A5C" },
      { label: "Passion Level", value: "∞", icon: <Heart size={18} />, color: "#C8868E" },
    ],
    achievements: [
      "Supported content creation, scheduling, and publishing across core platforms",
      "Monitored comments and messages, flagging engagement opportunities",
      "Conducted competitor and trend research for campaign planning",
      "Maintained the content calendar and supported Canva design requests",
      "Gained hands-on exposure to analytics tools and ad campaign setup",
    ],
  },
];

const platformIcons: Record<string, React.ReactNode> = {
  Instagram: <Instagram size={14} />,
  Facebook: <Facebook size={14} />,
  "X/Twitter": <Twitter size={14} />,
  LinkedIn: <span className="text-xs font-bold">in</span>,
  TikTok: <span className="text-xs">♪</span>,
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#2D2020] via-[#6B4C55] to-[#2D2020] overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                background: i % 2 === 0
                  ? "rgba(232,180,184,0.08)"
                  : "rgba(200,164,212,0.06)",
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill bg-white/10 text-white border border-white/20 mb-6 inline-block"
          >
            My Work
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Every brand has a story.
            <br />
            <span className="text-gradient-rose">Here&apos;s how I helped tell theirs.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Two roles. Dozens of campaigns. Thousands of conversations. And a genuine love
            for every moment of it — the late-night drafts, the viral posts, the quiet wins
            that only the analytics know about.
          </motion.p>
        </div>
      </section>

      {/* Global Stats Bar */}
      <section className="bg-cream-warm border-b border-[#E8B4B8]/30">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Follower Growth", value: "30–40%", sub: "9-month journey" },
              { label: "Engagement Boost", value: "20–25%", sub: "Through data & creativity" },
              { label: "Platforms Managed", value: "5+", sub: "Instagram, FB, X, LinkedIn, TikTok" },
              { label: "Certifications", value: "3", sub: "Meta, Accenture, HubSpot" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center p-4"
              >
                <div className="font-serif text-3xl md:text-4xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="font-semibold text-mauve-dark text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-mauve/50">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Work Cards */}
      <section className="max-w-5xl mx-auto px-6 py-20 space-y-24">
        {works.map((work, wi) => (
          <motion.article
            key={work.id}
            id={`work-${work.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className={`relative rounded-3xl bg-gradient-to-br ${work.bg} border ${work.border} overflow-hidden shadow-card`}
          >
            {/* Decorative gradient top strip */}
            <div className={`h-2 bg-gradient-to-r ${work.color}`} />

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{work.emoji}</span>
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-mauve-dark">
                        {work.company}
                      </h2>
                      <p className="text-mauve/70 font-medium">{work.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span
                    className="pill text-xs font-semibold"
                    style={{
                      background: `${work.accent}20`,
                      color: work.accent,
                      border: `1px solid ${work.accent}40`,
                    }}
                  >
                    {work.period}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {work.platforms.map((p) => (
                      <span
                        key={p}
                        className="pill text-xs bg-white/60 text-mauve border border-[#E8B4B8]/30 flex items-center gap-1"
                      >
                        {platformIcons[p]}
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {work.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                  >
                    <div className="flex justify-center mb-2" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div
                      className="font-serif text-2xl font-bold mb-0.5"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-mauve/60">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Story */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-mauve-dark mb-4">
                    The Story
                  </h3>
                  {work.story.split("\n\n").map((para, i) => (
                    <p key={i} className="text-mauve/75 leading-relaxed mb-4 text-sm md:text-base">
                      {para}
                    </p>
                  ))}

                  {/* Love quote */}
                  <div
                    className="mt-6 p-5 rounded-2xl border-l-4 italic text-mauve-dark font-serif text-base"
                    style={{
                      borderColor: work.accent,
                      background: `${work.accent}12`,
                    }}
                  >
                    <Heart size={16} className="inline mr-2" style={{ color: work.accent }} />
                    {work.love}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-serif text-xl font-semibold text-mauve-dark mb-4">
                    Key Achievements
                  </h3>
                  <ul className="space-y-3">
                    {work.achievements.map((ach, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 text-sm text-mauve/75"
                      >
                        <span
                          className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                          style={{ background: `linear-gradient(135deg, ${work.accent}, ${wi === 0 ? '#9B6DB5' : '#8FAF8F'})` }}
                        >
                          ✓
                        </span>
                        {ach}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      {/* Skills visual section */}
      <section className="bg-gradient-to-br from-cream-warm to-cream py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-mauve-dark">
              Skills in Action
            </h2>
            <p className="text-mauve/60 mt-3">
              How I rate myself across core competencies
            </p>
          </motion.div>

          <div className="space-y-5">
            {[
              { label: "Content Strategy & Planning", pct: 92, color: "#E8B4B8" },
              { label: "Community Management", pct: 90, color: "#C8A4D4" },
              { label: "Copywriting & Brand Voice", pct: 88, color: "#8FAF8F" },
              { label: "Meta Ads & Paid Social", pct: 78, color: "#E8B4B8" },
              { label: "Analytics & Reporting", pct: 85, color: "#C8A4D4" },
              { label: "Graphic Design (Canva)", pct: 87, color: "#8FAF8F" },
              { label: "Video Content (CapCut)", pct: 80, color: "#E8B4B8" },
            ].map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-mauve-dark">{skill.label}</span>
                  <span className="text-sm font-bold" style={{ color: skill.color }}>
                    {skill.pct}%
                  </span>
                </div>
                <div className="h-2.5 bg-cream-dark rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${
                        skill.color === "#E8B4B8" ? "#C8A4D4" : skill.color === "#C8A4D4" ? "#8FAF8F" : "#E8B4B8"
                      })`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#E8B4B8]/20 to-[#C8A4D4]/20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto px-6"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-mauve-dark mb-4">
            Let&apos;s write the next chapter together
          </h2>
          <p className="text-mauve/70 mb-8">
            Your brand deserves content that connects, converts, and keeps people coming back.
          </p>
          <Link
            href="/contact"
            id="portfolio-cta-btn"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C8868E] to-[#9B6DB5] text-white font-semibold shadow-rose hover:shadow-lavender hover:scale-105 transition-all duration-250"
          >
            Start a Conversation ✨
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
