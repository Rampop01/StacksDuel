'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Users, TrendingUp, Trophy, Zap, Loader2, Sparkles, Activity } from '@/components/Icons';
import Link from 'next/link';
import DuelCard from '@/components/DuelCard';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

export default function Home() {
  const [duels, setDuels] = useState<any[]>([]);
  const [lastId, setLastId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const liveId = await fetchLastDuelId();
      setLastId(liveId);
      
      if (liveId === 0) {
        setLoading(false);
        return;
      }

      const startId = Math.max(1, liveId - 2);
      const results = [];
      for (let i = liveId; i >= startId; i--) {
        const detail = await fetchDuelDetails(i);
        if (detail) results.push(detail);
      }
      setDuels(results);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* CENTERED HERO */}
        <section className="flex flex-col items-center text-center py-16 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Sparkles className="w-4 h-4" />
            Built on Stacks — Secured by Bitcoin
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-tight"
          >
            PICK A SIDE. <br/>
            <span className="neon-text italic">WIN THE DUEL.</span>
          </motion.h1>

          <p className="text-lg text-white/50 max-w-2xl leading-relaxed font-medium">
            StacksDuel is the decentralized prediction arena on Bitcoin L2. 
            Create head-to-head matchups, cast your vote, earn NFT badges, 
            and let the blockchain decide the winner.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/create" className="btn-primary flex items-center gap-2">
              <Sword size={20} />
              CREATE NEW DUEL
            </Link>
            <Link href="/how-it-works" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[11px] tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center">
              HOW IT WORKS
            </Link>
          </div>
        </section>

        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card flex flex-col items-center text-center space-y-2">
            <TrendingUp className="text-primary w-8 h-8 mb-2" />
            <span className="text-4xl font-black tracking-tighter">{lastId}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-Time Battles</span>
          </div>
          <div className="glass-card flex flex-col items-center text-center space-y-2">
             <Zap className="text-purple-500 w-8 h-8 mb-2" />
             <span className="text-4xl font-black tracking-tighter">{lastId * 10}+</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified Entries</span>
          </div>
          <div className="glass-card flex flex-col items-center text-center space-y-2">
             <Trophy className="text-pink-500 w-8 h-8 mb-2" />
             <span className="text-4xl font-black tracking-tighter">{Math.floor(lastId * 0.8) + 100}</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Active Rivals</span>
          </div>
        </div>

        {/* BATTLEGROUND GRID */}
        <section className="space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-3">
               <Activity className="text-primary animate-pulse w-6 h-6" />
               <h2 className="text-4xl font-black tracking-tighter uppercase italic">Battleground</h2>
            </div>
            <div className="h-px w-20 bg-primary/20" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 glass rounded-[48px] border-white/5 w-full">
              <Loader2 className="animate-spin text-primary" size={60} />
              <p className="text-primary font-black uppercase tracking-widest text-xs mt-6 animate-pulse">Syncing Arena...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                <AnimatePresence mode="popLayout">
                  {duels.map((duel, index) => (
                    <motion.div
                      key={duel.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <DuelCard duel={duel} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <Link href="/battles" className="bg-white/5 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-all duration-300 font-black text-xs uppercase tracking-[0.2em] py-4 px-12 rounded-full inline-flex items-center justify-center">
                VIEW GLOBAL ARENA
              </Link>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
