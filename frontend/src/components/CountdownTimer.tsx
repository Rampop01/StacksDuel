'use client';
import { useState, useEffect } from 'react';
import { Clock } from './Icons';

export default function CountdownTimer({ blocksRemaining }: { blocksRemaining: number }) {
  // Assuming ~10 minutes per block
  const [timeLeft, setTimeLeft] = useState(blocksRemaining * 10 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);

  return (
    <div className="flex items-center gap-2 text-sm font-mono text-white/70 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
      <Clock size={14} className={timeLeft < 3600 ? 'text-rose-500 animate-pulse' : 'text-primary'} />
      {timeLeft <= 0 ? 'ENDED' : `${hrs}h ${mins}m`}
    </div>
  );
}