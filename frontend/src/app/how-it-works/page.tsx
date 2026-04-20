'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sword, Coins, ShieldCheck, Trophy } from '@/components/Icons';
import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        <div className="flex flex-col space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest w-fit">
            <ArrowLeft size={16} /> Back to Hub
          </Link>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-primary">
            How StacksDuel Works
          </h1>
          <div className="h-px w-32 bg-primary/20" />
          <p className="text-lg text-white/70 leading-relaxed font-medium">
            StacksDuel is a fully decentralized prediction market built directly on the Stacks blockchain.
            Every action is an on-chain transaction secured by Bitcoin.
          </p>
        </div>

        <div className="space-y-8 mt-12">
          
          {/* STEP 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card"
          >
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 p-4 rounded-2xl border border-primary/20 shrink-0">
                <Sword className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black">1. Create a Duel</h3>
                <p className="text-white/60 leading-relaxed">
                  Anyone can propose a head-to-head prediction market by calling the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">create-duel</code> smart contract function. Define the title, up to 4 options, and optionally submit your initial prediction. Creating a duel automatically mints a <strong>"CREATOR"</strong> NFT badge to your Stacks wallet as proof of inception.
                </p>
              </div>
            </div>
          </motion.div>

          {/* STEP 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <div className="flex items-start gap-6">
              <div className="bg-purple-500/10 p-4 rounded-2xl border border-purple-500/20 shrink-0">
                <Coins className="w-8 h-8 text-purple-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black">2. Cast Your Vote</h3>
                <p className="text-white/60 leading-relaxed">
                  Browse the Global Arena and find active duels. Choose your side and submit your transaction. Voting incurs a small STX network fee. As soon as your vote is mined, the smart contract automatically mints a <strong>"PARTICIPANT"</strong> NFT directly into your wallet.
                </p>
              </div>
            </div>
          </motion.div>

          {/* STEP 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
          >
            <div className="flex items-start gap-6">
              <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 shrink-0">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black">3. Immutable Resolution</h3>
                <p className="text-white/60 leading-relaxed">
                  The original creator manages the resolution using the <code className="text-primary bg-primary/10 px-2 py-0.5 rounded">resolve-duel</code> function. Once an option is declared the winner, the duel is permanently marked as "Closed" on the blockchain. No further votes can be cast.
                </p>
              </div>
            </div>
          </motion.div>

          {/* STEP 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card"
          >
            <div className="flex items-start gap-6">
              <div className="bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20 shrink-0">
                <Trophy className="w-8 h-8 text-pink-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-black">4. Claim Glory</h3>
                <p className="text-white/60 leading-relaxed">
                  Depending on future platform updates, holding Champion or Participant NFTs may unlock exclusive arena privileges, airdrops, or leaderboard rankings. You secure your legacy permanently on Bitcoin L2.
                </p>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </main>
  );
}
