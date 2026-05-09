import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-center';
  
  const variants = {
    primary: 'bg-primary text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    secondary: 'bg-secondary text-white hover:shadow-[0_0_30px_rgba(192,38,211,0.4)]',
    outline: 'bg-transparent border-2 border-white/10 text-white hover:border-white/30 hover:bg-white/5',
    ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'text-[9px] py-2 px-4 rounded-lg',
    md: 'text-[11px] py-4 px-8 rounded-2xl',
    lg: 'text-[13px] py-5 px-10 rounded-[24px]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
