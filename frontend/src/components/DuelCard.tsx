'use client';

import React, { useState } from 'react';
import { Users, Shield, Zap, Loader2 } from '@/components/Icons';
import { request } from '@stacks/connect';
import { useStacks } from './StacksProvider';

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

const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';

export default function DuelCard({ duel }: DuelCardProps) {
  const { userData, authenticate } = useStacks();
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);

  const handleVote = async (optionIndex: number) => {
    if (!userData) {
      authenticate();
      return;
    }
    if (!duel.active || voting || voted) return;

    setVoting(true);
    try {
      await request('stx_callContract', {
        contract: `${CONTRACT_ADDRESS}.duel-engine`,
        functionName: 'vote',
        functionArgs: [
          '0x01' + parseInt(duel.id).toString(16).padStart(32, '0'),
          '0x01' + optionIndex.toString(16).padStart(32, '0'),
        ],
      });
      setVoted(true);
    } catch (err) {
      console.error('Vote failed:', err);
    }
    setVoting(false);
  };

  return (
    <div className="glass-card group flex flex-col h-full min-h-[420px] justify-between relative overflow-hidden">
      {/* GLOW DECORATION */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
      
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              <Shield size={14} /> DUEL
            </div>
            <div className="text-[12px] font-bold text-white/30 font-mono mt-1">
              #{duel.id}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            duel.active 
              ? 'bg-primary/10 border border-primary/20 text-primary' 
              : 'bg-white/5 border border-white/10 text-white/40'
          }`}>
            {duel.active ? '📡 Active' : '🏁 Closed'}
          </div>
        </div>

        <h3 className="text-xl font-black leading-[1.1] hover:text-primary transition-colors cursor-default">
          {duel.title}
        </h3>

        {/* BATTLE BAR */}
        <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors">
          <motion.div 
            initial={{ width: '0%', left: '50%' }}
            animate={{ width: '100%', left: '0%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 flex"
          >
            <div className="h-full bg-gradient-to-r from-cyan-500 to-primary w-1/2 blur-[2px] opacity-50" />
            <div className="h-full bg-gradient-to-l from-rose-500 to-pink-500 w-1/2 blur-[2px] opacity-50" />
          </motion.div>
          <div className="absolute inset-y-0 left-1/2 -ml-[1px] w-[2px] bg-white/20 z-10" />
        </div>

        <div className="space-y-3">
          {duel.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleVote(idx)}
              disabled={!duel.active || voting || voted}
              className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer disabled:cursor-not-allowed group/btn ${
                voted && duel.prediction === idx
                  ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
                  : duel.prediction === idx 
                    ? 'bg-primary/10 border-primary/30 hover:bg-primary/20' 
                    : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className={`text-sm font-black uppercase tracking-wide ${duel.prediction === idx ? 'text-primary' : 'text-white/70'}`}>
                  {option}
                </span>
                <div className="flex items-center gap-2">
                  {duel.prediction === idx && (
                    <Zap size={12} className="text-primary animate-pulse" fill="currentColor" />
                  )}
                  {voting && (
                    <Loader2 size={14} className="animate-spin text-primary" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Votes</span>
          <div className="flex items-center gap-2 font-black text-xl">
            <Users size={18} className="text-primary" />
            {duel.totalVotes}
          </div>
        </div>

        <div className={`py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
          voted 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : duel.active 
              ? 'bg-primary/20 text-primary border border-primary/30' 
              : 'bg-white/5 text-white/20 border border-white/5'
        }`}>
          {voted ? '✓ VOTED' : duel.active ? 'PICK A SIDE' : 'CLOSED'}
        </div>
      </div>
    </div>
  );
}
