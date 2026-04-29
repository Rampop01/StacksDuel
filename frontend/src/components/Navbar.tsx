'use client';

import React, { useEffect, useState } from 'react';
import { useStacks } from './StacksProvider';
import { Wallet, LogOut, Swords, Activity, Zap, Star } from '@/components/Icons';
import { fetchLastDuelId } from '@/lib/stacks';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  const { authenticate, logout, userData } = useStacks();
  const [lastId, setLastId] = useState(0);

  useEffect(() => {
    fetchLastDuelId().then(setLastId);
    const interval = setInterval(() => {
      fetchLastDuelId().then(setLastId);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-white/5 h-24">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
            <Swords className="text-primary w-7 h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter italic">STACKS<span className="text-primary">DUEL</span></span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">Global Arena</span>
          </div>
        </div>

        {/* DETAILS FLEXING */}
        <div className="hidden lg:flex items-center gap-12">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Live Arena Matches</span>
            <span className="text-sm font-black text-primary flex items-center gap-2">
              <Activity size={14} className="animate-pulse" />
              {lastId} CONFIRMED
            </span>
          </div>
          <div className="w-[1px] h-10 bg-white/5" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Network Reliability</span>
            <span className="text-sm font-black text-emerald-500">100% STEADY</span>
          </div>
        </div>

        {/* AUTH ACTIONS */}
        <div className="flex items-center gap-4">
          {userData ? (
            <div className="flex items-center gap-6">
              {/* GAMIFIED PROFILE */}
              <div className="hidden md:flex flex-col items-end gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Battle Rank</span>
                  <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">LVL 04</span>
                </div>
                <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    className="h-full bg-gradient-to-r from-primary to-cyan-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/5 pr-4">
                <Link href="/profile" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                    <Star size={18} className="text-primary relative z-10" fill="currentColor" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">Commander</span>
                    <span className="text-xs font-mono font-bold text-white group-hover:text-primary transition-colors">
                      {(() => {
                        const addr = userData?.profile?.stxAddress?.mainnet || '';
                        return addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : '0x...EY';
                      })()}
                    </span>
                  </div>
                </Link>
                <button 
                  onClick={logout} 
                  className="ml-2 p-2.5 bg-white/5 hover:bg-rose-500/20 rounded-xl transition-all text-white/30 hover:text-rose-500 border border-transparent hover:border-rose-500/30"
                >
                  <LogOut size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={authenticate} 
              className="btn-primary flex items-center gap-3 py-3.5"
            >
              <Wallet size={18} />
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
