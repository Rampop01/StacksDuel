'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Trophy, Sword, Flame, Loader2 } from '@/components/Icons';
import CreatorBadge from '@/components/CreatorBadge';
import { useStacks } from '@/components/StacksProvider';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

export default function ProfilePage() {
  const { userData, authenticate, connected } = useStacks();
  const [userDuels, setUserDuels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserHistory() {
      if (!userData) return;
      setLoading(true);
      const userAddress = userData.profile?.stxAddress?.mainnet || userData.profile?.stxAddress?.testnet;
      
      if (!userAddress) {
        setLoading(false);
        return;
      }

      try {
        const liveId = await fetchLastDuelId();
        const startId = Math.max(1, liveId - 20); // Search last 20 duels for this user to keep it fast
        
        const results = [];
        for (let i = liveId; i >= startId; i--) {
          const detail = await fetchDuelDetails(i);
          if (detail && detail.creator === userAddress) {
            results.push(detail);
          }
        }
        setUserDuels(results);
      } catch (err) {
        console.error('Failed to load user duels:', err);
      }
      setLoading(false);
    }

    if (connected) {
      loadUserHistory();
    }
  }, [userData, connected]);

  if (!userData) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="glass-card text-center p-12 max-w-md w-full border-white/5 space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center border border-primary/20">
            <Wallet className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Access Denied</h1>
          <p className="text-white/50 text-sm">Connect your Stacks wallet to view your personal battleground and historical victories.</p>
          <button onClick={authenticate} className="btn-primary w-full py-4 mt-4">
            CONNECT WALLET
          </button>
        </div>
      </main>
    );
  }

  const userAddress = userData.profile?.stxAddress?.mainnet || userData.profile?.stxAddress?.testnet || '0xUnknown';
  const shortAddress = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* PROFILE HEADER */}
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <span className="text-4xl font-black text-primary">{shortAddress.slice(0, 2)}</span>
            </div>
            
            <div className="flex flex-col text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{shortAddress}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/50 uppercase tracking-widest">
                  Commander
                </span>
                <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                  <Flame size={12} fill="currentColor" /> LVL 04
                </span>
              </div>
            </div>

            {/* MOCK OVERALL STATS */}
            <div className="md:ml-auto flex items-center gap-6 pt-6 md:pt-0 border-t border-white/10 md:border-t-0 w-full md:w-auto justify-center">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tighter">42</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Battles</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tighter text-yellow-500">28</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Victories</span>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black tracking-tighter text-primary">66%</span>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Win Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* BADGE COLLECTION */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Trophy className="text-yellow-500 w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Badge Collection</h2>
            <span className="ml-auto text-[10px] font-black text-white/20 uppercase tracking-widest">
              {userDuels.length} Items
            </span>
          </div>

          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {[1,2,3].map(i => <div key={i} className="aspect-[3/4] bg-white/5 rounded-[32px] animate-pulse" />)}
             </div>
          ) : userDuels.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {userDuels.map((duel) => (
                <CreatorBadge key={duel.id} duel={duel} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center glass rounded-[32px] border-white/5">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No Creator Badges Earned</p>
            </div>
          )}
        </section>

        {/* CREATED DUELS */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/5 pb-4">
            <Sword className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Your Arenas</h2>
          </div>

          {loading ? (
             <div className="flex flex-col items-center justify-center py-20 w-full glass rounded-3xl border-white/5">
               <Loader2 className="animate-spin text-primary w-8 h-8" />
             </div>
          ) : userDuels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userDuels.map((duel) => (
                <DuelCard key={duel.id} duel={duel} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 w-full glass rounded-3xl border-white/5 space-y-4">
              <Trophy className="w-12 h-12 text-white/20" />
              <p className="text-white/50 text-sm font-black uppercase tracking-widest">You haven't forged any duels yet.</p>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
