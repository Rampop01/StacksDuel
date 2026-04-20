'use client';

import React, { useEffect, useState } from 'react';
import { useStacks } from './StacksProvider';
import { Wallet, LogOut, Swords, Activity } from '@/components/Icons';
import { fetchLastDuelId } from '@/lib/stacks';

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
            <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/5">
              <span className="pl-3 text-xs font-mono font-bold text-primary">
                {(() => {
                  const addr = userData?.profile?.stxAddress?.mainnet || '';
                  return addr ? `${addr.slice(0,6)}...${addr.slice(-4)}` : 'Connected';
                })()}
              </span>
              <button 
                onClick={logout} 
                className="p-3 bg-white/10 hover:bg-red-500/20 rounded-xl transition-all text-white/60 hover:text-red-500"
              >
                <LogOut size={18} />
              </button>
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
