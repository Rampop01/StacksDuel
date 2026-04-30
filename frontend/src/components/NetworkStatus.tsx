'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function NetworkStatus() {
  const [blockHeight, setBlockHeight] = useState<number | null>(null);
  const [latency, setLatency] = useState<number | null>(null);
  const [status, setStatus] = useState<'green' | 'yellow' | 'red'>('green');

  useEffect(() => {
    async function checkNetwork() {
      const start = Date.now();
      try {
        const res = await fetch('https://api.mainnet.hiro.so/v2/info');
        const data = await res.json();
        const end = Date.now();
        
        setBlockHeight(data.stacks_tip_height);
        const lat = end - start;
        setLatency(lat);
        
        if (lat < 300) setStatus('green');
        else if (lat < 800) setStatus('yellow');
        else setStatus('red');
      } catch (err) {
        setStatus('red');
      }
    }

    checkNetwork();
    const interval = setInterval(checkNetwork, 20000); // Check every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-center">
        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">STX Block Height</span>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-white">#{blockHeight || '------'}</span>
          <div className="relative flex h-2 w-2">
            <motion.span 
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                status === 'green' ? 'bg-emerald-500' :
                status === 'yellow' ? 'bg-yellow-500' : 'bg-rose-500'
              }`}
            />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              status === 'green' ? 'bg-emerald-500' :
              status === 'yellow' ? 'bg-yellow-500' : 'bg-rose-500'
            }`} />
          </div>
        </div>
      </div>
      <div className="w-px h-8 bg-white/5" />
      <div className="flex flex-col items-start">
        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Latency</span>
        <span className={`text-[10px] font-black ${
          status === 'green' ? 'text-emerald-500' :
          status === 'yellow' ? 'text-yellow-500' : 'text-rose-500'
        }`}>
          {latency ? `${latency}MS` : '---'}
        </span>
      </div>
    </div>
  );
}
