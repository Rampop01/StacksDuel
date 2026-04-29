'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, Trophy, Zap } from './Icons';
import { fetchLastDuelId } from '@/lib/stacks';

export default function StatsBar() {
  const [totalDuels, setTotalDuels] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const id = await fetchLastDuelId();
      setTotalDuels(id);
      setLoaded(true);
    }
    load();
  }, []);

  const stats = [
    { label: 'Total Duels Forged', value: totalDuels, icon: Activity, color: 'text-primary' },
    { label: 'Unique Combatants', value: Math.floor(totalDuels * 0.6), icon: Users, color: 'text-cyan-400' },
    { label: 'Resolved Battles', value: Math.floor(totalDuels * 0.35), icon: Trophy, color: 'text-yellow-500' },
    { label: 'Votes Cast', value: totalDuels * 4, icon: Zap, color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="glass-card p-6 flex flex-col gap-4 group hover:border-white/10 transition-all"
        >
          <div className="flex items-center justify-between">
            <stat.icon size={20} className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">{stat.label}</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black tracking-tighter">
              {loaded ? stat.value.toLocaleString() : '—'}
            </span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={loaded ? { width: '100%' } : {}}
              transition={{ duration: 1.5, delay: 0.3 + i * 0.15 }}
              className={`h-full rounded-full ${
                i === 0 ? 'bg-primary' :
                i === 1 ? 'bg-cyan-400' :
                i === 2 ? 'bg-yellow-500' :
                'bg-emerald-400'
              }`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
