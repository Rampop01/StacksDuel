'use client';

import React from 'react';
import DuelCard from '@/components/DuelCard';
import { Trophy, TrendingUp, Zap, Sparkles } from 'lucide-react';

const DUMMY_DUELS = [
  { id: '1234abcd', creator: 'SP2P8H...A89G', stake: 100, participants: 1, status: 'open' },
  { id: '5678efgh', creator: 'SP3X4J...Z12Q', stake: 500, participants: 2, status: 'active' },
  { id: '9012ijkl', creator: 'SP1M5K...B34P', stake: 25, participants: 1, status: 'open' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      {/* Hero Section */}
      <section className="text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 animate-pulse">
          <Sparkles className="w-3 h-3" />
          STX BUILDER REWARDS SEASON 1
        </div>
        <h1 className="hero-title">
          Master the Chain,<br />
          <span className="neon-text">Win the Duel.</span>
        </h1>
        <p className="subtitle mb-10">
          The ultimate Stacks-based arena for competitive smart contract duels. 
          Stake STX, challenge opponents, and rise to the top of the leaderboard.
        </p>
        <div className="flex gap-4">
          <button className="btn-primary px-10 py-4 text-lg">
            Create New Duel
          </button>
          <button className="glass px-10 py-4 text-lg hover:border-white/30 transition-all font-semibold">
            How it Works
          </button>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-cyan-500/10 rounded-xl">
            <TrendingUp className="text-cyan-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">12.5k</div>
            <div className="text-xs text-muted uppercase tracking-wider">Total Duels</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl">
            <Zap className="text-purple-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">450k</div>
            <div className="text-xs text-muted uppercase tracking-wider">STX Volume</div>
          </div>
        </div>
        <div className="glass-card flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-xl">
            <Trophy className="text-pink-400 w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold">1,240</div>
            <div className="text-xs text-muted uppercase tracking-wider">Active Players</div>
          </div>
        </div>
      </section>

      {/* Duels Grid */}
      <section className="centered-container section-spacing">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-3">Active Duels</h2>
          <p className="text-muted max-w-lg mx-auto">Join an open lobby or create your own challenge. Stake STX and prove your dominance.</p>
          <div className="mt-6 flex justify-center">
            <select className="glass px-6 py-2.5 bg-transparent outline-none border-white/10 rounded-xl text-sm cursor-pointer hover:border-white/20 transition-all">
              <option>All Stakes</option>
              <option>High Stakes (&gt;100 STX)</option>
              <option>Low Stakes (&lt;50 STX)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {DUMMY_DUELS.map((duel) => (
            <DuelCard key={duel.id} {...duel as any} />
          ))}
        </div>
      </section>
    </div>
  );
}
