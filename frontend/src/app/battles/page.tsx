'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ArrowLeft, Loader2, Search, Activity } from '@/components/Icons';
import Link from 'next/link';
import DuelCard from '@/components/DuelCard';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

export default function BattlesArchivePage() {
  const [duels, setDuels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadArchive() {
      const latestId = await fetchLastDuelId();
      if (latestId === 0) {
        setLoading(false);
        return;
      }

      const scanLimit = Math.min(latestId, 40);
      const startId = Math.max(1, latestId - scanLimit + 1);
      const fetchPromises = [];

      for (let i = latestId; i >= startId; i--) {
        fetchPromises.push(fetchDuelDetails(i));
      }

      const responses = await Promise.all(fetchPromises);
      setDuels(responses.filter(d => d !== null));
      setLoading(false);
    }
    loadArchive();
  }, []);

  const filtered = duels.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors text-sm">
              <ArrowLeft size={14} /> Back to Hub
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-primary/10 rounded-3xl border border-primary/20">
                <Activity className="text-primary w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Global Arena</h1>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-1">Proof of History on Bitcoin L2</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-96 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search all duels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 glass rounded-[48px] border-white/5">
            <Loader2 className="animate-spin text-primary" size={60} />
            <p className="text-primary font-black uppercase tracking-widest text-xs mt-6 animate-pulse">Syncing Arena Data...</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((duel, i) => (
                <motion.div
                  key={duel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <DuelCard duel={duel} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-40 text-center glass rounded-[48px] border-white/5">
            <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No Battles Found Matching Search</p>
          </div>
        )}

      </div>
    </main>
  );
}
