'use client';
import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ChevronRight, Search } from 'lucide-react';

interface DuelData {
  id: string;
  title: string;
  options: string[];
}

export default function AdminPanel({ onResolve }: { onResolve: (id: string, winner: number) => void }) {
  const [duelId, setDuelId] = useState('');
  const [previewDuel, setPreviewDuel] = useState<DuelData | null>(null);

  // Mock fetch for now
  const handleSearch = () => {
    if (!duelId) return;
    setPreviewDuel({
      id: duelId,
      title: `Mock Duel #${duelId}: BTC vs ETH`,
      options: ['BTC', 'ETH']
    });
  };

  return (
    <div className="p-6 border border-rose-500/30 rounded-2xl bg-black/50 backdrop-blur-md relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-rose-500/10 rounded-lg text-rose-500">
          <ShieldAlert size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Oracle Resolution Panel</h2>
          <p className="text-sm text-neutral-400">Authorized personnel only</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Search Section */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Enter Duel ID..."
              value={duelId}
              onChange={(e) => setDuelId(e.target.value)}
              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all"
            />
          </div>
          <button 
            onClick={handleSearch}
            className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-medium rounded-xl transition-colors whitespace-nowrap"
          >
            Fetch Duel
          </button>
        </div>

        {/* Preview Section */}
        {previewDuel && (
          <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800/50 space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <div className="text-xs font-medium text-rose-500 mb-1">DUEL #{previewDuel.id}</div>
              <h3 className="text-lg font-bold text-white">{previewDuel.title}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {previewDuel.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => onResolve(previewDuel.id, idx)}
                  className="group relative p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/0 to-rose-500/0 group-hover:from-rose-500/10 transition-all" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-neutral-500 font-medium mb-1">OPTION {idx}</div>
                      <div className="font-bold text-white group-hover:text-rose-400 transition-colors">{option}</div>
                    </div>
                    <ChevronRight size={20} className="text-neutral-600 group-hover:text-rose-500 transition-colors translate-x-0 group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}