
"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const { t, language, toggleLanguage } = useLanguage();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const isCompact = isScrolled && !isHovered && !isMobileMenuOpen;

    return (
        <motion.header
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="glass-morphe rounded-full mx-auto overflow-hidden relative"
                initial={false}
                animate={{
                    width: isCompact ? "auto" : "100%",
                    padding: isCompact ? "0.5rem 1rem" : "0.75rem 2rem",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="flex items-center justify-between gap-4">
                    {/* Logo - Made Visible */}
                    <Link href="#" className="flex items-center gap-2 group shrink-0 pointer-events-auto">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                            <img src="/logo.png" alt="NEXA" className="w-6 h-6 object-contain invert hue-rotate-180" />
                        </div>
                        <span className="font-heading font-black text-xl tracking-tight hidden sm:block">NEXA<span className="text-primary">XOTICS</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <motion.nav
                        className="hidden lg:flex items-center gap-1 overflow-hidden"
                        animate={{
                            width: isCompact ? 0 : "auto",
                            opacity: isCompact ? 0 : 1
                        }}
                    >
                        <Link href="#how-it-works" className="px-4 py-1.5 text-sm font-heading font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">{t('header.howItWorks')}</Link>
                        <Link href="#systems" className="px-4 py-1.5 text-sm font-heading font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">{t('header.systems')}</Link>
                        <Link href="#industries" className="px-4 py-1.5 text-sm font-heading font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">{t('header.industries')}</Link>
                        <Link href="#pricing" className="px-4 py-1.5 text-sm font-heading font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">{t('header.pricing')}</Link>
                    </motion.nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-3 shrink-0">
                        <motion.button
                            onClick={toggleLanguage}
                            className="text-xs font-bold w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-100 transition-colors text-foreground"
                            animate={{ scale: isCompact ? 0.8 : 1 }}
                        >
                            {language.toUpperCase()}
                        </motion.button>

                        <motion.div
                            className="flex items-center gap-3"
                            animate={{ scale: isCompact ? 0.9 : 1 }}
                        >
                            <Link
                                href="https://nexaxotics-crm.vercel.app/admin/login"
                                target="_blank"
                                className="px-5 py-2 text-sm font-bold text-neutral-600 hover:text-primary transition-colors hidden sm:block"
                            >
                                Client Login
                            </Link>
                            <Link href="#contact" className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-brand-glow hover:scale-105 transition-all whitespace-nowrap">
                                {isCompact ? "Get Plan" : t('header.contact')}
                            </Link>
                        </motion.div>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <motion.div
                    initial={false}
                    animate={{ height: isMobileMenuOpen ? "auto" : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
                    className="lg:hidden overflow-hidden"
                >
                    <nav className="flex flex-col gap-2 pt-4 pb-2 px-2">
                        <Link href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-neutral-100 rounded-xl transition-colors">{t('header.howItWorks')}</Link>
                        <Link href="#systems" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-neutral-100 rounded-xl transition-colors">{t('header.systems')}</Link>
                        <Link href="#industries" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-neutral-100 rounded-xl transition-colors">{t('header.industries')}</Link>
                        <Link href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 text-sm font-medium hover:bg-neutral-100 rounded-xl transition-colors">{t('header.pricing')}</Link>
                        <Link href="https://nexaxotics-crm.vercel.app/admin/login" target="_blank" className="px-4 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors">Client Login</Link>
                    </nav>
                </motion.div>
            </motion.div>
        </motion.header>
    );
}
