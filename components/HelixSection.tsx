"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Terminal, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = gsap.context(() => {
      // Content Reveal
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });

      // Helix Canvas Animation
      const c = canvas.getContext("2d");
      if (!c) return;

      let width = canvas.width = canvas.offsetWidth;
      let height = canvas.height = canvas.offsetHeight;
      
      let time = 0;
      const mouse = { x: 0, y: 0, isActive: false };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.isActive = true;
      };

      const handleMouseLeave = () => {
        mouse.isActive = false;
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      
      const animate = () => {
        // Interactive Speed Control
        let speed = 0.02;
        if (mouse.isActive) {
            const normalizedX = (mouse.x / width) - 0.5;
            speed = 0.02 + (normalizedX * 0.1); // Speed varies from -0.03 to 0.07 based on mouse X
        }
        time += speed;

        c.clearRect(0, 0, width, height);
        
        const pointsPerStrand = 20;
        const radius = 80;
        const separation = 25;
        const centerY = height / 2;
        const centerX = width / 2;
        
        for(let i = 0; i < pointsPerStrand; i++) {
          const yOffset = (i - pointsPerStrand / 2) * separation;
          const y = centerY + yOffset;
          const angle = (i * 0.4) + time;
          
          // Strand 1
          const x1 = centerX + Math.cos(angle) * radius;
          const z1 = Math.sin(angle) * radius; // Depth
          const scale1 = (z1 + 400) / 400; // Perspective scale

          // Strand 2
          const x2 = centerX + Math.cos(angle + Math.PI) * radius;
          const z2 = Math.sin(angle + Math.PI) * radius;
          const scale2 = (z2 + 400) / 400;

          // Interaction: Distance to mouse
          let dist1 = 1000, dist2 = 1000;
          if (mouse.isActive) {
             dist1 = Math.hypot(mouse.x - x1, mouse.y - y);
             dist2 = Math.hypot(mouse.x - x2, mouse.y - y);
          }

          // Hover Effect (0 to 1)
          const hover1 = Math.max(0, 1 - dist1 / 150); 
          const hover2 = Math.max(0, 1 - dist2 / 150);

          // Draw Connection (Base Pairs)
          c.beginPath();
          c.moveTo(x1, y);
          c.lineTo(x2, y);
          // Line glows when hovered
          const lineAlpha = 0.15 + (Math.max(hover1, hover2) * 0.5);
          c.strokeStyle = `rgba(16, 185, 129, ${lineAlpha})`;
          c.lineWidth = 1 + (Math.max(hover1, hover2) * 2);
          c.stroke();

          // Draw Node 1
          const size1 = (4 * scale1) + (hover1 * 6); // Grows on hover
          c.beginPath();
          c.arc(x1, y, size1, 0, Math.PI * 2);
          c.fillStyle = `rgba(16, 185, 129, ${Math.max(0.2, (z1 + 100) / 200) + hover1})`;
          c.shadowBlur = (10 * scale1) + (hover1 * 20); // Glows on hover
          c.shadowColor = "rgba(16, 185, 129, 0.8)";
          c.fill();
          c.shadowBlur = 0;

          // Draw Node 2
          const size2 = (4 * scale2) + (hover2 * 6);
          c.beginPath();
          c.arc(x2, y, size2, 0, Math.PI * 2);
          c.fillStyle = `rgba(52, 211, 153, ${Math.max(0.2, (z2 + 100) / 200) + hover2})`;
          c.shadowBlur = (10 * scale2) + (hover2 * 20);
          c.shadowColor = "rgba(52, 211, 153, 0.8)";
          c.fill();
          c.shadowBlur = 0;
        }
        
        requestAnimationFrame(animate);
      };
      animate();

      // Handle Resize
      const handleResize = () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      };

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="mb-20" data-reveal>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">Technical Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            System <span className="text-white/40">Capabilities</span>
          </h2>
          <p className="text-white/60 max-w-2xl font-light">
            Comprehensive command of modern engineering stacks, from low-level systems to distributed cloud infrastructure.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left Column: Interactive Visual */}
          <div className="lg:col-span-5 relative min-h-[500px] border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden group rounded-lg" data-reveal>
             <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
             
             {/* HUD Overlay */}
             <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">System Online</span>
                </div>
                <div className="text-[10px] font-mono text-white/30">HELIX_V2.0</div>
             </div>

             <div className="absolute bottom-8 left-8 right-8">
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
                   <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Architecture</div>
                      <div className="text-sm text-white font-mono">Scalable</div>
                   </div>
                   <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Performance</div>
                      <div className="text-sm text-white font-mono">Optimized</div>
                   </div>
                   <div>
                      <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Security</div>
                      <div className="text-sm text-emerald-400 font-mono">Hardened</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Column: Skills Grid */}
          <div className="lg:col-span-7 grid gap-6">
            
            {/* Languages */}
            <div className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] transition-all duration-500" data-reveal>
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Code2 className="w-12 h-12 text-emerald-500 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-emerald-500" />
                  <h3 className="text-lg font-mono text-emerald-400 tracking-widest uppercase">Languages</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {["Python", "C++", "TypeScript", "Java", "C#", "SQL", "Swift", "Bash"].map((tech, i) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 text-sm text-white/70 border border-white/10 bg-black/40 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 cursor-default"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-emerald-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-emerald-500 transition-colors" />
            </div>

            {/* Frameworks */}
            <div className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] transition-all duration-500" data-reveal>
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Terminal className="w-12 h-12 text-emerald-500 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-emerald-500" />
                  <h3 className="text-lg font-mono text-emerald-400 tracking-widest uppercase">Frameworks</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {["Next.js", "React", "React Native", "FastAPI", ".NET Core", "Angular", "Node.js", "SpringBoot"].map((tech, i) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 text-sm text-white/70 border border-white/10 bg-black/40 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 cursor-default"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-emerald-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-emerald-500 transition-colors" />
            </div>

            {/* Infrastructure */}
            <div className="group relative p-8 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] transition-all duration-500" data-reveal>
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Cloud className="w-12 h-12 text-emerald-500 rotate-12" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-emerald-500" />
                  <h3 className="text-lg font-mono text-emerald-400 tracking-widest uppercase">Infrastructure</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {["AWS", "Docker", "PostgreSQL", "MongoDB", "Supabase", "Git", "Unity"].map((tech, i) => (
                    <span 
                      key={tech} 
                      className="px-4 py-2 text-sm text-white/70 border border-white/10 bg-black/40 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300 cursor-default"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative Corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-emerald-500 transition-colors" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-emerald-500 transition-colors" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
