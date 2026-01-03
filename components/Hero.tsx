"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import gsap from "gsap";
import GeometricBackground from "./GeometricBackground";
import { ArrowUpRight, FileDown, Plus, ScanLine } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        ".hero-in",
        { y: 20, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );

      // Decorative line animation
      gsap.fromTo(
        ".scan-line",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5, ease: "expo.out", delay: 0.5 }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div
        id="home"
        ref={rootRef}
        className="relative min-h-screen overflow-hidden text-white flex items-center pt-12"
    >
      <GeometricBackground />

      <div className="relative mx-auto max-w-7xl px-6 w-full z-10">
        
        {/* Top HUD Bar */}
        <div className="flex justify-between items-center mb-8 opacity-60 text-[10px] tracking-[0.2em] uppercase font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            <span>System: Active</span>
          </div>
          <div className="hidden md:block">
            Coordinates: 33.7490° N, 84.3880° W
          </div>
        </div>

        {/* Main Grid Layout - Open, No Background Box */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          
          {/* LEFT CONTENT - Spans 7 cols */}
          <div className="lg:col-span-7 relative">
            {/* Decorative Top Line */}
            <div className="scan-line w-24 h-[1px] bg-white/30 mb-8 origin-left" />

            <div className="hero-in">
              <div className="inline-flex items-center gap-3 mb-6 px-3 py-1 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-sm w-fit">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/70 uppercase font-medium">
                  [ 4th Year CS Undergrad @ Georgia Tech ]
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl font-medium tracking-tighter leading-[0.95] mb-8">
                Revanth <br />
                <span className="text-white/30">Burramukku</span>
              </h1>

              <p className="text-base md:text-lg text-white/60 max-w-lg leading-relaxed font-light mb-10 border-l border-white/10 pl-6">
                CS Undergrad at <span className="text-amber-400">Georgia Tech</span>.
                <br />
                Engineering high-performance systems at the intersection of data intelligence and user experience. 
                Currently building AI-driven risk infrastructure at Lockchain.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-gray-200 transition-all duration-300"
                >
                  View Projects
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="/RevanthBurramukku.pdf"
                  className="inline-flex items-center gap-2 px-8 py-4 text-xs font-bold tracking-widest uppercase text-white border border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  <FileDown className="h-3 w-3" />
                  Resume
                </a>
              </div>
            </div>

            {/* Stats / Tech Stack Row */}
            <div className="hero-in mt-16 flex flex-wrap gap-12 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-light text-white">Data Nerd</div>
                <div className="text-[10px] tracking-widest text-white/40 uppercase mt-1">Math Addict</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">ML+DL+NLP</div>
                <div className="text-[10px] tracking-widest text-white/40 uppercase mt-1">+Full Stack Dev</div>
              </div>
              <div>
                <div className="text-2xl font-light text-white">TS • Python • C++</div>
                <div className="text-[10px] tracking-widest text-white/40 uppercase mt-1">Core Stack</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - Spans 5 cols - Mostly open for art, but with floating data points */}
          <div className="lg:col-span-5 hidden lg:flex flex-col justify-end h-full min-h-[500px] relative pointer-events-none">
             {/* Floating Tech Specs */}
             <div className="absolute top-0 right-0 text-right hero-in">
                <div className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">
                  Visualization
                </div>
                <div className="text-xs text-white/60 font-mono">
                  WebGL / Three.js
                </div>
             </div>

             <div className="absolute bottom-0 right-0 w-64 p-6 border border-white/10 bg-black/40 backdrop-blur-md hero-in">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] tracking-widest text-white/40 uppercase">Network</span>
                  <ScanLine className="w-3 h-3 text-emerald-500 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-[1px] w-full bg-white/10 overflow-hidden">
                    <div className="h-full w-1/2 bg-emerald-500/50 animate-progress" />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/30 font-mono">
                    <span>UL: 450MB/s</span>
                    <span>DL: 890MB/s</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
