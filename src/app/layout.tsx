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
                                            "name": "What is a customer acquisition system?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "A customer acquisition system is an automated pipeline that attracts, captures, nurtures, and converts prospects into paying customers — without manual effort on your part."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "How is NEXAXOTICS different from a regular marketing agency?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "We don't run ads or manage campaigns. We architect systems — automated funnels, CRM pipelines, and conversion infrastructure — that keep generating leads on autopilot."
                                            }
                                        },
                                        {
                                            "@type": "Question",
                                            "name": "How long does it take to see results?",
                                            "acceptedAnswer": {
                                                "@type": "Answer",
                                                "text": "Most clients see their first automated lead flows within 2–4 weeks of onboarding. Full system ROI typically materializes within 60–90 days."
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
