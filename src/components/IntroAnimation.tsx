"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoSVG from "./LogoSVG";

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
    const [showIntro, setShowIntro] = useState(false);
    const [animationStage, setAnimationStage] = useState(0);
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Check if intro has been shown this session
        const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

        // Calculate target position for logo (top-left in max-w-6xl container)
        const updateTargetPos = () => {
            const containerWidth = Math.min(window.innerWidth - 48, 1152); // max-w-6xl (1152px) with 1.5rem px
            const leftEdge = (window.innerWidth - containerWidth) / 2;
            const logoCenterOffset = 40; // Approx half width of scaled logo

            // We want to move from center (0,0) to top-left
            // Target X = Left Edge + Logo Center Offset - Window Center
            const targetX = leftEdge + logoCenterOffset - (window.innerWidth / 2);

            // Target Y = Top Padding + Logo Center Vertical Offset - Window Center
            // Top padding is 1.5rem (24px). Logo center vertically approx 24px.
            const targetY = 24 + 18 - (window.innerHeight / 2);

            setTargetPos({ x: targetX, y: targetY });
        };

        updateTargetPos();
        window.addEventListener('resize', updateTargetPos);

        if (!hasSeenIntro) {
            setShowIntro(true);

            // Stage 0: Logo fade in (1s)
            const timer1 = setTimeout(() => setAnimationStage(1), 1000);

            // Stage 1: Brand name visible (wait 0.5s)
            const timer2 = setTimeout(() => setAnimationStage(2), 2000);

            // Stage 2: Logo moves to position & Name fades out (0.8s)
            const timer3 = setTimeout(() => setAnimationStage(3), 2800);

            // Stage 3: Color splash (0.5s)
            const timer4 = setTimeout(() => setAnimationStage(4), 3300);

            // Stage 4: Reveal content (0.5s)
            const timer5 = setTimeout(() => {
                setShowIntro(false);
                sessionStorage.setItem("hasSeenIntro", "true");
            }, 3800);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
                clearTimeout(timer4);
                clearTimeout(timer5);
                window.removeEventListener('resize', updateTargetPos);
            };
        } else {
            window.removeEventListener('resize', updateTargetPos);
        }
    }, []);

    return (
        <>
            <AnimatePresence mode="wait">
                {showIntro && (
                    <motion.div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Premium Background Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background opacity-60" />

                        {/* Logo Container */}
                        <motion.div
                            className="relative z-10"
                            initial={{ scale: 1 }}
                            animate={
                                animationStage >= 2
                                    ? {
                                        scale: 0.25, // Adjusted strictly to match header logo size roughly
                                        x: targetPos.x,
                                        y: targetPos.y,
                                    }
                                    : {}
                            }
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-esque spring-like ease
                        >
                            <LogoSVG
                                className="w-[600px] h-[150px] text-foreground invert hue-rotate-180"
                                animate={animationStage >= 0}
                            />


                        </motion.div>

                        {/* Color Splash Effect */}
                        <AnimatePresence>
                            {animationStage >= 3 && (
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 2.5, opacity: 1 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    >
                                        <div
                                            className="w-[1000px] h-[1000px] rounded-full blur-3xl opacity-30"
                                            style={{
                                                background:
                                                    "radial-gradient(circle, rgba(0, 215, 255, 0.4) 0%, rgba(0, 53, 148, 0.2) 40%, transparent 70%)",
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: showIntro ? 0 : 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: showIntro ? 0.2 : 0 }}
            >
                {children}
            </motion.div>
        </>
    );
}
