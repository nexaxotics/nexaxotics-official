"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, TranslationKey } from '@/lib/translations';

type Language = 'en' | 'hi';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language;
            if (savedLanguage === 'hi' || savedLanguage === 'en') {
                setLanguage(savedLanguage);
            }
        }
    }, []);

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'hi' : 'en';
        setLanguage(newLanguage);
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', newLanguage);
        }
    };

    const t = (key: TranslationKey) => {
        return getTranslation(language, key);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
