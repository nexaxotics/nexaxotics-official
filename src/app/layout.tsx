import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Added Outfit
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import IntroAnimation from "@/components/IntroAnimation";

import CustomCursor from "@/components/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" }); // Added Outfit

export const metadata: Metadata = {
    title: "NEXAXOTICS | Customer Acquisition Systems for Small Businesses",
    description: "NEXAXOTICS builds automated customer acquisition systems — not ads. Get more leads, more booked calls, and more revenue on autopilot. Book a free audit today.",
    keywords: ["customer acquisition", "lead generation system", "automated marketing", "small business growth", "digital agency", "sales funnel", "CRM automation", "UGC content", "AI influencer", "landing page design", "full stack development"],
    authors: [{ name: "NEXAXOTICS" }],
    creator: "NEXAXOTICS",
    publisher: "NEXAXOTICS",
    metadataBase: new URL("https://nexaxotics.in"),
    alternates: {
        canonical: "https://nexaxotics.in",
    },
    category: 'technology',
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://nexaxotics.in",
        siteName: "NEXAXOTICS",
        title: "NEXAXOTICS | Customer Acquisition Systems",
        description: "We don't run ads — we build automated systems that bring you customers 24/7. Book your free growth audit.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "NEXAXOTICS – Customer Acquisition Systems",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NEXAXOTICS | Customer Acquisition Systems",
        description: "Automated customer acquisition systems for small businesses. Book a free audit.",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
    verification: {
        google: "iwrpU58IqDAt6-PldKPyy-c9ZAQHfxWNDz37aRTQs3U",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@graph": [
                                {
                                    "@type": "Organization",
                                    "@id": "https://nexaxotics.in/#organization",
                                    "name": "NEXAXOTICS",
                                    "url": "https://nexaxotics.in",
                                    "logo": "https://nexaxotics.in/logo.png",
                                    "description": "Customer acquisition systems for small businesses. Automated lead generation, CRM, and sales funnels.",
                                    "sameAs": [],
                                    "contactPoint": {
                                        "@type": "ContactPoint",
                                        "contactType": "sales",
                                        "availableLanguage": ["English", "Hindi"]
                                    }
                                },
                                {
                                    "@type": "WebSite",
                                    "@id": "https://nexaxotics.in/#website",
                                    "url": "https://nexaxotics.in",
                                    "name": "NEXAXOTICS",
                                    "publisher": { "@id": "https://nexaxotics.in/#organization" },
                                    "inLanguage": ["en-US", "hi-IN"],
                                    "potentialAction": {
                                        "@type": "SearchAction",
                                        "target": "https://nexaxotics.in/?s={search_term_string}",
                                        "query-input": "required name=search_term_string"
                                    }
                                },
                                {
                                    "@type": "Service",
                                    "serviceType": "Customer Acquisition System",
                                    "provider": { "@id": "https://nexaxotics.in/#organization" },
                                    "name": "4-System Customer Acquisition Engine",
                                    "description": "End-to-end automated system: lead capture, nurture sequences, CRM pipeline, and conversion optimization for small businesses.",
                                    "offers": {
                                        "@type": "Offer",
                                        "priceCurrency": "USD",
                                        "availability": "https://schema.org/InStock"
                                    }
                                },
                                {
                                    "@type": "FAQPage",
                                    "mainEntity": [
                                        {
                                            "@type": "Question",
                                            "name": "What exactly is a customer acquisition system?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "It's a fully automated pipeline — ads, landing pages, lead capture, nurture sequences, CRM, and booking — all connected and running 24/7. You stop chasing leads; the system does it for you."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Do I need to run ads for this to work?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Not necessarily. Some of our systems work entirely on organic reach, WhatsApp re-activation, and referral loops. If you do run ads, we make sure every rupee is tracked to an actual booking or sale."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "How long until I see results?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Most clients see their first automated leads within 2–4 weeks of going live. Full system ROI — where the revenue eclipses the monthly fee — typically happens within 60–90 days."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "Is this only for certain industries?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "No. We work with clinics, gyms, real estate agents, coaches, e-commerce brands, and local service businesses. If you have a sales process, we can automate it."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "What makes NEXAXOTICS different from a regular agency?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "A regular agency gives you deliverables (posts, ads, reports). We give you infrastructure. The system we build keeps working after we're done — you own the pipeline, the CRM, the automations."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "What happens on the free audit call?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "We analyze your current lead flow, identify the biggest gaps, and map out a concrete system design specific to your business. You leave with an actionable blueprint — no pitch, no pressure."
                                            }
                                        }
                                    ]
                                }
                            ]
                        })
                    }}
                />
            </head>
            <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
                {/* Skip to main content link for accessibility */}
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                
                <LanguageProvider>
                    <CustomCursor />
                    <IntroAnimation>
                        <Header />
                        <main id="main-content" className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </IntroAnimation>
                </LanguageProvider>
            </body>
        </html>
    );
}
