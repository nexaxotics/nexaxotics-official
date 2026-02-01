"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
    className?: string;
    animate?: boolean;
}

export default function Logo({ className = "", animate = false }: LogoProps) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <motion.div
                initial={animate ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full"
            >
                <Image
                    src="/logo.png"
                    alt="NEXAXOTICS Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </motion.div>
        </div>
    );
}
