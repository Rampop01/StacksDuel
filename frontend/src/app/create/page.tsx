'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Sword, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { request } from '@stacks/connect';
import { uintCV, stringAsciiCV, listCV, cvToHex } from '@stacks/transactions';
import { useStacks } from '@/components/StacksProvider';

const CONTRACT_ADDRESS = 'SP1BTBG1TW13NEV2FQM7HC1BZ9XZV7FZSGPMVV38M';

export default function CreateDuelPage() {
  const router = useRouter();
  const { userData, authenticate } = useStacks();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [prediction, setPrediction] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (prediction >= newOptions.length) {
        setPrediction(newOptions.length - 1);
      }
    }
  };

  const handeOptionChange = (idx: number, value: string) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) {
      authenticate();
      return;
    }
    if (!title || options.some(opt => !opt)) return;

    setSubmitting(true);
    try {
      const titleCV = stringAsciiCV(title);
      const optionsCV = listCV(options.map(opt => stringAsciiCV(opt)));
      const predictionCV = uintCV(prediction);

      await request('stx_callContract', {
        contract: `${CONTRACT_ADDRESS}.duel-engine`,
        functionName: 'create-duel',
        functionArgs: [
          cvToHex(titleCV),
          cvToHex(optionsCV),
          cvToHex(predictionCV)
        ],
      });
      
      // Wait briefly then redirect so user can see it in global arena later
      setTimeout(() => {
        router.push('/battles');
      }, 1000);
    } catch (err) {
      console.error('Create duel failed:', err);
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          
          <div className="flex items-center gap-3">
             <Sword className="text-primary w-8 h-8" />
             <h1 className="text-5xl font-black tracking-tighter uppercase italic">Forge Duel</h1>
          </div>
          <p className="text-white/50 font-medium">
            Propose a new prediction market on Bitcoin L2. Creating a duel guarantees you a CREATOR NFT.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-primary">Duel Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. BTC vs ETH 2026"
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium outline-none focus:border-primary/50 transition-colors"
                maxLength={64}
                required
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                 <label className="text-xs font-black uppercase tracking-widest text-primary">Options (2 to 4)</label>
                 {options.length < 4 && (
                   <button type="button" onClick={handleAddOption} className="text-xs font-bold text-white/50 hover:text-white flex items-center gap-1">
                     <Plus size={14} /> Add Option
                   </button>
                 )}
              </div>
              
              <div className="space-y-3">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <input 
                      type="text" 
                      value={opt}
                      onChange={(e) => handeOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-medium outline-none focus:border-primary/50 transition-colors"
                      maxLength={32}
                      required
                    />
                    {options.length > 2 && (
                      <button type="button" onClick={() => handleRemoveOption(idx)} className="p-4 bg-white/5 hover:bg-red-500/20 text-white/30 hover:text-red-500 rounded-2xl transition-colors">
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-primary">Your Prediction (Required)</label>
              <div className="grid grid-cols-2 gap-3">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPrediction(idx)}
                    className={`p-4 rounded-2xl border text-sm font-bold uppercase transition-all ${
                      prediction === idx 
                        ? 'bg-primary/20 border-primary/50 text-white' 
                        : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {opt || `Option ${idx + 1}`}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full btn-primary py-5 mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="animate-spin" /> : <Sword size={20} />}
              {submitting ? 'AWAITING WALLET CONFIRMATION...' : 'LAUNCH DUEL (REQUIRES NETWORK FEE)'}
            </button>
          </form>
        </motion.div>

      </div>
    </main>
  );
}
