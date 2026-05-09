import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 ml-4">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/20 ${className}`}
          {...props}
        />
        {error && (
          <span className="text-[10px] font-bold text-error ml-4 mt-1 uppercase tracking-wider">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
