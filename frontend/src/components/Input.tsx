import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <input
        {...props}
        className={`bg-black/50 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-brand-500'} rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all`}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}