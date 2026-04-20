'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader2 from 'lucide-react/dist/esm/icons/loader-2';
import Activity from 'lucide-react/dist/esm/icons/activity';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Link from 'next/link';
import DuelCard from '@/components/DuelCard';
import { fetchLastDuelId, fetchDuelDetails } from '@/lib/stacks';

export default function BattlesPage() {
  const [duels, setDuels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const liveId = await fetchLastDuelId();
      
      if (liveId === 0) {
        setLoading(false);
        return;
      }

      // Fetch up to 24 most recent duels for the global arena
      const startId = Math.max(1, liveId - 23);
      const results = [];
      const fetchPromises = [];
      
      // Batch fetch for performance
      for (let i = liveId; i >= startId; i--) {
        fetchPromises.push(fetchDuelDetails(i));
      }
      
      const responses = await Promise.all(fetchPromises);
      for (const detail of responses) {
        if (detail) results.push(detail);
      }
      
      setDuels(results);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          
          <div className="flex items-center gap-3">
             <Activity className="text-primary animate-pulse w-8 h-8" />
             <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic">Global Arena</h1>
          </div>
          <div className="h-px w-32 bg-primary/20" />
          <p className="text-white/50 max-w-2xl font-medium">
            Explore all active and historical head-to-head prediction markets running on the Stacks blockchain.
          </p>
        </div>

        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 glass-card w-full">
              <Loader2 className="animate-spin text-primary" size={60} />
              <p className="text-primary font-black uppercase tracking-widest text-xs mt-6 animate-pulse">Syncing Historical Data...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {duels.map((duel, index) => (
                  <motion.div
                    key={duel.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <DuelCard duel={duel} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
