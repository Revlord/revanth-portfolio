import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Revanth Reddy Burramukku",
  description: "Revanth Reddy Burramukku: Georgia Tech CS (Dec 2026) and Backend Engineering Intern at Lockchain, building durable cloud workflows, AI pipelines, and full-stack products.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <Navbar />
        <main className="pt-[92px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
