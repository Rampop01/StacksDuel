'use client';

import { ArrowLeft } from '@/components/Icons';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-primary">
            Terms of Service
          </h1>
          <div className="h-px w-32 bg-primary/20" />
        </div>

        <div className="space-y-6 text-white/70 leading-relaxed font-medium">
          <p>
            By accessing or using StacksDuel, you agree to be bound by these Terms of Service. 
            StacksDuel is a decentralized prediction market interface. 
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Decentralized Infrastructure</h2>
          <p>
            StacksDuel operates on the Stacks blockchain. The core logic of the prediction markets, including vote tracking and prize distribution, is handled by immutable smart contracts. We do not have custody over your funds at any time.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Assumption of Risk</h2>
          <p>
            Participating in prediction markets carries inherent financial risk. You should not participate with funds you cannot afford to lose. StacksDuel is not responsible for any losses incurred due to incorrect predictions or smart contract exploits.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Prohibited Activities</h2>
          <p>
            Users are prohibited from engaging in any illegal activities using StacksDuel, including money laundering, fraud, or manipulating markets through Sybil attacks.
          </p>
        </div>
      </div>
    </main>
  );
}
