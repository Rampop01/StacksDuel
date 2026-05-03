'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Flame, User, Loader2 } from './Icons';
import { fetchLeaderboardStats } from '@/lib/stacks';

import SelfClawBadge from './SelfClawBadge';

export default function Leaderboard() {
  const [champions, setChampions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const stats = await fetchLeaderboardStats();
      // Tag top 2 as verified agents for the demo
      const taggedStats = stats.map((s, i) => i < 2 ? { ...s, isAgent: true } : s);
      setChampions(taggedStats);
      setLoading(false);
    }
    loadStats();
  }, []);
  return (
    <div className="glass-card overflow-hidden p-0 border-white/5">
      <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-2">
            <Trophy className="text-yellow-500" />
            Global Champions
          </h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Season 1: Genesis Arena</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-primary">Live</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-white/30 font-black border-b border-white/5">
              <th className="px-8 py-4">Rank</th>
              <th className="px-8 py-4">Challenger</th>
              <th className="px-8 py-4">Victories</th>
              <th className="px-8 py-4 text-right">Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="animate-spin text-primary mb-2" size={24} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Calculating On-Chain Ranks...</span>
                  </div>
                </td>
              </tr>
            ) : champions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-8 py-12 text-center">
                  <div className="text-white/30 text-[10px] font-black uppercase tracking-widest">No Champions Found Yet.</div>
                </td>
              </tr>
            ) : (
              champions.map((champ, i) => (
                <motion.tr 
                  key={champ.rank}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-default"
                >
                  <td className="px-8 py-6 font-mono text-lg font-black italic text-white/20 group-hover:text-primary transition-colors">
                    #{champ.rank}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                          champ.rank === 1 ? 'border-yellow-500/50 bg-yellow-500/10' :
                          champ.rank === 2 ? 'border-gray-300/50 bg-gray-300/10' :
                          champ.rank === 3 ? 'border-orange-500/50 bg-orange-500/10' :
                          'border-white/10 bg-white/5'
                        }`}>
                          {champ.rank <= 3 ? <Medal size={18} className={
                            champ.rank === 1 ? 'text-yellow-500' :
                            champ.rank === 2 ? 'text-gray-300' :
                            'text-orange-500'
                          } /> : <User size={18} className="text-white/40" />}
                        </div>
                        {champ.winRate > 90 && (
                          <div className="absolute -top-1 -right-1 bg-primary text-black rounded-full p-0.5">
                            <Flame size={10} fill="currentColor" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-white group-hover:text-primary transition-colors">{champ.name}</div>
                          {champ.isAgent && <SelfClawBadge size="sm" />}
                        </div>
                        <div className="text-[10px] text-white/30 font-black uppercase tracking-widest">{champ.volume} STX VOL</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black tracking-tighter">{champ.wins}</span>
                      <Star size={14} className="text-primary fill-primary" />
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-sm font-black text-primary font-mono">{champ.winRate}%</div>
                      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${champ.winRate}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 text-center bg-white/[0.01]">
        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-primary transition-all">
          VIEW ALL LEGENDS →
        </button>
      </div>
    </div>
  );
}
