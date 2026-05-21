'use client';

import { ArrowLeft } from '@/components/Icons';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-primary">
            Privacy Policy
          </h1>
          <div className="h-px w-32 bg-primary/20" />
        </div>

        <div className="space-y-6 text-white/70 leading-relaxed font-medium">
          <p>
            Your privacy is important to us. This Privacy Policy explains how StacksDuel handles your data.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Data Collection</h2>
          <p>
            Because StacksDuel is a decentralized application (dApp), we do not require you to create an account with personal information like your name or email address. Your interaction with the platform is tied to your Stacks wallet address.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Blockchain Transparency</h2>
          <p>
            Please note that any transactions you perform on the Stacks blockchain, including creating duels and voting, are public and permanently recorded on-chain. This data is visible to anyone using a blockchain explorer.
          </p>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Local Storage</h2>
          <p>
            We may use local storage or cookies in your browser to save your preferences (like dark/light mode) and cache data to improve performance. This data is not sent to our servers.
          </p>
        </div>
      </div>
    </main>
  );
}
