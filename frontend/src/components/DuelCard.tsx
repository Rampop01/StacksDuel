'use client';

import React from 'react';
import { Swords, Users, Trophy, ExternalLink } from 'lucide-react';

interface DuelCardProps {
  id: string;
  creator: string;
  stake: number;
  participants: number;
  status: 'open' | 'active' | 'finished';
}

export default function DuelCard({ id, creator, stake, participants, status }: DuelCardProps) {
  return (
    <div className="glass-card flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
          <Swords className="w-3.5 h-3.5" />
          Duel #{id.slice(0, 4)}
        </div>
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
          status === 'open' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-pink-500/10 text-pink-400 border border-pink-500/20'
        }`}>
          {status}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-1">STX Showdown</h3>
        <p className="text-sm text-muted">Created by <span className="text-white font-mono">{creator.slice(0, 6)}...{creator.slice(-4)}</span></p>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted uppercase">Stake</span>
          <span className="text-xl font-bold neon-text">{stake} STX</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-muted uppercase">Players</span>
          <div className="flex items-center gap-1 font-bold">
            <Users className="w-4 h-4 text-cyan-400" />
            {participants}/2
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="btn-primary flex-1 py-2 text-sm">
          Join Duel
        </button>
        <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
          <ExternalLink className="w-4 h-4 text-muted" />
        </button>
      </div>
    </div>
  );
}
