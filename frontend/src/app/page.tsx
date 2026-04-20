'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Users, TrendingUp, Trophy, Zap, Loader2, Sparkles } from 'lucide-react';
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

      // Fetch the last 8 duels
      const startId = Math.max(1, liveId - 7);
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
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 animate-pulse">
          <Sparkles className="w-3 h-3" />
          STX BUILDER REWARDS SEASON 1
        </div>
        <h1 className="hero-title">
          Master the Chain,<br />
          <span className="neon-text">Win the Duel.</span>
        </h1>
        <p className="subtitle mb-10">
          The ultimate Stacks-based arena for competitive smart contract duels. 
          Stake STX, challenge opponents, and rise to the top of the leaderboard.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary px-10 py-4 text-lg">
            Create New Duel
          </button>
          <button className="glass px-10 py-4 text-lg hover:border-white/30 transition-all font-semibold">
            How it Works
          </button>
        </div>
      </section>

      {/* Duel Arena */}
      <section className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary animate-pulse">
              <Sword size={24} />
            </div>
            <h2 className="text-3xl font-bold font-heading tracking-tight">Active Battleground</h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Live Actions
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 glass rounded-3xl animate-fadeIn">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-white/60 font-medium">Scanning Stacks Arena...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {duels.map((duel, index) => (
                <motion.div
                  key={duel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DuelCard duel={duel} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <TrendingUp className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{lastId}</div>
            <div className="text-xs text-muted uppercase tracking-wider">Total Battles</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Zap className="text-purple-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{lastId * 1}0k+</div>
            <div className="text-xs text-muted uppercase tracking-wider">Estimated Entries</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-xl">
            <Trophy className="text-pink-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">{Math.floor(lastId * 0.8) + 100}</div>
            <div className="text-xs text-muted uppercase tracking-wider">Active Rivals</div>
          </div>
        </div>
      </section>

    </div>
  );
}
