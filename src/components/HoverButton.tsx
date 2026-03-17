"use client";

interface HoverButtonProps {
  hoverText?: string;
  defaultText?: string;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  widthClassName?: string;
  heightClassName?: string;
}

export default function HoverButton({ 
  hoverText = "Let's Talk",
  defaultText = "Get Started",
  onClick,
  className = "",
  showArrow = true,
  widthClassName = "w-[180px]",
  heightClassName = "h-[56px]",
}: HoverButtonProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`group relative overflow-hidden rounded-full border border-primary/25 bg-white/[0.06] text-sm font-bold tracking-[0.01em] text-primary transition-all duration-500 hover:border-primary/60 hover:shadow-brand-glow active:scale-[0.98] ${widthClassName} ${heightClassName} ${className}`}
    >
      <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-500 group-hover:-translate-y-14 group-hover:scale-0 group-hover:rotate-[120deg]">
        <span>{defaultText}</span>
        {showArrow && <span className="opacity-80">→</span>}
      </span>

      <span className="absolute inset-0 flex translate-y-14 scale-100 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 font-semibold text-white transition-all duration-500 group-hover:translate-y-0 group-hover:scale-105">
        <span>{hoverText}</span>
        {showArrow && <span>→</span>}
      </span>
    </button>
  );
}

