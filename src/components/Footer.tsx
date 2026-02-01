"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative z-10 bg-background border-t border-border py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Brand & Copyright */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center">
                            <Image
                                src="/Untitled design (1) (1).png"
                                alt="NEXAXOTICS"
                                width={200}
                                height={60}
                                className="h-12 w-auto object-contain invert hue-rotate-180"
                            />
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">
                            © {new Date().getFullYear()} - Infrastructure for Service Excellence.
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                            <Link href="/how-it-works" className="hover:text-primary transition-colors">{t('header.howItWorks')}</Link>
                            <Link href="/systems" className="hover:text-primary transition-colors">{t('header.systems')}</Link>
                            <Link href="/industries" className="hover:text-primary transition-colors">{t('header.industries')}</Link>
                            <Link href="/pricing" className="hover:text-primary transition-colors">{t('header.pricing')}</Link>
                        </div>
                    </div>

                    {/* Social & Contact */}
                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex items-center gap-6">
                            <a href="mailto:nexaxotics.agency@gmail.com" className="text-xs font-bold hover:text-primary transition-colors">
                                nexaxotics.agency@gmail.com
                            </a>
                            <div className="flex items-center gap-4">
                                <a href="https://www.linkedin.com/company/nexaxotics/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border border-neutral-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                </a>
                                <a href="https://instagram.com/nexaxotics.agency" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass border border-neutral-200 flex items-center justify-center hover:border-primary/50 transition-all group">
                                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </a>
                            </div>
                        </div>
                        <p className="text-[9px] text-muted-foreground max-w-xs text-center md:text-right leading-relaxed">
                            NEXAXOTICS is not affiliated with Make.com. We are a specialized infrastructure agency building custom solutions for service providers.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
