"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Interactive3DCard from "@/components/Interactive3DCard";
import PricingCard from "@/components/PricingCard";
import FAQAccordion from "@/components/FAQAccordion";
import OurWork from "@/components/OurWork";
import StyledInput from "@/components/StyledInput";
import Toast from "../components/Toast";
import { supabase } from '@/lib/supabase';
import { validateWhatsApp, validateBusinessName, validateCity, formatWhatsAppNumber } from '@/utils/validation';
import {
    Zap,
    ShieldCheck,
    Users,
    ArrowRight,
    CheckCircle2,
    Star,
    Quote,
    Rocket,
    Globe,
    MessageSquareDiff,
    Heart,
    Scissors,
    Dumbbell,
    Home as HomeIcon,
    Utensils,
    GraduationCap,
    MoveRight,
    Bot,
    Target,
    PhoneCall,
    Repeat,
    Share2,
    Search,
    Send,
    Loader2,
    X,
    Code
} from "lucide-react";

export default function Home() {
    const { t, language } = useLanguage();

    // Systems Data
    const systems = [
        {
            title: t('systems.leadRecovery.title'),
            icon: <ShieldCheck className="w-10 h-10" />,
            does: t('systems.leadRecovery.does'),
            gets: t('systems.leadRecovery.gets'),
            benefits: [
                t('systems.leadRecovery.benefit1'),
                t('systems.leadRecovery.benefit2'),
                t('systems.leadRecovery.benefit3')
            ]
        },
        {
            title: t('systems.backend.title'),
            icon: <Globe className="w-10 h-10" />,
            does: t('systems.backend.does'),
            gets: t('systems.backend.gets'),
            benefits: [
                t('systems.backend.benefit1'),
                t('systems.backend.benefit2'),
                t('systems.backend.benefit3')
            ]
        },
        {
            title: t('systems.local.title'),
            icon: <Rocket className="w-10 h-10" />,
            does: t('systems.local.does'),
            gets: t('systems.local.gets'),
            benefits: [
                t('systems.local.benefit1'),
                t('systems.local.benefit2'),
                t('systems.local.benefit3')
            ]
        },
        {
            title: t('systems.content.title'),
            icon: <MessageSquareDiff className="w-10 h-10" />,
            does: t('systems.content.does'),
            gets: t('systems.content.gets'),
            benefits: [
                t('systems.content.benefit1'),
                t('systems.content.benefit2'),
                t('systems.content.benefit3')
            ]
        },
        {
            title: t('systems.ugc.title'),
            icon: <Users className="w-10 h-10" />,
            does: t('systems.ugc.does'),
            gets: t('systems.ugc.gets'),
            benefits: [
                t('systems.ugc.benefit1'),
                t('systems.ugc.benefit2'),
                t('systems.ugc.benefit3')
            ]
        },
        {
            title: t('systems.landing.title'),
            icon: <Search className="w-10 h-10" />,
            does: t('systems.landing.does'),
            gets: t('systems.landing.gets'),
            benefits: [
                t('systems.landing.benefit1'),
                t('systems.landing.benefit2'),
                t('systems.landing.benefit3')
            ]
        },
        {
            title: t('systems.fullstack.title'),
            icon: <Code className="w-10 h-10" />,
            does: t('systems.fullstack.does'),
            gets: t('systems.fullstack.gets'),
            benefits: [
                t('systems.fullstack.benefit1'),
                t('systems.fullstack.benefit2'),
                t('systems.fullstack.benefit3')
            ]
        }
    ];

    // Industries Data
    const industries = [
        {
            icon: <Heart className="w-8 h-8" />,
            name: t('industries.clinics'),
            benefit: t('industries.clinicsBenefit'),
            details: t('industries.clinics.details'),
            impact: t('industries.clinics.impact'),
            problem: t('industries.clinics.problem'),
            solution: t('industries.clinics.solution'),
            replaces: t('industries.clinics.replaces'),
            setup: t('industries.clinics.setup'),
            roi: t('industries.clinics.roi'),
            features: [t('industries.clinics.feat1'), t('industries.clinics.feat2'), t('industries.clinics.feat3')]
        },
        {
            icon: <Scissors className="w-8 h-8" />,
            name: t('industries.salons'),
            benefit: t('industries.salonsBenefit'),
            details: t('industries.salons.details'),
            impact: t('industries.salons.impact'),
            problem: t('industries.salons.problem'),
            solution: t('industries.salons.solution'),
            replaces: t('industries.salons.replaces'),
            setup: t('industries.salons.setup'),
            roi: t('industries.salons.roi'),
            features: [t('industries.salons.feat1'), t('industries.salons.feat2'), t('industries.salons.feat3')]
        },
        {
            icon: <Dumbbell className="w-8 h-8" />,
            name: t('industries.gyms'),
            benefit: t('industries.gymsBenefit'),
            details: t('industries.gyms.details'),
            impact: t('industries.gyms.impact'),
            problem: t('industries.gyms.problem'),
            solution: t('industries.gyms.solution'),
            replaces: t('industries.gyms.replaces'),
            setup: t('industries.gyms.setup'),
            roi: t('industries.gyms.roi'),
            features: [t('industries.gyms.feat1'), t('industries.gyms.feat2'), t('industries.gyms.feat3')]
        },
        {
            icon: <HomeIcon className="w-8 h-8" />,
            name: t('industries.realtors'),
            benefit: t('industries.realtorsBenefit'),
            details: t('industries.realtors.details'),
            impact: t('industries.realtors.impact'),
            problem: t('industries.realtors.problem'),
            solution: t('industries.realtors.solution'),
            replaces: t('industries.realtors.replaces'),
            setup: t('industries.realtors.setup'),
            roi: t('industries.realtors.roi'),
            features: [t('industries.realtors.feat1'), t('industries.realtors.feat2'), t('industries.realtors.feat3')]
        },
        {
            icon: <Utensils className="w-8 h-8" />,
            name: t('industries.restaurants'),
            benefit: t('industries.restaurantsBenefit'),
            details: t('industries.restaurants.details'),
            impact: t('industries.restaurants.impact'),
            problem: t('industries.restaurants.problem'),
            solution: t('industries.restaurants.solution'),
            replaces: t('industries.restaurants.replaces'),
            setup: t('industries.restaurants.setup'),
            roi: t('industries.restaurants.roi'),
            features: [t('industries.restaurants.feat1'), t('industries.restaurants.feat2'), t('industries.restaurants.feat3')]
        },
        {
            icon: <Zap className="w-8 h-8" />,
            name: t('industries.automotive'),
            benefit: t('industries.automotiveBenefit'),
            details: t('industries.automotive.details'),
            impact: t('industries.automotive.impact'),
            problem: t('industries.automotive.problem'),
            solution: t('industries.automotive.solution'),
            replaces: t('industries.automotive.replaces'),
            setup: t('industries.automotive.setup'),
            roi: t('industries.automotive.roi'),
            features: [t('industries.automotive.feat1'), t('industries.automotive.feat2'), t('industries.automotive.feat3')]
        },
        {
            icon: <Globe className="w-8 h-8" />,
            name: t('industries.homeServices'),
            benefit: t('industries.homeServicesBenefit'),
            details: t('industries.homeServices.details'),
            impact: t('industries.homeServices.impact'),
            problem: t('industries.homeServices.problem'),
            solution: t('industries.homeServices.solution'),
            replaces: t('industries.homeServices.replaces'),
            setup: t('industries.homeServices.setup'),
            roi: t('industries.homeServices.roi'),
            features: [t('industries.homeServices.feat1'), t('industries.homeServices.feat2'), t('industries.homeServices.feat3')]
        },
        {
            icon: <Target className="w-8 h-8" />,
            name: t('industries.coaching'),
            benefit: t('industries.coachingBenefit'),
            details: t('industries.coaching.details'),
            impact: t('industries.coaching.impact'),
            problem: t('industries.coaching.problem'),
            solution: t('industries.coaching.solution'),
            replaces: t('industries.coaching.replaces'),
            setup: t('industries.coaching.setup'),
            roi: t('industries.coaching.roi'),
            features: [t('industries.coaching.feat1'), t('industries.coaching.feat2'), t('industries.coaching.feat3')]
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            name: t('industries.education'),
            benefit: t('industries.educationBenefit'),
            details: t('industries.education.details'),
            impact: t('industries.education.impact'),
            problem: t('industries.education.problem'),
            solution: t('industries.education.solution'),
            replaces: t('industries.education.replaces'),
            setup: t('industries.education.setup'),
            roi: t('industries.education.roi'),
            features: [t('industries.education.feat1'), t('industries.education.feat2'), t('industries.education.feat3')]
        },
        {
            icon: <ShieldCheck className="w-8 h-8" />,
            name: t('industries.legal'),
            benefit: t('industries.legalBenefit'),
            details: t('industries.legal.details'),
            impact: t('industries.legal.impact'),
            problem: t('industries.legal.problem'),
            solution: t('industries.legal.solution'),
            replaces: t('industries.legal.replaces'),
            setup: t('industries.legal.setup'),
            roi: t('industries.legal.roi'),
            features: [t('industries.legal.feat1'), t('industries.legal.feat2'), t('industries.legal.feat3')]
        },
    ];

    const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);

    // How It Works Steps
    const steps = [
        { icon: <Search className="w-6 h-6" />, label: t('howItWorks.step1.label'), desc: t('howItWorks.step1.desc') },
        { icon: <Target className="w-6 h-6" />, label: t('howItWorks.step2.label'), desc: t('howItWorks.step2.desc') },
        { icon: <PhoneCall className="w-6 h-6" />, label: t('howItWorks.step3.label'), desc: t('howItWorks.step3.desc') },
        { icon: <Bot className="w-6 h-6" />, label: t('howItWorks.step4.label'), desc: t('howItWorks.step4.desc') },
        { icon: <Repeat className="w-6 h-6" />, label: t('howItWorks.step5.label'), desc: t('howItWorks.step5.desc') },
        { icon: <CheckCircle2 className="w-6 h-6" />, label: t('howItWorks.step6.label'), desc: t('howItWorks.step6.desc') },
        { icon: <Share2 className="w-6 h-6" />, label: t('howItWorks.step7.label'), desc: t('howItWorks.step7.desc') },
    ];

    // Contact Logic
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "warning"; isVisible: boolean }>({
        message: "",
        type: "success",
        isVisible: false
    });
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const showToast = useCallback((message: string, type: "success" | "error" | "warning") => {
        setToast({ message, type, isVisible: true });
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        
        const business = formData.get("business") as string;
        const city = formData.get("city") as string;
        const whatsapp = formData.get("whatsapp") as string;
        const budget = formData.get("budget") as string;

        // Validate all fields
        const businessValidation = validateBusinessName(business);
        const cityValidation = validateCity(city);
        const whatsappValidation = validateWhatsApp(whatsapp);

        const errors: Record<string, string> = {};
        if (!businessValidation.isValid) errors.business = businessValidation.error!;
        if (!cityValidation.isValid) errors.city = cityValidation.error!;
        if (!whatsappValidation.isValid) errors.whatsapp = whatsappValidation.error!;

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setLoading(false);
            showToast("Please fix the errors in the form", "error");
            return;
        }

        // Format WhatsApp number
        const formattedWhatsApp = formatWhatsAppNumber(whatsapp);

        // Data object mirroring the Supabase schema
        const leadData = {
            name: "Prospect", // Default name as form has no name field yet
            business: business.trim(),
            city: city.trim(),
            whatsapp: formattedWhatsApp,
            budget,
            source: 'Main Website',
            status: 'new'
        };

        try {
            if (!supabase) {
                // Fallback to API route if Supabase client isn't initialized (e.g. missing env vars)
                const response = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        business: leadData.business,
                        city: leadData.city,
                        whatsapp: leadData.whatsapp,
                        budget: leadData.budget
                    }),
                });

                const result = await response.json();
                if (result.success) {
                    setSubmitted(true);
                    showToast("Thank you! We'll contact you soon.", "success");
                    // Reset form
                    (e.target as HTMLFormElement).reset();
                } else {
                    throw new Error(result.error || 'Submission failed');
                }
                return;
            }

            // Approach 1: Direct Supabase Insert
            const { error } = await supabase
                .from('leads')
                .insert([leadData]);

            if (error) {
                console.error('Supabase Error:', error);
                throw error;
            }

            setSubmitted(true);
            showToast("Thank you! We'll contact you within 24 hours.", "success");
            // Reset form
            (e.target as HTMLFormElement).reset();
        } catch (err) {
            console.error('Submission Error:', err);
            const errorMessage = t('contact.form.error') || "Something went wrong. Please try again.";
            setError(errorMessage);
            showToast(errorMessage, "error");
        } finally {
            setLoading(false);
        }
    };

    const reviews = [
        {
            name: "Vishwakarma Honda",
            role: "Honda Two-Wheeler Showroom",
            content: "Footfall was inconsistent before NEXAXOTICS. They built us a WhatsApp follow-up system and local ads pipeline — our test ride bookings went up significantly within the first month.",
            avatar: "/avatars/user1.png"
        },
        {
            name: "Bajaj Showroom",
            role: "Bajaj Authorised Dealer",
            content: "We had hundreds of old enquiries sitting idle. Their lead recovery system re-activated those contacts and converted a good chunk into actual walk-ins. Genuinely surprised by the ROI.",
            avatar: "/avatars/user2.png"
        },
        {
            name: "Hero Showroom",
            role: "Hero MotoCorp Dealership",
            content: "The automated enquiry capture and CRM pipeline they set up saves our sales team hours every week. Follow-ups happen automatically — we just close the deals.",
            avatar: "/avatars/user3.png"
        }
    ];

    return (
        <div className="relative min-h-screen bg-background overflow-hidden">
            {/* Toast Notification */}
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={hideToast}
            />

            {/* ── HERO BACKGROUND ─────────────────────────────── */}
            {/* Base gradient wash */}
            <div
                className="absolute inset-0 z-0 pointer-events-none bg-background"
                aria-hidden="true"
            />
            {/* Fine grid overlay */}
            <div className="absolute inset-0 z-0 hero-grid pointer-events-none opacity-60" aria-hidden="true" />
            {/* Animated orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="orb-primary absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(0,191,255,0.18) 0%, transparent 70%)" }} />
                <div className="orb-secondary absolute top-20 right-[-200px] w-[600px] h-[600px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(127,90,240,0.14) 0%, transparent 70%)" }} />
                <div className="orb-accent absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(0,215,255,0.10) 0%, transparent 70%)" }} />
            </div>
            {/* Fade bottom to body bg */}
            <div className="absolute bottom-0 left-0 w-full h-48 z-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }}
                aria-hidden="true"
            />

            {/* Hero Section */}
            <section className="relative pt-52 pb-40 px-6 z-20">
                <div className="container mx-auto text-center max-w-5xl">
                    <motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-black/ mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('header.badge')}</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-heading font-bold mb-8 leading-[1] tracking-tight"
                        >
                            {t('home.hero.title1')} <br />
                            <span className="text-gradient">{t('home.hero.title2')}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            {t('home.hero.subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap justify-center gap-4"
                        >
                            <Link
                                href="#contact"
                                className="group relative inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold text-base shadow-brand-glow hover:shadow-brand-glow-lg hover:scale-105 transition-all outline-none overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-black/ translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                                <span className="relative">{t('home.hero.cta1')}</span>
                                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="px-10 py-4 glass text-foreground rounded-full font-bold text-base hover:bg-black/ transition-all"
                            >
                                {t('home.hero.cta2')}
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* REALITY CHECK SECTION (PROBLEM) */}
            <section className="py-24 px-6 relative z-10 border-y border-white/[0.06]">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-black mb-6">
                            {t('home.problem.title1')} <span className="text-primary">{t('home.problem.title2')}</span>
                        </h2>
                        <p className="text-xl font-medium italic text-muted-foreground">
                            {t('home.problem.quote')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Model */}
                        <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/[0.08] relative overflow-hidden group hover:border-red-500/20 transition-colors">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck className="w-24 h-24 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground/55">{t('home.problem.agencyTitle')}</h3>
                            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                                {t('home.problem.agencyDesc')}
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">High Risk</span>
                                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">Manual</span>
                            </div>
                        </div>

                        {/* New Standard */}
                        <div className="p-8 rounded-3xl bg-primary/10 border-2 border-primary/30 shadow-brand-glow relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Rocket className="w-24 h-24 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">{t('home.problem.businessTitle')}</h3>
                            <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                                {t('home.problem.businessDesc')}
                            </p>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">{t('home.hero.stable')}</span>
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Automated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SYSTEMS SECTION */}
            <section id="systems" className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="max-w-xl"
                        >
                            <span className="trust-badge mb-4 inline-block">{t('systems.title1')}</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-black mb-6">{t('systems.title2')} <span className="text-primary">{t('systems.subtitle')}</span></h2>
                            <p className="text-muted-foreground text-lg">{t('systems.architectureDesc')}</p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {systems.map((sys, i) => (
                            <div key={i} className="h-full">
                                <Interactive3DCard
                                    height="100%"
                                    className=""
                                >
                                    <div className="flex flex-col h-full">
                                        {/* Icon Header */}
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary"
                                                style={{
                                                    background: 'rgba(0,212,255,0.08)',
                                                    backdropFilter: 'blur(8px)',
                                                    border: '1px solid rgba(0,212,255,0.18)',
                                                }}>
                                                {sys.icon}
                                            </div>
                                            <div className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                                                style={{
                                                    background: 'rgba(255,255,255,0.06)',
                                                    border: '1px solid rgba(255,255,255,0.10)',
                                                }}>
                                                Module 0{i + 1}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 text-foreground">{sys.title}</h3>
                                        <p className="text-muted-foreground text-base leading-relaxed mb-8">{sys.does}</p>

                                        {/* Benefits List */}
                                        <div className="mt-auto pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-3">{t('systems.whatYouGet')}</span>
                                            <p className="text-sm font-medium text-foreground/80 mb-4">{sys.gets}</p>
                                            <div className="grid grid-cols-1 gap-2">
                                                {sys.benefits.map((b, j) => (
                                                    <div key={j} className="flex items-center gap-3 text-sm text-muted-foreground rounded-xl px-3 py-2"
                                                        style={{
                                                            background: 'rgba(255,255,255,0.04)',
                                                            border: '1px solid rgba(255,255,255,0.07)',
                                                            backdropFilter: 'blur(8px)',
                                                        }}>
                                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                                        {b}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Interactive3DCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INDUSTRIES SECTION */}
            <section id="industries" className="py-24 px-6 relative z-10 border-y border-white/[0.06]">
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="max-w-2xl mb-16 text-center mx-auto">
                        <span className="trust-badge mb-4 inline-block">{t('industries.title1')}</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight text-foreground">
                            {t('industries.title2')}
                        </h2>
                        <p className="text-lg text-muted-foreground">{t('industries.subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {industries.map((ind, i) => (
                            <motion.div
                                key={i}
                                className="h-full group cursor-pointer"
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedIndustry(ind)}
                            >
                                <div className="p-7 rounded-[1.75rem] bg-white/[0.04] border border-white/[0.08] hover:border-primary/30 hover:shadow-brand-glow transition-all duration-300 h-full flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-black/ border border-black/ flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                        {ind.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3">{ind.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-6">{ind.benefit}</p>
                                    <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">{t('home.services.learnMore')}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* INDUSTRY MODAL ("NEW WINDOW") */}
                    <AnimatePresence>
                        {selectedIndustry && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setSelectedIndustry(null)}
                                    className="absolute inset-0 bg-black/40 backdrop-blur-md"
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    className="relative w-full max-w-2xl bg-[#0c1022] rounded-[3rem] shadow-2xl overflow-hidden border border-white/[0.12]"
                                >
                                    <button
                                        onClick={() => setSelectedIndustry(null)}
                                        aria-label="Close"
                                        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/ flex items-center justify-center hover:bg-black/ transition-colors z-20"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                                        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                    {selectedIndustry.icon}
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-1">Blueprint for {selectedIndustry.name}</span>
                                                    <h3 className="text-3xl md:text-4xl font-black">{selectedIndustry.name}</h3>
                                                </div>
                                            </div>
                                            <div className="md:text-right w-full md:w-auto">
                                                <span className="text-[10px] font-bold text-foreground/45 uppercase tracking-tighter block mb-1">Target Outcome</span>
                                                <div className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl inline-block">
                                                    <span className="text-primary font-black text-lg">{selectedIndustry.impact}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                                            {selectedIndustry.details}
                                        </p>

                                        {/* Snapshot Row */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-10">
                                            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-center">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">{t('industries.modal.replaces')}</span>
                                                <span className="text-sm font-black text-foreground">{selectedIndustry.replaces}</span>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-center">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">{t('industries.modal.setup')}</span>
                                                <span className="text-sm font-black text-foreground">{selectedIndustry.setup}</span>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center col-span-2 md:col-span-1">
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">{t('industries.modal.results')}</span>
                                                <span className="text-sm font-black text-primary">{selectedIndustry.roi}</span>
                                            </div>
                                        </div>

                                        {/* Problem vs Solution */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                            <div className="p-6 rounded-2xl bg-red-950/30 border border-red-900/30 italic relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
                                                <div className="flex items-center gap-2 mb-3 text-red-400">
                                                    <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                                                    <span className="text-xs font-black uppercase tracking-widest">Pain Point</span>
                                                </div>
                                                <p className="text-sm text-foreground/70 leading-relaxed font-medium">"{selectedIndustry.problem}"</p>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-green-950/20 border border-green-900/25 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
                                                <div className="flex items-center gap-2 mb-3 text-green-400">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    <span className="text-xs font-black uppercase tracking-widest">The Move</span>
                                                </div>
                                                <p className="text-sm text-foreground/80 leading-relaxed font-bold">{selectedIndustry.solution}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-8 mb-10 pt-8 border-t border-white/[0.08]">
                                            <div className="flex flex-col gap-4">
                                                <span className="text-xs font-bold uppercase tracking-widest text-foreground/50">System Highlights</span>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    {selectedIndustry.features.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.06] border border-black/ shadow-sm">
                                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                            </div>
                                                            <span className="text-[11px] font-bold text-foreground/80 leading-tight">{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-6 rounded-[2rem] bg-neutral-900 text-white relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                                    <Star className="w-12 h-12" />
                                                </div>
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block mb-4">{t('industries.modal.whyTitle')}</span>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        <span className="text-sm font-bold opacity-90">{t('industries.modal.why1')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        <span className="text-sm font-bold opacity-90">{t('industries.modal.why2')}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                        <span className="text-sm font-bold opacity-90">{t('industries.modal.why3')}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-6 pt-6 border-t border-black/ flex items-center justify-between">
                                                    <span className="text-xs font-bold text-foreground/45 italic">Target ROI: High</span>
                                                    <span className="text-xs font-black text-primary uppercase tracking-widest">{t('industries.modal.investment')}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Link
                                            href="#contact"
                                            onClick={() => setSelectedIndustry(null)}
                                            className="w-full py-6 bg-primary text-white rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 shadow-brand-glow hover:scale-[1.02] transition-all"
                                        >
                                            {language === 'en' ? `Build My ${selectedIndustry.name} System` : `अपना ${selectedIndustry.name} सिस्टम बनाएं`}
                                            <ArrowRight className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="bg-[#0a0d1a] border border-white/[0.08] text-white px-10 py-12 rounded-[2.5rem] shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-4xl font-black mb-6 relative z-10">{t('industries.notListed.title')}</h2>
                        <p className="text-lg text-neutral-400 mb-10 relative z-10">{t('industries.notListed.desc')}</p>
                        <Link href="#contact" className="relative z-10 inline-flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-neutral-200 transition-all hover:scale-105">
                            {t('industries.notListed.button')}
                            <MoveRight className="w-6 h-6" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="max-w-3xl mb-16 text-center mx-auto">
                        <span className="trust-badge mb-4 inline-block">{t('howItWorks.title1')}</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight text-foreground">
                            {t('howItWorks.title2')}
                        </h2>
                    </div>

                    <div className="relative max-w-7xl mx-auto mb-8">
                        {/* Connecting Line (Desktop) */}
                        <div className="absolute top-12 left-0 w-full h-px bg-white/[0.08] hidden md:block overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent w-[50%] animate-pulse" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 relative z-10">
                            {steps.map((step, i) => (
                                <div key={i} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-full bg-white/[0.06] border-2 border-black/ flex items-center justify-center text-primary group-hover:border-primary group-hover:-translate-y-2 transition-all duration-300 mb-6 relative z-20 shadow-lg group-hover:shadow-brand-glow">
                                        {step.icon}
                                    </div>
                                    <h3 className="font-bold text-sm uppercase tracking-widest mb-3 bg-white/[0.08] px-3 py-1 rounded-full text-foreground">{step.label}</h3>
                                    <p className="text-xs font-medium text-muted-foreground leading-relaxed px-1 opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Visual Trust Section (Dashboard) */}
            <section className="py-24 px-6 relative overflow-hidden z-10 border-y border-white/[0.06]">
                <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 leading-tight">
                            <span className="text-gradient">Revenue Pipeline</span> Visibility.
                        </h2>
                        <ul className="space-y-6">
                            {[
                                "Real-time automated lead qualification",
                                "Zero-latency synchronization with your CRM",
                                "Automated WhatsApp & Email nurture flows",
                                "Custom analytics dashboard for ROI tracking"
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                    <span className="text-lg text-muted-foreground/90">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -inset-4 bg-primary/15 rounded-[3rem] blur-3xl opacity-60" />
                        {/* CSS-only analytics dashboard mockup */}
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.12] shadow-2xl bg-[#0a0d1a] p-6">
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">Analytics</p>
                                    <p className="text-base font-black text-foreground">Revenue Dashboard</p>
                                </div>
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                                </div>
                            </div>
                            {/* KPI cards */}
                            <div className="grid grid-cols-3 gap-3 mb-5">
                                {[
                                    { label: "Leads", value: "1,240", change: "+18%", up: true },
                                    { label: "Revenue", value: "₹3.2L", change: "+31%", up: true },
                                    { label: "Churn", value: "2.1%", change: "-0.4%", up: false },
                                ].map((k) => (
                                    <div key={k.label} className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-3">
                                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest mb-1">{k.label}</p>
                                        <p className="text-lg font-black text-foreground leading-none">{k.value}</p>
                                        <p className={`text-[10px] font-bold mt-1 ${k.up ? 'text-green-400' : 'text-red-400'}`}>{k.change}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Bar chart strip */}
                            <div className="mb-5">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Weekly Performance</p>
                                <div className="flex items-end gap-1.5 h-16">
                                    {[55, 40, 70, 60, 90, 75, 85].map((h, i) => (
                                        <div key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%`, background: i === 4 ? 'hsl(190 100% 50%)' : 'rgba(255,255,255,0.12)' }} />
                                    ))}
                                </div>
                                <div className="flex gap-1.5 mt-1">
                                    {['M','T','W','T','F','S','S'].map((d,i) => (
                                        <p key={i} className="flex-1 text-center text-[8px] text-muted-foreground">{d}</p>
                                    ))}
                                </div>
                            </div>
                            {/* Funnel rows */}
                            <div className="space-y-2">
                                {[
                                    { label: "Lead Capture", pct: 94, color: "bg-primary" },
                                    { label: "Qualification", pct: 72, color: "bg-secondary" },
                                    { label: "Conversion", pct: 41, color: "bg-green-500" },
                                ].map((r) => (
                                    <div key={r.label}>
                                        <div className="flex justify-between mb-0.5">
                                            <span className="text-[9px] text-muted-foreground">{r.label}</span>
                                            <span className="text-[9px] font-black text-foreground">{r.pct}%</span>
                                        </div>
                                        <div className="h-1 bg-black/ rounded-full overflow-hidden">
                                            <div className={`h-full ${r.color} rounded-full`} style={{ width: `${r.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* OUR WORK SECTION */}
            <OurWork />

            {/* Testimonials */}
            <section className="py-24 px-6 border-y border-white/[0.06] relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12">
                        <span className="trust-badge mb-4 inline-block">Social Proof</span>
                        <h2 className="text-4xl md:text-5xl font-black">Success Stories.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass rounded-2xl p-8 flex flex-col border border-white/[0.08]"
                            >
                                <Quote className="w-8 h-8 text-primary/30 mb-5" />
                                <p className="text-base italic text-muted-foreground mb-7 flex-grow leading-relaxed">"{review.content}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-black/ flex items-center justify-center shrink-0">
                                        <Users className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold truncate">{review.name}</div>
                                        <div className="text-xs text-muted-foreground truncate">{review.role}</div>
                                    </div>
                                    <div className="ml-auto flex gap-0.5 shrink-0">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section id="faq" className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-4xl px-6">
                    <div className="text-center mb-16">
                        <span className="trust-badge mb-4 inline-block">{t('faq.badge')}</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black leading-tight text-foreground">
                            {t('faq.title')}<span className="text-primary">{t('faq.titleAccent')}</span>
                        </h2>
                    </div>

                    <FAQAccordion />
                </div>
            </section>

            {/* PRICING SECTION */}
            <section id="pricing" className="py-24 px-6 relative z-10">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <span className="trust-badge mb-4 inline-block">{t('pricing.title1')}</span>
                        <h2 className="text-4xl md:text-5xl font-heading font-black mb-8 leading-tight text-foreground">
                            {t('pricing.title2')} <span className="text-gradient">{t('pricing.title3')}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
                        {/* LAUNCHPAD */}
                        <PricingCard
                            title={t('pricing.launchpad.title')}
                            subtitle={t('pricing.launchpad.subtitle')}
                            price={t('pricing.launchpad.price')}
                            priceUnit={t('pricing.launchpad.priceUnit')}
                            features={[
                                t('pricing.launchpad.feature1'),
                                t('pricing.launchpad.feature2'),
                                t('pricing.launchpad.feature3'),
                            ]}
                            buttonText={t('pricing.launchpad.button')}
                            link="#contact"
                        />

                        {/* VELOCITY */}
                        <PricingCard
                            title={t('pricing.velocity.title')}
                            subtitle={t('pricing.velocity.subtitle')}
                            price={t('pricing.velocity.price')}
                            priceUnit={t('pricing.velocity.priceUnit')}
                            features={[
                                t('pricing.velocity.feature1'),
                                t('pricing.velocity.feature2'),
                                t('pricing.velocity.feature3'),
                            ]}
                            buttonText={t('pricing.velocity.button')}
                            link="#contact"
                        />

                        {/* EMPIRE */}
                        <PricingCard
                            title={t('pricing.empire.title')}
                            subtitle={t('pricing.empire.subtitle')}
                            price={t('pricing.empire.price')}
                            priceUnit={t('pricing.empire.priceUnit')}
                            features={[
                                t('pricing.empire.feature1'),
                                t('pricing.empire.feature2'),
                                t('pricing.empire.feature3'),
                                t('pricing.empire.feature4'),
                                t('pricing.empire.feature5'),
                            ]}
                            buttonText={t('pricing.empire.button')}
                            link="#contact"
                        />
                    </div>
                </div>
            </section>

            {/* CONTACT SECTION */}
            <section id="contact" className="py-24 px-6 relative z-10 border-t border-white/[0.06]">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <span className="trust-badge mb-4 inline-block">{t('contact.title1')}</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 leading-tight tracking-tight">
                                {t('contact.title2')}
                            </h2>
                            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md">
                                {t('contact.subtitle')}
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 shrink-0 rounded-xl glass border border-black/ flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all shadow-brand-glow">1</div>
                                    <p className="text-base font-medium leading-relaxed text-foreground/80 pt-2">{t('contact.step1')}</p>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 shrink-0 rounded-xl glass border border-black/ flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all shadow-brand-glow">2</div>
                                    <p className="text-base font-medium leading-relaxed text-foreground/80 pt-2">{t('contact.step2')}</p>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="w-12 h-12 shrink-0 rounded-xl glass border border-black/ flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all shadow-brand-glow">3</div>
                                    <p className="text-base font-medium leading-relaxed text-foreground/80 pt-2">{t('contact.step3')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bento-card border-black/ shadow-brand-glow-lg overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-32 translate-x-32"></div>
                            {submitted ? (
                                <div className="glass p-12 rounded-[3rem] text-center max-w-xl animate-in zoom-in-95 duration-500">
                                    <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mx-auto mb-8">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-4xl font-black mb-4">{t('contact.success.title')}</h2>
                                    <p className="text-muted-foreground mb-8">
                                        {t('contact.success.message')}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSubmitted(false)}
                                        className="text-primary font-bold hover:underline"
                                    >
                                        {t('contact.success.another')}
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                    {error && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-xl"
                                        >
                                            {error}
                                        </motion.div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <StyledInput
                                                name="business"
                                                label={t('contact.form.business')}
                                                placeholder={t('contact.form.businessPlaceholder')}
                                                type="text"
                                                required
                                            />
                                            {fieldErrors.business && (
                                                <motion.p 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-xs text-red-400 mt-1 ml-1"
                                                >
                                                    {fieldErrors.business}
                                                </motion.p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <StyledInput
                                                name="city"
                                                label={t('contact.form.city')}
                                                placeholder={t('contact.form.cityPlaceholder')}
                                                type="text"
                                                required
                                            />
                                            {fieldErrors.city && (
                                                <motion.p 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-xs text-red-400 mt-1 ml-1"
                                                >
                                                    {fieldErrors.city}
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <StyledInput
                                            name="whatsapp"
                                            label={t('contact.form.whatsapp')}
                                            placeholder={t('contact.form.whatsappPlaceholder')}
                                            type="tel"
                                            required
                                        />
                                        {fieldErrors.whatsapp && (
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-xs text-red-400 mt-1 ml-1"
                                            >
                                                {fieldErrors.whatsapp}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('contact.form.budget')}</label>
                                        <div className="relative">
                                            <select id="budget" name="budget" className="w-full glass border border-black/ rounded-2xl px-6 py-4 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer">
                                                <option className="bg-background">{t('contact.form.budget1')}</option>
                                                <option className="bg-background">{t('contact.form.budget2')}</option>
                                                <option className="bg-background">{t('contact.form.budget3')}</option>
                                                <option className="bg-background">{t('contact.form.budget4')}</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-brand-glow hover:scale-[1.02] transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed group"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <span>{t('contact.form.submit')}</span>}
                                        {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </button>

                                    <p className="text-[10px] text-center text-muted-foreground uppercase tracking-[0.3em] font-black">{t('contact.form.secure')}</p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
