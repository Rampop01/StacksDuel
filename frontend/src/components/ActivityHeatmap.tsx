'use client';

import { motion } from 'framer-motion';

export default function ActivityHeatmap() {
  // Mock data for a 52-week activity grid
  const weeks = 24; // showing last 24 weeks
  const days = 7;
  
  return (
    <div className="glass-card p-8 space-y-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-widest text-white/40">Battle Consistency</h3>
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Less</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-sm bg-white/5" />
            <div className="w-2 h-2 rounded-sm bg-primary/20" />
            <div className="w-2 h-2 rounded-sm bg-primary/40" />
            <div className="w-2 h-2 rounded-sm bg-primary/60" />
            <div className="w-2 h-2 rounded-sm bg-primary" />
          </div>
          <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">More</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-hide">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1 shrink-0">
            {Array.from({ length: days }).map((_, d) => {
              const intensity = Math.random();
              const color = intensity > 0.8 ? 'bg-primary' : 
                            intensity > 0.6 ? 'bg-primary/60' : 
                            intensity > 0.4 ? 'bg-primary/30' : 
                            intensity > 0.2 ? 'bg-primary/10' : 'bg-white/5';
              
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * 0.02) + (d * 0.01) }}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                  className={`w-3 h-3 rounded-sm ${color} transition-colors duration-500`}
                />
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest pt-2">
        <span>Nov</span>
        <span>Dec</span>
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
      </div>
    </div>
  );
}
