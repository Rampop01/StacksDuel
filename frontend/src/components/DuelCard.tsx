'use client';

import React, { useState } from 'react';
import { Users, Shield, Zap, Loader2, Trophy, Copy, Check, Share2, Flame } from '@/components/Icons';
import { request } from '@stacks/connect';
import { useStacks } from './StacksProvider';
import { motion } from 'framer-motion';
import Link from 'next/link';
import confetti from 'canvas-confetti';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = `${window.location.origin}/duel/${duel.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#a855f7']
      });
    } catch (err) {
      console.error('Vote failed:', err);
    }
    setVoting(false);
  };

    const getCategory = (title: string) => {
      const t = title.toLowerCase();
      if (t.includes('btc') || t.includes('eth') || t.includes('crypto') || t.includes('sol')) return { label: 'Crypto', color: 'text-orange-500 bg-orange-500/10 border-orange-500/20' };
      if (t.includes('vs') || t.includes('fight') || t.includes('win')) return { label: 'Social', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' };
      if (t.includes('market') || t.includes('stock') || t.includes('price')) return { label: 'Finance', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
      return { label: 'Duel', color: 'text-primary bg-primary/10 border-primary/20' };
    };
    const category = getCategory(duel.title);

    return (
    <div className={`glass-card group flex flex-col h-full min-h-[420px] justify-between relative overflow-hidden transition-all duration-500 ${
      duel.active ? 'hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]' : ''
    }`}>
      {/* GLOW DECORATION */}
      <div className={`absolute -top-24 -right-24 w-64 h-64 blur-[80px] transition-all duration-1000 pointer-events-none ${
        duel.active ? 'bg-primary/10 group-hover:bg-primary/25' : 'bg-white/5'
      }`} />
      
      {duel.active && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      
      <div className="space-y-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border ${category.color}`}>
              <Shield size={14} /> {category.label}
            </div>
            {duel.totalVotes >= 5 && (
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-orange-500 animate-pulse mt-2">
                <Flame size={12} fill="currentColor" /> Trending Now
              </div>
            )}
            {Date.now() / 1000 - duel.createdAt < 1800 && (
              <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-emerald-500 animate-pulse mt-1">
                <Zap size={12} fill="currentColor" /> NEW ARENA
              </div>
            )}
          </div>
            <div className="text-[12px] font-bold text-white/30 font-mono mt-1">
              #{duel.id}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-primary/50 text-white/30 hover:text-primary transition-all relative group"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[8px] font-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 uppercase tracking-widest">
                {copied ? 'Copied!' : 'Copy Link'}
              </span>
            </button>
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
              className={`w-full p-4 rounded-2xl border transition-all duration-300 text-left cursor-pointer disabled:cursor-not-allowed group/btn relative overflow-hidden ${
                !duel.active && duel.winner === idx
                  ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                  : voted && duel.prediction === idx
                    ? 'bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]'
                    : duel.prediction === idx 
                      ? 'bg-primary/10 border-primary/30 hover:bg-primary/20' 
                      : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center relative z-10">
                <div className="flex flex-col">
                  <span className={`text-sm font-black uppercase tracking-wide ${
                    !duel.active && duel.winner === idx ? 'text-yellow-500' :
                    duel.prediction === idx ? 'text-primary' : 'text-white/70'
                  }`}>
                    {option}
                  </span>
                  {!duel.active && duel.winner === idx && (
                    <span className="text-[8px] font-black text-yellow-500/50 uppercase tracking-[0.2em] mt-0.5">Arena Champion</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!duel.active && duel.winner === idx && (
                    <Trophy size={16} className="text-yellow-500 animate-bounce" />
                  )}
                  {duel.active && duel.prediction === idx && (
                    <Zap size={12} className="text-primary animate-pulse" fill="currentColor" />
                  )}
                  {voting && (
                    <Loader2 size={14} className="animate-spin text-primary" />
                  )}
                </div>
              </div>
              
              {!duel.active && duel.winner === idx && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent pointer-events-none" />
              )}
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

        <div className="flex items-center gap-3">
          <div className={`py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest ${
            voted 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
              : duel.active 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : 'bg-white/5 text-white/20 border border-white/5'
          }`}>
            {voted ? '✓ VOTED' : duel.active ? 'PICK A SIDE' : 'CLOSED'}
          </div>
          
          <Link href={`/duel/${duel.id}`} className="py-3 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 hover:border-white/20">
            VIEW DETAILS →
          </Link>
        </div>
      </div>
    </div>
  );
}
