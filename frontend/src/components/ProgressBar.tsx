'use client';
import { motion } from 'framer-motion';

export default function ProgressBar({ leftPool, rightPool }: { leftPool: number, rightPool: number }) {
  const total = leftPool + rightPool;
  const leftPercent = total === 0 ? 50 : (leftPool / total) * 100;

  return (
    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden flex">
      <motion.div 
        initial={{ width: '50%' }}
        animate={{ width: `${leftPercent}%` }}
        className="h-full bg-rose-500"
      />
      <motion.div 
        initial={{ width: '50%' }}
        animate={{ width: `${100 - leftPercent}%` }}
        className="h-full bg-emerald-500"
      />
    </div>
  );
}