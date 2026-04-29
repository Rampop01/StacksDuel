'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Trophy, Shield } from './Icons';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

interface ActivityItem {
  id: string;
  type: 'created' | 'voted' | 'resolved';
  title: string;
  creator: string;
  totalVotes: number;
  timestamp: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecent() {
      const latestId = await fetchLastDuelId();
      const startId = Math.max(1, latestId - 7);
      const items: ActivityItem[] = [];

      for (let i = latestId; i >= startId; i--) {
        const duel = await fetchDuelDetails(i);
        if (!duel) continue;

        const shortCreator = `${duel.creator.slice(0, 6)}...${duel.creator.slice(-4)}`;

        if (!duel.active && duel.winner !== null) {
          items.push({
            id: duel.id,
            type: 'resolved',
            title: duel.title,
            creator: shortCreator,
            totalVotes: duel.totalVotes,
            timestamp: `Duel #${duel.id}`,
          });
        } else if (duel.totalVotes > 0) {
          items.push({
            id: duel.id,
            type: 'voted',
            title: duel.title,
            creator: shortCreator,
            totalVotes: duel.totalVotes,
            timestamp: `Duel #${duel.id}`,
          });
        } else {
          items.push({
            id: duel.id,
            type: 'created',
            title: duel.title,
            creator: shortCreator,
            totalVotes: duel.totalVotes,
            timestamp: `Duel #${duel.id}`,
          });
        }
      }

      setActivities(items);
      setLoading(false);
    }
    loadRecent();
  }, []);

  const typeConfig = {
    created: { icon: Shield, label: 'FORGED', color: 'text-primary', bg: 'bg-primary/10 border-primary/20' },
    voted: { icon: Zap, label: 'ACTIVE', color: 'text-cyan-400', bg: 'bg-cyan-400/10 border-cyan-400/20' },
    resolved: { icon: Trophy, label: 'RESOLVED', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  };

  return (
    <div className="glass-card overflow-hidden p-0 border-white/5">
      <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
        <Activity className="text-primary" size={20} />
        <h2 className="text-2xl font-black italic tracking-tighter uppercase">Recent Activity</h2>
        <div className="ml-auto px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-emerald-400 animate-pulse">
          Real-Time
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {loading ? (
          <div className="p-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary animate-pulse">Scanning Blockchain...</span>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-12 text-center text-white/30 text-[10px] font-black uppercase tracking-widest">
            No Recent Activity Found
          </div>
        ) : (
          activities.map((item, i) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 px-8 py-5 hover:bg-white/[0.02] transition-colors group cursor-default"
              >
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${config.bg}`}>
                  <Icon size={18} className={config.color} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-white/30 font-black uppercase tracking-widest mt-0.5">
                    by {item.creator} · {item.totalVotes} votes
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[9px] font-black uppercase tracking-widest ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-[10px] text-white/20 font-mono">
                    {item.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
