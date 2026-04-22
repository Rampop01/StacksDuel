'use client';

import { motion } from 'framer-motion';
import { Zap, Activity, ShieldCircle } from './Icons';

const MOCK_EVENTS = [
  { id: 1, type: 'VOTE', user: '0x74...f21', action: 'voted for', target: 'BITCOIN', time: '2s ago' },
  { id: 2, type: 'DUEL_END', user: 'SYSTEM', action: 'Duel #88 resolved!', target: 'ELON WINS', time: '1m ago' },
  { id: 3, type: 'USER', user: 'stx_master.btc', action: 'entered the', target: 'GENESIS ARENA', time: '3m ago' },
  { id: 4, type: 'VOTE', user: '0x12...a9b', action: 'voted for', target: 'ETHEREUM', time: '5m ago' },
  { id: 5, type: 'VOTE', user: 'bot_alpha', action: 'voted for', target: 'STX PUMP', time: '7m ago' },
];

export default function BattleFeed() {
  return (
    <div className="w-full bg-primary/5 border-y border-primary/10 overflow-hidden py-2 backdrop-blur-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center gap-8">
        <div className="flex items-center gap-2 px-4 border-r border-primary/20 shrink-0">
          <Activity size={14} className="text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Feed</span>
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...MOCK_EVENTS, ...MOCK_EVENTS].map((event, i) => (
              <div key={`${event.id}-${i}`} className="flex items-center gap-3">
                <div className={`p-1 rounded-full ${
                  event.type === 'VOTE' ? 'bg-primary/20' : 
                  event.type === 'DUEL_END' ? 'bg-purple-500/20' : 
                  'bg-pink-500/20'
                }`}>
                  {event.type === 'VOTE' ? <Zap size={10} className="text-primary" /> : 
                   event.type === 'DUEL_END' ? <ShieldCircle size={10} className="text-purple-500" /> : 
                   <Activity size={10} className="text-pink-500" />}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-mono font-bold text-white/80">{event.user}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/30">{event.action}</span>
                  <span className="text-[11px] font-black text-primary italic">{event.target}</span>
                  <span className="text-[9px] font-mono text-white/20 ml-2">[{event.time}]</span>
                </div>
                <div className="w-1 h-1 bg-white/10 rounded-full" />
              </div>
            ))}
          </motion.div>
          
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
        </div>
      </div>
    </div>
  );
}
