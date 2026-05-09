import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = true }: CardProps) => {
  const baseStyles = 'bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 transition-all duration-300';
  const hoverStyles = hover ? 'hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`font-bold text-xl mb-4 ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`${className}`}>
    {children}
  </div>
);
