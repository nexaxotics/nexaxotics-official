"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

export interface ToastProps {
    message: string;
    type: "success" | "error" | "warning";
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export default function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const icons = {
        success: <CheckCircle2 className="w-5 h-5" />,
        error: <XCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />,
    };

    const colors = {
        success: "bg-green-500/10 border-green-500/30 text-green-400",
        error: "bg-red-500/10 border-red-500/30 text-red-400",
        warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] max-w-md w-full mx-4"
                >
                    <div className={`glass-morphe ${colors[type]} border rounded-2xl p-4 shadow-2xl flex items-start gap-3`}>
                        <div className="shrink-0 mt-0.5">{icons[type]}</div>
                        <p className="flex-1 text-sm font-medium leading-relaxed">{message}</p>
                        <button
                            onClick={onClose}
                            className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
