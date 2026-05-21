'use client';

import { ArrowLeft } from '@/components/Icons';
import Link from 'next/link';

export default function FAQPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-primary">
            Frequently Asked Questions
          </h1>
          <div className="h-px w-32 bg-primary/20" />
        </div>

        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-2">What is StacksDuel?</h3>
            <p className="text-white/60">StacksDuel is a fully decentralized prediction market running on the Stacks blockchain, allowing users to propose and vote on future events with verifiable on-chain transparency.</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-2">How do I participate?</h3>
            <p className="text-white/60">You need a Stacks-compatible wallet like Leather or Xverse. Connect your wallet, browse the Arena, and vote on open duels using STX tokens.</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-2">Are my funds secure?</h3>
            <p className="text-white/60">Yes. The entire application logic is governed by immutable Clarity smart contracts secured by the Bitcoin network.</p>
          </div>
          <div className="glass-card">
            <h3 className="text-xl font-bold mb-2">What happens when I win?</h3>
            <p className="text-white/60">If your prediction is correct, the smart contract allows you to claim your share of the prize pool proportional to your contribution once the duel is resolved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
