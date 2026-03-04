"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

// ─── ADD YOUR PROJECTS HERE ─────────────────────────────────────────────────
// Replace the placeholder entries below with your actual projects.
// Each project needs:
//   title       – Project / client name
//   category    – Tag shown on the card (e.g. "Landing Page", "Business Site")
//   description – One-line summary of what was built
//   thumbnail   – Path inside /public (e.g. "/work/project1.jpg") OR external URL
//   liveUrl     – Live URL of the deployed project
// ─────────────────────────────────────────────────────────────────────────────
const projects: Project[] = [
    {
        title: "ZaikaCafé",
        category: "Landing Page",
        description: "Full-featured restaurant landing page for an authentic Indian café — menu, table booking, testimonials & catering.",
        thumbnail: "https://image.thum.io/get/width/800/crop/600/https://nexaxotics.github.io/ZaikaCafe/",
        liveUrl: "https://nexaxotics.github.io/ZaikaCafe/",
    },
    {
        title: "Oral Wellness",
        category: "Business Site",
        description: "Full dental clinic website with services, before/after gallery, doctor profiles, appointment booking & FAQ — for a Mumbai-based clinic.",
        thumbnail: "https://image.thum.io/get/width/800/crop/600/https://oral-wellness.vercel.app/",
        liveUrl: "https://oral-wellness.vercel.app/",
    },
    {
        title: "Coming Soon",
        category: "Lead Funnel",
        description: "Automated funnel with form, CRM integration & follow-up.",
        thumbnail: "",          // ← replace with /work/thumbnail3.jpg
        liveUrl: "#",           // ← replace with live URL
    },
];

interface Project {
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    liveUrl: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    "Landing Page": "text-primary border-primary/30 bg-primary/10",
    "Business Site": "text-secondary border-secondary/30 bg-secondary/10",
    "Lead Funnel": "text-green-400 border-green-400/30 bg-green-400/10",
};

export default function OurWork() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <section
            id="our-work"
            className="py-24 px-6 relative z-10 border-t border-white/[0.06]"
        >
            <div className="container mx-auto max-w-7xl">

                {/* ── Section Header ────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <span className="trust-badge mb-4 inline-block">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-5 leading-tight tracking-tight">
                        Our Work &amp;{" "}
                        <span className="text-gradient">Delivered Projects</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Real landing pages, business sites, and growth systems we've built
                        for clients — shipped, live, and converting.
                    </p>
                </motion.div>

                {/* ── Project Grid ──────────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            className="group relative glass border border-white/[0.08] rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-brand-glow"
                        >
                            {/* Thumbnail */}
                            <div className="relative w-full aspect-video bg-white/[0.04] overflow-hidden">
                                {project.thumbnail ? (
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    /* Placeholder when no thumbnail is set yet */
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50">
                                            Thumbnail Coming Soon
                                        </span>
                                    </div>
                                )}

                                {/* Hover overlay with "View Live" */}
                                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${hovered === i ? "opacity-100" : "opacity-0"}`}>
                                    {project.liveUrl !== "#" && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-sm shadow-brand-glow hover:scale-105 transition-transform"
                                        >
                                            View Live
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                {/* Category badge */}
                                <span className={`inline-block text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border mb-3 ${CATEGORY_COLORS[project.category] ?? "text-primary border-primary/30 bg-primary/10"}`}>
                                    {project.category}
                                </span>

                                <h3 className="text-lg font-black text-foreground mb-2 leading-snug">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                    {project.description}
                                </p>

                                {project.liveUrl !== "#" ? (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group/link"
                                    >
                                        Visit Project
                                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground/40 uppercase tracking-wider">
                                        Project details coming soon
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
