"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Trophy, Globe, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const items = [
    {
        role: "Technical Director",
        org: "IMMERSEGT",
        icon: Globe,
        desc: "Leading technical operations for one of the world's largest XR hackathons, sponsored by SnapAR and Niantic.",
        status: "[ Active ]",
        link: "https://immersegt.org"
    },
    {
        role: "Tech Lead",
        org: "BYTEFIGHTAI",
        icon: Trophy,
        desc: "Contributed to develop a competitive programming platform for Georgia Tech students, facilitating algorithmic bot competitions. Akin to BattleCode at MIT",
        status: "[ Alumni ]",
        link: "https://bytefight.org"
    },
    {
        role: "Operational Director",
        org: "GTXR",
        icon: Users,
        desc: "Overseeing operations as a board member while leading UI/UX design and web development initiatives for Georgia Tech's XR organization.",
        status: "[ Active ]",
        link: "https://gtxr.club"
    }
];

export default function ActivitiesSection() {
  const ref = useRef<HTMLElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".activity-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="activities" ref={ref} className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">Community Impact</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Leadership & <span className="text-white/40">Activities</span>
          </h2>
          <p className="text-white/60 max-w-2xl font-light">
            Fostering innovation and technical excellence within the developer community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <a 
              key={i} 
              href={it.link}
              target="_blank"
              rel="noopener noreferrer"
              className="activity-card group relative p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 block"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === i && it.link && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 right-0 mb-4 h-48 z-50 hidden md:block pointer-events-none"
                  >
                    <div className="w-full h-full bg-zinc-950 rounded-lg border border-white/20 overflow-hidden shadow-2xl relative">
                      <div className="absolute inset-0 flex items-center justify-center text-white/20 text-xs font-mono">
                        LOADING PREVIEW...
                      </div>
                      <iframe 
                        src={it.link}
                        className="relative w-[200%] h-[200%] origin-top-left scale-50 border-0 bg-white"
                        title={`${it.org} Preview`}
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                    </div>
                    {/* Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-zinc-950 border-b border-r border-white/20 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-500" />
              
              {/* Top Icon */}
              <div className="mb-6 inline-flex p-3 rounded-sm bg-white/5 text-emerald-400 group-hover:text-emerald-300 group-hover:scale-110 transition-all duration-300">
                <it.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-medium text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">
                {it.role}
              </h3>
              
              <div className="text-xs font-mono text-emerald-500/80 uppercase tracking-widest mb-6">
                {it.org}
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-8 group-hover:text-white/80 transition-colors">
                {it.desc}
              </p>

              <div className="absolute bottom-8 left-8 right-8 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-[10px] tracking-widest text-white/30 uppercase group-hover:text-emerald-500/50 transition-colors">
                  {it.status}
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-emerald-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
