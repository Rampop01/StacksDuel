import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 custom-scrollbar">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat
              ? 'bg-brand-500 text-white shadow-[0_0_15px_rgba(255,107,0,0.4)]'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}