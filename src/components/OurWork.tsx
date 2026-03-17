"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, X, CheckCircle2, Clock, Zap } from "lucide-react";

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
        title: "Honda SP Shine",
        category: "UGC AI",
        description: "AI-powered UGC promotional video for Honda SP Shine — authentic influencer-style content at scale.",
        thumbnail: "",
        liveUrl: "#",
        videoEmbed: "https://player.cloudinary.com/embed/?cloud_name=da8khfzem&public_id=HONDA_SP_SHINE_skbcuw",
        technologies: ["AI Video Generation", "Cloudinary", "UGC Strategy"],
        timeline: "2 days",
        features: [
            "AI-generated influencer-style content",
            "Authentic promotional narrative",
            "High-quality video production",
            "Brand-aligned messaging"
        ],
        results: "Created engaging UGC content that mimics authentic influencer promotion"
    },
    {
        title: "ZaikaCafé",
        category: "Landing Page",
        description: "Full-featured restaurant landing page for an authentic Indian café — menu, table booking, testimonials & catering.",
        thumbnail: "https://image.thum.io/get/width/800/crop/600/https://nexaxotics.github.io/ZaikaCafe/",
        liveUrl: "https://nexaxotics.github.io/ZaikaCafe/",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        timeline: "3 weeks",
        features: [
            "Interactive menu showcase",
            "Online table booking system",
            "Customer testimonials section",
            "Catering services page",
            "Mobile-optimized design"
        ],
        results: "Increased online reservations by 40% in first month"
    },
    {
        title: "Oral Wellness",
        category: "Business Site",
        description: "Full dental clinic website with services, before/after gallery, doctor profiles, appointment booking & FAQ — for a Mumbai-based clinic.",
        thumbnail: "https://image.thum.io/get/width/800/crop/600/https://oral-wellness.vercel.app/",
        liveUrl: "https://oral-wellness.vercel.app/",
        technologies: ["Next.js", "React", "Tailwind CSS", "Vercel"],
        timeline: "4 weeks",
        features: [
            "Comprehensive service pages",
            "Before/after treatment gallery",
            "Doctor profiles & credentials",
            "Online appointment booking",
            "FAQ section with search",
            "SEO optimization"
        ],
        results: "3x increase in appointment bookings, ranking #1 for local dental searches"
    },
    {
        title: "Coming Soon",
        category: "Lead Funnel",
        description: "Automated funnel with form, CRM integration & follow-up.",
        thumbnail: "",
        liveUrl: "#",
        technologies: ["Coming Soon"],
        timeline: "TBD",
        features: ["More details coming soon"],
        results: "Project in development"
    },
];

interface Project {
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    liveUrl: string;
    videoEmbed?: string;
    technologies: string[];
    timeline: string;
    features: string[];
    results: string;
}

const CATEGORY_COLORS: Record<string, string> = {
    "UGC AI": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    "Landing Page": "text-primary border-primary/30 bg-primary/10",
    "Business Site": "text-secondary border-secondary/30 bg-secondary/10",
    "Lead Funnel": "text-green-400 border-green-400/30 bg-green-400/10",
};

export default function OurWork() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                            {/* Thumbnail or Video */}
                            <div className="relative w-full aspect-video bg-white/[0.04] overflow-hidden">
                                {project.videoEmbed ? (
                                    <iframe
                                        src={project.videoEmbed}
                                        className="w-full h-full border-0"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : project.thumbnail ? (
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
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/70">
                                            Thumbnail Coming Soon
                                        </span>
                                    </div>
                                )}

                                {/* Hover overlay with "View Live" (only for non-video projects) */}
                                {!project.videoEmbed && (
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
                                )}
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

                                <div className="flex items-center gap-3 flex-wrap">
                                    {project.liveUrl !== "#" && (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline group/link"
                                        >
                                            Visit Project
                                            <ExternalLink className="w-3.5 h-3.5" />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setSelectedProject(project)}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline group/link"
                                    >
                                        View Details
                                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-lg glass-morphe rounded-2xl overflow-hidden my-4"
                        >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full glass border border-white/20 flex items-center justify-center hover:border-primary/50 transition-all group"
                        >
                            <X className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </button>

                        {/* Modal Content */}
                        <div className="p-5 max-h-[85vh] overflow-y-auto">
                            {/* Header */}
                            <div className="mb-4">
                                <span className={`inline-block text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border mb-2 ${CATEGORY_COLORS[selectedProject.category] ?? "text-primary border-primary/30 bg-primary/10"}`}>
                                    {selectedProject.category}
                                </span>
                                <h2 className="text-xl font-black text-foreground mb-2 leading-tight">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {selectedProject.description}
                                </p>
                            </div>

                            {/* Video or Thumbnail */}
                            {selectedProject.videoEmbed && (
                                <div className="relative w-full aspect-video bg-white/[0.04] rounded-lg overflow-hidden mb-4">
                                    <iframe
                                        src={selectedProject.videoEmbed}
                                        className="w-full h-full border-0"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="glass border border-white/[0.08] rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Clock className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Timeline</span>
                                    </div>
                                    <p className="text-sm text-foreground font-bold">{selectedProject.timeline}</p>
                                </div>
                                <div className="glass border border-white/[0.08] rounded-lg p-3">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <Zap className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Status</span>
                                    </div>
                                    <p className="text-sm text-foreground font-bold">Delivered</p>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Technologies</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 rounded-full">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-2">Features</h3>
                                <ul className="space-y-1.5">
                                    {selectedProject.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                                            <span className="text-xs text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Results */}
                            <div className="glass border border-white/[0.08] rounded-lg p-3 mb-4">
                                <h3 className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1.5">Results</h3>
                                <p className="text-xs text-foreground">{selectedProject.results}</p>
                            </div>

                            {/* Action Button */}
                            {selectedProject.liveUrl !== "#" && (
                                <a
                                    href={selectedProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-full font-bold text-xs shadow-brand-glow hover:scale-105 transition-transform"
                                >
                                    View Live Project
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
