'use client';

import { Search, Filter } from 'lucide-react';

interface ArenaFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ArenaFilters({ searchQuery, setSearchQuery, activeTab, setActiveTab }: ArenaFiltersProps) {
  const tabs = ['All', 'Live', 'Trending', 'Resolved'];

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-white/[0.02] border border-white/5 p-2 rounded-2xl">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/2">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-white/40" />
        </div>
        <input
          type="text"
          placeholder="Search battles by title or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors"
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeTab === tab 
                ? 'bg-primary text-black' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
