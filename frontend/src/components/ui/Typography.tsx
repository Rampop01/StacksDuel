import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const Heading = ({ children, className = '' }: TypographyProps) => (
  <h1 className={`font-black uppercase tracking-tighter text-4xl md:text-6xl ${className}`}>
    {children}
  </h1>
);

export const Subheading = ({ children, className = '' }: TypographyProps) => (
  <h2 className={`font-bold uppercase tracking-widest text-sm text-primary/80 ${className}`}>
    {children}
  </h2>
);

export const Text = ({ children, className = '' }: TypographyProps) => (
  <p className={`text-white/60 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const StatLabel = ({ children, className = '' }: TypographyProps) => (
  <span className={`text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ${className}`}>
    {children}
  </span>
);
