'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from './Icons';

export default function SentimentGauge() {
  // Mock data for overall sentiment
  const bullishPercent = 68; 
  
  return (
    <div className="glass-card p-8 bg-gradient-to-br from-white/[0.03] to-primary/5 border-white/5 relative overflow-hidden group">
      {/* BACKGROUND DECOR */}
      <div className="absolute top-0 center-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent)] pointer-events-none" />
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="flex flex-col space-y-4 max-w-xs text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            <Activity size={16} className="animate-pulse" />
            Arena Sentiment
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
            THE BULLS ARE <span className="text-primary italic">DOMINATING</span>
          </h2>
          <p className="text-xs text-white/40 font-medium leading-relaxed">
            Overall sentiment across all active duels is heavily leaning towards positive outcomes. 
            Join the fray to shift the momentum.
          </p>
        </div>

        {/* GAUGE VISUAL */}
        <div className="relative w-64 h-32 flex items-end justify-center perspective-1000">
          {/* SEMI CIRCLE TRACK */}
          <div className="absolute inset-x-0 bottom-0 h-32 rounded-t-full border-t-8 border-x-8 border-white/5 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-white/5 to-emerald-500/20" />
          </div>
          
          {/* PROGRESS FILL */}
          <svg className="absolute inset-x-0 bottom-0 w-64 h-32 overflow-visible">
            <motion.path
              d="M 8 128 A 120 120 0 0 1 248 128"
              fill="none"
              stroke="url(#sentimentGradient)"
              strokeWidth="8"
              strokeDasharray="1000"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 1000 - (bullishPercent * 1000 / 100 * 0.4) }} // approx calculation
              transition={{ duration: 2, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>

          {/* NEEDLE */}
          <motion.div 
            initial={{ rotate: -90 }}
            animate={{ rotate: (bullishPercent / 100) * 180 - 90 }}
            transition={{ duration: 2.5, type: 'spring', bounce: 0.4 }}
            className="absolute bottom-0 w-1 h-32 origin-bottom bg-white z-20 shadow-[0_0_15px_white]"
          >
            <div className="absolute top-0 left-1/2 -ml-1.5 w-3 h-3 bg-white rounded-full" />
          </motion.div>

          {/* CENTER HUB */}
          <div className="absolute bottom-0 w-12 h-6 bg-[#0a0a0a] rounded-t-full border-t-2 border-x-2 border-white/20 z-30 flex items-center justify-center">
             <span className="text-[10px] font-black pt-1">{bullishPercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-center">
            <div className="flex flex-col items-center">
                <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 mb-2">
                    <TrendingDown className="text-rose-500" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter">32%</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Fear Index</span>
            </div>
            <div className="flex flex-col items-center">
                <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-2">
                    <TrendingUp className="text-emerald-500" />
                </div>
                <span className="text-2xl font-black italic tracking-tighter">68%</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Greed Index</span>
            </div>
        </div>
      </div>
    </div>
  );
}
