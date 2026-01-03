"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="space-y-4">
            <div className="text-xs tracking-widest text-white/40 uppercase">
              Revanth Burramukku
            </div>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Built with Next.js, TypeScript, and WebGL. Focused on clean aesthetics and high-performance engineering.
            </p>
            <div className="text-xs text-white/30">
              &copy; {year} All rights reserved.
            </div>
          </div>

          <div className="flex gap-6">
            <a
              href="mailto:revanthreddy4666@gmail.com"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/revanth-burramukku-964a98259/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/Revanth-Burramukku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
