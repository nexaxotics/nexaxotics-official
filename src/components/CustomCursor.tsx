"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    // Softer, more natural spring for the outer ring (Less snappy, more fluid)
    // damping: 28 (reduces jitter/oscillation)
    // stiffness: 250 (slower, more elegant follow)
    // mass: 1 (heavier feel)
    const springConfig = { damping: 28, stiffness: 250, mass: 1 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px ring
            cursorY.set(e.clientY - 16);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button';

            setIsHovering(!!isClickable);
        };

        if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener("mousemove", moveCursor);
            window.addEventListener("mousedown", handleMouseDown);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("mouseover", handleMouseOver);
        }

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Outer Ring - Follows with natural physics */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <motion.div
                    className="w-full h-full rounded-full border border-black/50 transition-all duration-200"
                    animate={{
                        scale: isHovering ? 1.5 : (isClicking ? 0.8 : 1),
                        opacity: isHovering ? 1 : 0.5,
                        borderColor: isHovering ? "hsl(var(--primary))" : "rgba(100, 100, 100, 0.4)",
                        borderWidth: isHovering ? "2px" : "1px",
                    }}
                />
            </motion.div>

            {/* Inner Dot - Instant Sync (No Spring, No Lag) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[10000] flex items-center justify-center"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(0,215,255,0.5)]"
                    animate={{
                        scale: isClicking ? 0.5 : 1
                    }}
                />
            </motion.div>
        </>
    );
}
