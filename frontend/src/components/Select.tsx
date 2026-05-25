import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-white/80">{label}</label>
      <select
        {...props}
        className="bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}