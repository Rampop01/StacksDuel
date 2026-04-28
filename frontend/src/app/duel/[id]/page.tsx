'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Users, ArrowLeft, Loader2, Zap, Trophy, Activity, AlertCircle } from '@/components/Icons';
import Link from 'next/link';
import { fetchDuelDetails } from '@/lib/stacks';
import { useStacks } from '@/components/StacksProvider';
import { request } from '@stacks/connect';

const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';

export default function DuelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { userData, authenticate } = useStacks();
  
  const [duel, setDuel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    async function loadDuel() {
      if (!id) return;
      const data = await fetchDuelDetails(parseInt(id));
      setDuel(data);
      setLoading(false);
    }
    loadDuel();
  }, [id]);

  const handleVote = async (optionIndex: number) => {
    if (!userData) {
      authenticate();
      return;
    }
    if (!duel?.active || voting || voted) return;

    setVoting(true);
    try {
      await request('stx_callContract', {
        contract: `${CONTRACT_ADDRESS}.duel-engine`,
        functionName: 'vote',
        functionArgs: [
          '0x01' + parseInt(duel.id).toString(16).padStart(32, '0'),
          '0x01' + optionIndex.toString(16).padStart(32, '0'),
        ],
      });
      setVoted(true);
      // Optimistically update votes (mock visual update for demo purposes)
      setDuel({ ...duel, totalVotes: duel.totalVotes + 1 });
    } catch (err) {
      console.error('Vote failed:', err);
    }
    setVoting(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="animate-spin text-primary" size={60} />
          <p className="text-primary font-black uppercase tracking-widest text-xs mt-6 animate-pulse">Decrypting Arena Data...</p>
        </div>
      </main>
    );
  }

  if (!duel) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
        <div className="text-center space-y-6">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto" />
          <h1 className="text-4xl font-black uppercase tracking-tighter">Duel Not Found</h1>
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Return to Battleground
          </Link>
        </div>
      </main>
    );
  }

  // Calculate mock percentage for visual flair
  const option1Percent = duel.totalVotes > 0 ? Math.floor(Math.random() * 40) + 30 : 50;
  const option2Percent = 100 - option1Percent;
  const percentages = [option1Percent, option2Percent];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary transition-colors">
          <ArrowLeft size={14} /> Back to Arena
        </Link>

        {/* HERO SECTION */}
        <div className="glass-card relative overflow-hidden border-white/10 p-8 md:p-12">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary mb-4">
                <Shield size={16} /> DUEL #{duel.id}
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                {duel.title}
              </h1>
            </div>
            <div className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shrink-0 ${
              duel.active 
                ? 'bg-primary/20 border border-primary/30 text-primary animate-pulse' 
                : 'bg-white/10 border border-white/20 text-white/50'
            }`}>
              {duel.active ? '⚔️ Live Battle' : '🏁 Match Resolved'}
            </div>
          </div>

          {/* CREATOR & STATS */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/40 font-bold uppercase text-[10px] tracking-widest">Creator</span>
              <span className="font-mono bg-white/5 px-2 py-1 rounded text-white/70">
                {duel.creator.slice(0, 6)}...{duel.creator.slice(-4)}
              </span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 font-black text-xl">
              <Users size={18} className="text-primary" />
              {duel.totalVotes} <span className="text-[10px] text-white/40 uppercase tracking-widest ml-1">Total Cast</span>
            </div>
          </div>
        </div>

        {/* BATTLE OPTIONS */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="text-primary w-6 h-6" />
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Combatants</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {duel.options.map((option: string, idx: number) => {
              const isWinner = !duel.active && duel.winner === idx;
              const isSelected = voted && duel.prediction === idx;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleVote(idx)}
                  disabled={!duel.active || voting || voted}
                  className={`relative p-8 rounded-3xl border text-left transition-all duration-300 group overflow-hidden ${
                    isWinner 
                      ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.15)] cursor-default'
                      : isSelected
                        ? 'bg-primary/20 border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]'
                        : duel.active
                          ? 'bg-white/5 border-white/10 hover:border-primary/40 hover:bg-white/10 cursor-pointer'
                          : 'bg-white/5 border-white/5 opacity-70 cursor-not-allowed'
                  }`}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isWinner ? 'text-yellow-500' : 'text-white'}`}>
                        {option}
                      </h3>
                      {isWinner && <Trophy className="text-yellow-500 w-8 h-8 animate-bounce" />}
                      {isSelected && !isWinner && <Zap className="text-primary w-6 h-6" fill="currentColor" />}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-black uppercase tracking-widest text-white/50">
                        <span>Win Probability</span>
                        <span className={isWinner ? 'text-yellow-500' : 'text-primary'}>{percentages[idx]}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentages[idx]}%` }}
                          transition={{ duration: 1.5, delay: 0.2 }}
                          className={`h-full ${isWinner ? 'bg-yellow-500' : 'bg-primary'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* VOTE OVERLAY ON HOVER */}
                  {duel.active && !voting && !voted && (
                    <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <span className="text-black font-black text-xl uppercase tracking-widest flex items-center gap-2">
                        <Zap fill="currentColor" /> CAST VOTE
                      </span>
                    </div>
                  )}
                  {voting && duel.active && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                      <Loader2 className="animate-spin text-primary w-8 h-8" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </main>
  );
}
