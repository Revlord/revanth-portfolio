"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowUpRight, 
  Github, 
  ChevronLeft, 
  ChevronRight, 
  Terminal, 
  Cpu, 
  Globe,
  Code2
} from "lucide-react";

interface Project {
  title: string;
  role: string;
  stack: string[];
  description: string;
  links: {
    site?: string;
    github?: string;
  };
  images: string[];
}

const projects: Project[] = [
  {
    title: "Privacy Pilot",
    role: "AI ATL 2024 Winner",
    stack: ["React", "FastAPI", "MongoDB", "Terraform", "AWS EC2", "Gemini/Claude API"],
    description: "Built Chrome extension analyzing Terms & Conditions in real-time; one-click scanning extracts legal links, scores privacy risk across 10 GDPR/CCPA parameters. Engineered FastAPI backend with MongoDB caching reducing latency by 99% for repeat analyses.",
    links: { github: "#" },
    images: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop", // Tech/Cybersecurity vibe
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop"
    ]
  },
  {
    title: "ByteFight",
    role: "Founding Engineer",
    stack: ["Next.js", "TypeScript", "Java", "SpringBoot", "Supabase"],
    description: "Fullstack competition portal serving 200+ GT students for deploying algorithmic bots in real-time strategic matches. Owned frontend, REST APIs, auth, and leaderboard persistence. Engineered game engine integrations and bot simulation workflows.",
    links: { site: "#" },
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop", // Gaming/Esports vibe
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop"
    ]
  },
  {
    title: "Rex Bets",
    role: "Full Stack Engineer",
    stack: ["React Native", "FastAPI", "PostgreSQL", "WebSockets", "Docker"],
    description: "Real-time multiplayer betting platform with low-latency WebSocket synchronization across mobile clients. Designed dynamic wagering algorithm balancing risk/reward mechanics. Built scalable FastAPI backend integrated with Supabase/PostgreSQL.",
    links: { github: "#" },
    images: [
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2232&auto=format&fit=crop", // Crypto/Finance vibe
      "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2232&auto=format&fit=crop"
    ]
  },
  {
    title: "WebSpatial SDK",
    role: "Contributor (ByteDance/PICO)",
    stack: ["React", "visionOS", "XR"],
    description: "Contributed to open-source SDK through bug reproductions and feature validation; collaborated directly with core maintainers to debug cross-platform edge cases for production-ready visionOS deployment.",
    links: { github: "#" },
    images: [
      "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=2070&auto=format&fit=crop", // VR/AR vibe
      "https://images.unsplash.com/photo-1592478411213-61535fdd861d?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    title: "Contextual Computing Research",
    role: "Undergraduate Researcher",
    stack: ["Unity3D", "C#", "Meta Quest Pro", "XR Interaction Toolkit"],
    description: "Developed Unity3D/C# eye-tracking pipeline for Meta Quest Pro capturing gaze data at 72-90Hz with sub-2° accuracy. Deployed in accessibility study with 200+ participants including RIT deaf/hard-of-hearing students. Enabled spatial captioning research for deaf/hard-of-hearing users.",
    links: { site: "https://ccl.gatech.edu" },
    images: [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden"
    >
      {/* Decorative Corner Markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-500/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-500/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-500/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-500/50" />

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Left: Visual Feed (Carousel) */}
        <div className="relative h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-white/10 bg-black/40 group-hover:border-emerald-500/30 transition-colors duration-500">
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={project.images[currentImage]}
                alt={project.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              />
            </AnimatePresence>
            
            {/* Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
          </div>

          {/* Carousel Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <button 
              onClick={prevImage}
              className="p-2 bg-black/50 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button 
              onClick={nextImage}
              className="p-2 bg-black/50 border border-white/10 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 text-[10px] font-mono text-emerald-500/80 bg-black/60 px-2 py-1 border border-emerald-500/20">
            IMG_0{currentImage + 1} / 0{project.images.length}
          </div>
        </div>

        {/* Right: Data & Specs */}
        <div className="p-8 flex flex-col h-full relative">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-medium text-white tracking-tight">{project.title}</h3>
              <div className="h-[1px] flex-grow bg-white/10 group-hover:bg-emerald-500/30 transition-colors" />
            </div>
            <div className="flex items-center gap-2 text-emerald-400/80 text-xs font-mono uppercase tracking-wider">
              <Terminal className="w-3 h-3" />
              {project.role}
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-8 font-light">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-auto">
            <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu className="w-3 h-3" />
              System Architecture
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.stack.map((tech) => (
                <span 
                  key={tech} 
                  className="px-2 py-1 text-[10px] text-white/70 bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-white/10">
              {project.links.site && (
                <a 
                  href={project.links.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-emerald-400 transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  Live Deployment
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
              {project.links.github && (
                <a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  Source Code
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section id="work" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-emerald-500" />
            <span className="text-emerald-500 font-mono text-sm tracking-widest uppercase">Project Index</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light text-white mb-6">
            Operational <span className="text-white/40">Archives</span>
          </h2>
          <p className="text-white/60 max-w-2xl font-light">
            Selected works demonstrating full-stack engineering capabilities, 
            system architecture design, and product development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
