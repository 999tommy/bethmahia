"use client";

import { motion, Variants } from "framer-motion";
import { Download, Briefcase, GraduationCap, Award, ChevronRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const experience = [
  {
    role: "Junior Social Media Manager",
    company: "Naijabiz Organisation",
    period: "November 2025 – July 2026",
    type: "Full-time",
    color: "#E8B4B8",
    bullets: [
      "Owned end-to-end social media management across Instagram, Facebook, and X/Twitter",
      "Grew combined follower base by an estimated 30–40% over 9 months",
      "Increased average post engagement rate by 20–25% through content refinement",
      "Planned and executed monthly content calendars for campaigns and product launches",
      "Managed community engagement — comments and DMs to strengthen relationships",
      "Set up and monitored paid ad campaigns on Meta Ads Manager",
      "Compiled monthly performance reports with actionable recommendations",
      "Collaborated with design and marketing teams on visual content",
    ],
  },
  {
    role: "Social Media Marketing Intern",
    company: "Axist Technology",
    period: "July 2025 – October 2025",
    type: "Internship",
    color: "#8FAF8F",
    bullets: [
      "Supported content creation, scheduling, and publishing across core platforms",
      "Assisted with community management and flagging engagement opportunities",
      "Conducted competitor and trend research for content and campaign planning",
      "Helped maintain the content calendar and supported Canva design requests",
      "Gained hands-on exposure to analytics tools and basic ad campaign setup",
    ],
  },
];

const education = [
  {
    degree: "BSc in Anatomy",
    institution: "University (Nigeria)",
    year: "2026",
    color: "#C8A4D4",
    note: "Scientific, detail-driven foundation that shapes a data-first approach to social media strategy.",
  },
];

const certifications = [
  {
    name: "Meta Social Media Marketing Professional Certificate",
    issuer: "Meta",
    emoji: "🏆",
    color: "#E8B4B8",
    desc: "Covers Meta Ads Manager, campaign strategy, and performance marketing.",
  },
  {
    name: "Digital Marketing Certificate",
    issuer: "Accenture",
    emoji: "✨",
    color: "#C8A4D4",
    desc: "Comprehensive digital marketing fundamentals and industry best practices.",
  },
  {
    name: "Social Media Marketing Certification",
    issuer: "HubSpot Academy",
    emoji: "🎯",
    color: "#8FAF8F",
    desc: "Social media strategy, content creation, and community building.",
  },
];

const skills = [
  "Content Strategy & Editorial Calendar Planning",
  "Copywriting & Brand Voice Development",
  "Community Management & Audience Engagement",
  "Paid Social Advertising (Meta Ads Manager)",
  "Analytics & Performance Reporting",
  "Platform Management: Instagram, Facebook, X/Twitter, TikTok, LinkedIn",
  "Meta Business Suite, Canva, Buffer/Hootsuite",
  "Trend Research & Competitor Analysis",
  "Influencer & Partnership Coordination",
  "Cross-functional Collaboration",
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#2D2020] to-[#6B4C55] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${100 + i * 80}px`,
                height: `${100 + i * 80}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pill bg-white/10 text-white border border-white/20 mb-6 inline-block">
              Resume
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
              Bethany Amahia Chioma
            </h1>
            <p className="text-white/60 text-lg mb-2">Intermediate Social Media Manager</p>
            <p className="text-white/40 text-sm mb-8">
              Lagos, Nigeria • amahiabethany13@gmail.com • 07065396249
            </p>
            <motion.a
              href="/bethany-amahia-resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E8B4B8] to-[#C8A4D4] text-white font-semibold shadow-rose hover:shadow-lavender transition-all duration-250"
              id="download-resume-btn"
            >
              <Download size={18} />
              Download PDF Resume
            </motion.a>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* Professional Profile */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-[#E8B4B8]/30 flex items-center justify-center">
              <ChevronRight size={16} className="text-[#C8868E]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-mauve-dark">Professional Profile</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E8B4B8] to-transparent" />
          </div>
          <div className="glass rounded-2xl p-6 border border-[#E8B4B8]/30">
            <p className="text-mauve/80 leading-relaxed">
              Social media manager with over a year of hands-on experience building brand
              presence from the ground up, moving from an internship into a junior management
              role where I owned content strategy, community growth, and paid campaigns. I
              combine a scientific, detail-driven background (BSc Anatomy) with formal training
              in digital marketing (Meta, Accenture, and HubSpot certified) to plan content that
              is both creative and grounded in data. I&apos;m comfortable running the full social
              media cycle end to end: research, content calendars, copywriting, scheduling,
              community management, ad campaigns, and performance reporting.
            </p>
          </div>
        </motion.section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#E8B4B8]/30 flex items-center justify-center">
              <Briefcase size={16} className="text-[#C8868E]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-mauve-dark">Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E8B4B8] to-transparent" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8B4B8] via-[#C8A4D4] to-[#8FAF8F]" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10 pl-10"
            >
              {experience.map((exp, i) => (
                <motion.div key={exp.company} variants={itemVariants} className="relative">
                  {/* Timeline dot */}
                  <div
                    className="absolute -left-10 top-1.5 w-5 h-5 rounded-full border-4 border-cream shadow-card"
                    style={{ background: exp.color }}
                  />

                  <div className="glass rounded-2xl p-6 border hover:shadow-card-hover transition-shadow duration-300"
                    style={{ borderColor: `${exp.color}60` }}>
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-mauve-dark">{exp.role}</h3>
                        <p className="font-semibold" style={{ color: exp.color }}>{exp.company}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end gap-1">
                        <span className="text-sm text-mauve/60">{exp.period}</span>
                        <span
                          className="pill text-xs"
                          style={{
                            background: `${exp.color}20`,
                            color: exp.color,
                            border: `1px solid ${exp.color}40`,
                          }}
                        >
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2 text-sm text-mauve/70">
                          <span
                            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: exp.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#C8A4D4]/30 flex items-center justify-center">
              <GraduationCap size={16} className="text-[#9B6DB5]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-mauve-dark">Education</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#C8A4D4] to-transparent" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {education.map((edu) => (
              <motion.div
                key={edu.degree}
                variants={itemVariants}
                className="glass rounded-2xl p-6 border"
                style={{ borderColor: `${edu.color}40` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-bold text-mauve-dark">{edu.degree}</h3>
                  <span
                    className="pill text-xs font-semibold"
                    style={{
                      background: `${edu.color}20`,
                      color: edu.color,
                      border: `1px solid ${edu.color}40`,
                    }}
                  >
                    Class of {edu.year}
                  </span>
                </div>
                <p className="text-mauve/70 text-sm mb-2">{edu.institution}</p>
                <p className="text-mauve/50 text-xs italic">{edu.note}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Certifications */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#8FAF8F]/30 flex items-center justify-center">
              <Award size={16} className="text-[#5C7A5C]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-mauve-dark">Certifications</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#8FAF8F] to-transparent" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 border text-center hover:shadow-card-hover transition-all duration-300"
                style={{ borderColor: `${cert.color}40` }}
              >
                <span className="text-4xl mb-4 block">{cert.emoji}</span>
                <div
                  className="pill text-xs font-bold mb-3 mx-auto w-fit"
                  style={{
                    background: `${cert.color}20`,
                    color: cert.color,
                    border: `1px solid ${cert.color}40`,
                  }}
                >
                  {cert.issuer}
                </div>
                <h3 className="font-serif font-semibold text-mauve-dark text-sm mb-2 leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs text-mauve/55 leading-relaxed">{cert.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Core Skills */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-[#E8B4B8]/30 flex items-center justify-center">
              <ChevronRight size={16} className="text-[#C8868E]" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-mauve-dark">Core Skills</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E8B4B8] to-transparent" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="pill text-sm"
                style={{
                  background: i % 3 === 0
                    ? "rgba(232,180,184,0.15)"
                    : i % 3 === 1
                    ? "rgba(200,164,212,0.15)"
                    : "rgba(143,175,143,0.15)",
                  color: i % 3 === 0 ? "#C8868E" : i % 3 === 1 ? "#9B6DB5" : "#5C7A5C",
                  border: `1px solid ${
                    i % 3 === 0
                      ? "rgba(200,134,142,0.3)"
                      : i % 3 === 1
                      ? "rgba(155,109,181,0.3)"
                      : "rgba(92,122,92,0.3)"
                  }`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}
