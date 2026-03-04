"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqKeys = [
    { q: "faq.q1", a: "faq.a1" },
    { q: "faq.q2", a: "faq.a2" },
    { q: "faq.q3", a: "faq.a3" },
    { q: "faq.q4", a: "faq.a4" },
    { q: "faq.q5", a: "faq.a5" },
    { q: "faq.q6", a: "faq.a6" },
] as const;

export default function FAQAccordion() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-3">
            {faqKeys.map(({ q, a }, i) => {
                const isOpen = openIndex === i;
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        style={{
                            background: isOpen
                                ? "rgba(0,212,255,0.05)"
                                : "rgba(255,255,255,0.03)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: isOpen
                                ? "1px solid rgba(0,212,255,0.18)"
                                : "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "1.25rem",
                            transition: "background 0.3s, border-color 0.3s",
                        }}
                    >
                        <button
                            className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            aria-expanded={isOpen}
                        >
                            <span className="text-base md:text-lg font-semibold text-foreground leading-snug">
                                {t(q)}
                            </span>
                            <span
                                className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300"
                                style={{
                                    background: isOpen
                                        ? "rgba(0,212,255,0.15)"
                                        : "rgba(255,255,255,0.06)",
                                    border: isOpen
                                        ? "1px solid rgba(0,212,255,0.30)"
                                        : "1px solid rgba(255,255,255,0.10)",
                                }}
                            >
                                {isOpen
                                    ? <Minus className="w-4 h-4 text-primary" />
                                    : <Plus className="w-4 h-4 text-muted-foreground" />
                                }
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key="answer"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.28, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-7 pb-6 text-muted-foreground text-base leading-relaxed">
                                        {t(a)}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
}
