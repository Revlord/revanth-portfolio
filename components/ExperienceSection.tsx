"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Calendar, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  type: "work" | "education" | "research";
  link?: string;
  image?: string;
  color: string;
}

const experiences: Experience[] = [
  {
    company: "Lockchain",
    role: "Software Engineering Intern",
    period: "Jan 2025 – Present",
    location: "Remote",
    type: "work",
    link: "https://lockchain.ai",
    image: "/lockchainLSS.png",
    color: "from-emerald-500/20 to-blue-500/20",
    description: [
      "Built Next.js admin portal from scratch replacing $30k/year third-party tooling; now used by entire analyst and engineering team for all blockchain data operations across 5,000+ managed entities.",
      "Engineered custom solutions for entity onboarding, crypto-specific data handling, and complex API integrations with role-based auth and pool separation for multi-tenant access control."
    ]
  },
  {
    company: "iSuite ERP",
    role: "Software Engineering Intern",
    period: "May 2024 – Aug 2024",
    location: "Remote",
    type: "work",
    link: "https://isuitesolutions.com",
    image: "/iSuiteLSS.png",
    color: "from-purple-500/20 to-pink-500/20",
    description: [
      "Built C#/ADO.NET data pipeline APIs with optimized SQL stored procedures, reducing query response times by 40% for pharmaceutical platform serving 300+ users.",
      "Developed Angular/TypeScript modules for project management and procurement; contributed to proprietary engine accelerating internal module development."
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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

        <div className="flex flex-col gap-16 md:gap-32">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="group relative"
            >
              {/* Large Card Container */}
              <div className="relative grid lg:grid-cols-12 gap-8 lg:gap-0 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-3xl overflow-hidden">
                
                {/* Background Gradient for Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                
                {/* Left: Content (Spans 5 cols) */}
                <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-emerald-400">
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-medium text-white mb-2">
                    {exp.company}
                  </h3>
                  <div className="text-lg text-white/60 mb-8 font-light flex items-center gap-2">
                    {exp.role}
                    {exp.link && (
                      <a href={exp.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <div className="space-y-4">
                    {exp.description.map((desc, i) => (
                      <p key={i} className="text-white/70 leading-relaxed font-light border-l border-white/10 pl-4">
                        {desc}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Right: Visual (Spans 7 cols) */}
                <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[500px] bg-black/20 overflow-hidden">
                  {/* Decorative Grid on Image Side */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  {/* The Image Container - Tilted and Floating */}
                  <div className="absolute inset-0 flex items-center justify-center p-8 lg:p-12 perspective-1000">
                    <motion.div 
                      style={{ y: index % 2 === 0 ? y : 0 }} // Parallax effect on image
                      className="relative w-full h-full shadow-2xl rounded-xl overflow-hidden border border-white/10 group-hover:border-emerald-500/30 transition-colors duration-500 bg-black"
                    >
                      {/* Browser Header */}
                      <div className="h-8 bg-zinc-900 border-b border-white/10 flex items-center px-4 gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                      </div>
                      
                      {/* Actual Image */}
                      <img 
                        src={exp.image} 
                        alt={exp.company} 
                        className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                      />
                      
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </motion.div>
                  </div>
                </div>

              </div>
              
              {/* Decorative Number behind */}
              <div className="absolute -top-20 -left-10 text-[200px] font-bold text-white/[0.02] pointer-events-none select-none font-mono">
                0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
