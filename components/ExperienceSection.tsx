"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MapPin, ExternalLink } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  tagline?: string;
  stats?: { value: string; label: string }[];
  stack: string[];
  highlights: { title: string; text: string }[];
  type: "work" | "education" | "research";
  link?: string;
  image?: string;
  color: string;
}

const experiences: Experience[] = [
  {
    company: "Lockchain",
    role: "Backend Engineering Intern",
    period: "Jan 2025 – Present",
    location: "Remote",
    tagline: "AI-native crypto intelligence platform used by Gemini, Broadridge, GSR, and ADGM. Joined as a Frontend Engineering Intern in Spring 2025.",
    stats: [
      { value: "22", label: "Production workflows migrated" },
      { value: "11", label: "Data providers unified" },
      { value: "93s", label: "Nightly job, first attempt" },
      { value: "145+", label: "PRs merged" }
    ],
    stack: ["DynamoDB", "SQS", "Lambda", "Fargate", "S3", "pydantic-ai", "Next.js", "React"],
    type: "work",
    link: "https://lockchain.ai",
    image: "/lockchain.jpg",
    color: "from-orange-500/15 to-amber-500/5",
    highlights: [
      {
        title: "Durable workflow orchestrator",
        text: "Primary engineer, co-designed with the CTO. Unified 4 siloed systems on DynamoDB, SQS, Lambda, and Fargate, and migrated 22 production data workflows across 11 providers."
      },
      {
        title: "Crash-safe execution",
        text: "Per-step checkpoints and S3-backed state let runs resume from the point of failure, pause for analyst review without holding compute, and restart from any step."
      },
      {
        title: "Production reliability",
        text: "Traced a recurring nightly failure to premature Lambda retries and Fargate scale-in killing busy workers. The job now completes on the first attempt in 93 seconds."
      },
      {
        title: "LLM search agent",
        text: "Built with pydantic-ai and GPT-4.1-mini for the AI research pipeline. Reads snippets first and fetches only the most relevant pages, keeping low-value content out of context."
      },
      {
        title: "Analyst Admin Portal",
        text: "Built from scratch in Next.js and React to configure risk frameworks, review AI answers, approve AI-detected material events, and onboard assets."
      }
    ]
  },
  {
    company: "iSuite ERP",
    role: "Software Engineering Intern",
    period: "May 2024 – Aug 2024",
    location: "Remote",
    tagline: "Enterprise ERP platform serving pharmaceutical clients.",
    stats: [
      { value: "500+", label: "Pharma client staff supported" },
      { value: "On-site", label: "Forward-deployed at client facilities" }
    ],
    stack: ["C#", "ADO.NET", "SQL", "Angular"],
    type: "work",
    link: "https://isuitesolutions.com",
    image: "/iSuiteLSS.png",
    color: "from-purple-500/20 to-pink-500/20",
    highlights: [
      {
        title: "Report & print engines",
        text: "Built configurable report and print engines with C#, ADO.NET, SQL stored procedures, and Angular, supporting reporting workflows for 500+ staff at pharmaceutical clients."
      },
      {
        title: "Forward-deployed",
        text: "On-site at client facilities, configured dashboards and widgets to match how staff actually used the software, working directly with end users."
      }
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section id="experience" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Art */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">Career History</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-light text-white tracking-tight">
            Professional <br />
            <span className="text-white/20">Experience</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {experiences.map((exp, index) => (
            <motion.a
              key={index}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative block"
            >
              <div className="relative border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-3xl overflow-hidden">
                {/* Background Gradient for Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative grid lg:grid-cols-12">
                  {/* Left: Identity & Impact */}
                  <div className="lg:col-span-5 p-6 md:p-10 flex flex-col relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-emerald-400">
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-2">
                      {exp.company}
                    </h3>
                    <div className="text-lg text-white/70 font-light flex items-center gap-2 mb-4">
                      {exp.role}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
                    </div>
                    {exp.tagline && (
                      <p className="text-sm text-white/55 leading-relaxed font-light max-w-md">
                        {exp.tagline}
                      </p>
                    )}

                    <div className="mt-auto pt-8 space-y-6">
                      {exp.stats && (
                        <div className="grid grid-cols-2 gap-3">
                          {exp.stats.map((stat) => (
                            <div key={stat.label} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                              <div className="text-2xl md:text-3xl font-light text-white tracking-tight">
                                {stat.value}
                              </div>
                              <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1 leading-snug">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-[10px] font-mono text-white/60 bg-white/5 border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Visual */}
                  <div className="lg:col-span-7 relative bg-black/20 overflow-hidden lg:border-l border-t lg:border-t-0 border-white/10">
                    {/* Decorative Grid on Image Side */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

                    {/* The Image Container - Floating */}
                    <div className="relative h-full flex items-center justify-center px-6 py-10 md:p-10">
                      <motion.div
                        style={{ y: index % 2 === 0 ? y : 0 }}
                        className="relative w-full shadow-2xl rounded-xl overflow-hidden border border-white/10 group-hover:border-emerald-500/30 transition-colors duration-500 bg-black"
                      >
                        {/* Browser Header */}
                        <div className="h-8 bg-zinc-900 border-b border-white/10 flex items-center px-4 gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        </div>

                        <img
                          src={exp.image}
                          alt={exp.company}
                          className="block w-full aspect-[16/10] object-cover object-top opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        />

                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="relative z-10 border-t border-white/10 grid md:grid-cols-2 gap-x-12 gap-y-8 p-6 md:p-10">
                  {exp.highlights.map((h, i) => (
                    <div
                      key={h.title}
                      className={i === 0 && exp.highlights.length % 2 === 1 ? "md:col-span-2" : ""}
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="font-mono text-[10px] text-emerald-500/70">0{i + 1}</span>
                        <h4 className="text-sm font-medium text-white tracking-wide">{h.title}</h4>
                      </div>
                      <p className="text-sm text-white/65 leading-relaxed font-light pl-6 max-w-3xl">
                        {h.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative Number behind */}
              <div className="absolute -top-20 -left-10 text-[200px] font-bold text-white/[0.02] pointer-events-none select-none font-mono">
                0{index + 1}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
