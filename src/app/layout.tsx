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
    title: "NEXAXOTICS | Customer Acquisition Systems",
    description: "Next-gen customer acquisition systems for small businesses. We don't run ads, we build systems.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-background text-foreground`}>
                <LanguageProvider>
                    <CustomCursor />
                    <IntroAnimation>
                        <Header />
                        <main className="flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </IntroAnimation>
                </LanguageProvider>
            </body>
        </html>
    );
}
