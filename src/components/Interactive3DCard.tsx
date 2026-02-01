"use client";

import React, { useRef, useState, ReactNode } from 'react';

interface Interactive3DCardProps {
    width?: string;
    height?: string;
    image?: string;
    title?: string;
    description?: string;
    tags?: string[];
    actions?: ReactNode;
    children?: ReactNode;
    className?: string; // Allow custom classes
}

const Interactive3DCard = ({
    width = '100%', // Default to full width of container
    height = '400px',
    image,
    title,
    description,
    tags,
    actions,
    children,
    className = ""
}: Interactive3DCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('none');
    const [parallax, setParallax] = useState('none');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        const rotateX = (y / (rect.height / 2)) * 15;
        const rotateY = -(x / (rect.width / 2)) * 15;

        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`); // Reduced scale slightly for smoother feel
        setParallax(`translateX(${x * 0.02}px) translateY(${y * 0.02}px)`);
    };

    const handleMouseLeave = () => {
        setTransform('none');
        setParallax('none');
    };

    return (
        <div
            ref={cardRef}
            className={`relative rounded-[2rem] shadow-lg hover:shadow-brand-glow border border-neutral-200 bg-white/80 backdrop-blur-md transition-all duration-300 ease-out ${className}`}
            style={{
                width,
                height, // Allow height to be overridden or auto
                minHeight: '300px',
                transform,
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 to-transparent pointer-events-none mix-blend-overlay"></div>

            <div
                className="relative z-10 p-8 h-full flex flex-col"
                style={{ transform: parallax, transition: 'transform 0.1s ease-out' }} // Faster parallax
            >
                {image && (
                    <div className="h-48 mb-6 overflow-hidden rounded-xl">
                        <img src={image} alt={title || 'Card image'} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="flex-1 flex flex-col">
                    {title && <h2 className="text-2xl font-heading font-bold mb-3 text-secondary">{title}</h2>}
                    {description && <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{description}</p>}
                </div>

                {(tags || actions) && (
                    <div className="flex justify-between items-center mt-auto gap-4">
                        {tags && (
                            <div className="flex gap-2 flex-wrap">
                                {tags.map(tag => (
                                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        {actions && <div>{actions}</div>}
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default Interactive3DCard;
