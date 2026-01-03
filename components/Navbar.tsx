"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FileDown, Mail } from "lucide-react";

type NavItem = { id: string; label: string };

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  const items: NavItem[] = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "work", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "capabilities", label: "Skills" },
      { id: "activities", label: "Community" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, threshold: [0.15, 0.25, 0.4, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div
          className={[
            "relative flex items-center justify-between gap-4 px-6 py-4 rounded-sm transition-all duration-500",
            scrolled ? "bg-black/40 backdrop-blur-md border border-white/5" : "bg-transparent",
          ].join(" ")}
        >
          {/* Logo */}
          <Link href="#home" className="group flex items-center gap-3">
            <div className="text-sm tracking-widest text-white/90 uppercase font-medium">
              Revanth
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {items.map((it) => {
              const isActive = active === it.id;
              return (
                <a
                  key={it.id}
                  href={`#${it.id}`}
                  className={[
                    "relative text-xs tracking-widest uppercase transition-colors duration-300",
                    isActive ? "text-white" : "text-white/50 hover:text-white/80",
                  ].join(" ")}
                >
                  {it.label}
                  {!reduceMotion && isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="/RevanthBurramukku.pdf"
              className="hidden sm:inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors uppercase tracking-wider"
            >
              <FileDown className="h-4 w-4" />
              <span className="hidden lg:inline">Resume</span>
            </a>
            <a
              href="mailto:revanthreddy4666@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-medium tracking-wider uppercase rounded-sm hover:bg-white/90 transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
