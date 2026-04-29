'use client';

import { motion } from 'framer-motion';
import { Shield, Sparkles, Zap } from './Icons';

interface CreatorBadgeProps {
  duel: {
    id: string;
    title: string;
  };
}

export default function CreatorBadge({ duel }: CreatorBadgeProps) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="relative aspect-[3/4] rounded-[32px] overflow-hidden group cursor-pointer"
    >
      {/* CARD BASE */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black border border-white/10 group-hover:border-primary/50 transition-colors duration-500" />
      
      {/* HOLOGRAPHIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
      
      {/* CONTENT */}
      <div className="relative h-full p-6 flex flex-col items-center justify-between z-10 text-center">
        <div className="w-full flex justify-between items-center">
          <div className="px-2 py-1 rounded-md bg-primary/20 border border-primary/30 text-[8px] font-black text-primary uppercase tracking-widest">
            GENESIS
          </div>
          <Shield size={16} className="text-white/20 group-hover:text-primary transition-colors" />
        </div>

        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative overflow-hidden group-hover:border-primary/50 transition-colors">
             <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(var(--primary-rgb),0.2)_0%,transparent_70%)] animate-pulse" />
             <Zap size={60} className="text-primary relative z-10" fill="currentColor" />
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border border-dashed border-primary/20 rounded-full" 
          />
        </div>

        <div className="space-y-2 w-full">
          <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Creator Badge</div>
          <h4 className="text-lg font-black leading-tight uppercase italic truncate px-2">
            {duel.title}
          </h4>
          <div className="pt-4 mt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Edition #00{duel.id}</span>
            <Sparkles size={12} className="text-yellow-500" />
          </div>
        </div>
      </div>

      {/* AMBIENT LIGHTS */}
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary/20 blur-[50px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
