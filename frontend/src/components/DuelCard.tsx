'use client';

import React from 'react';
import { Swords, Users, Trophy, ExternalLink, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface DuelCardProps {
  duel: {
    id: string;
    creator: string;
    title: string;
    options: string[];
    prediction: number;
    active: boolean;
    winner: number | null;
    totalVotes: number;
  };
}

export default function DuelCard({ duel }: DuelCardProps) {
  const isFinished = !duel.active;
  
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card flex flex-col gap-5 border border-white/5 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />

      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          <Swords className="w-3.5 h-3.5" />
          Arena #{duel.id}
        </div>
        <div className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
          duel.active ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-white/10 text-white/60 border border-white/5'
        }`}>
          {duel.active ? '🔥 Live' : '🏁 Finished'}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="text-xl font-bold leading-tight line-clamp-2 min-h-[3.5rem]">{duel.title}</h3>
        <p className="text-[11px] text-white/40 mt-1 font-mono uppercase tracking-tight">
          Initiator: {duel.creator.slice(0, 6)}...{duel.creator.slice(-4)}
        </p>
      </div>

      {/* Options Arena */}
      <div className="flex flex-col gap-3 relative z-10">
        {duel.options.map((option, idx) => (
          <div key={idx} className="relative group cursor-pointer">
            <div className={`w-full p-3 rounded-xl border transition-all duration-300 ${
              duel.prediction === idx 
                ? 'bg-primary/5 border-primary/30' 
                : 'bg-white/5 border-white/5 hover:border-white/20'
            }`}>
              <div className="flex justify-between items-center relative z-10">
                <span className="text-sm font-medium">{option}</span>
                {duel.prediction === idx && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/20 rounded text-[9px] font-bold text-primary">
                    <Zap size={10} fill="currentColor" />
                    PREDICTED
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest leading-none mb-1">Participants</span>
            <div className="flex items-center gap-1.5 font-bold text-sm">
              <Users className="w-3.5 h-3.5 text-primary" />
              {duel.totalVotes}
            </div>
          </div>
        </div>
        
        <button className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
          duel.active 
            ? 'bg-primary text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
            : 'bg-white/5 text-white/40 cursor-not-allowed'
        }`}>
          {isFinished ? 'VIEW RESULTS' : 'CAST VOTE'}
        </button>
      </div>
    </motion.div>
  );
}
