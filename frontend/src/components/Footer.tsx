'use client';

import { Swords, Activity, Zap, ShieldCheck } from './Icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(var(--primary-rgb),0.05),transparent)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* BRAND COL */}
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                <Swords className="text-primary w-6 h-6" />
              </div>
              <span className="text-xl font-black tracking-tighter italic">STACKS<span className="text-primary">DUEL</span></span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed font-medium">
              The elite decentralized arena built on Stacks, secured by the power of Bitcoin. 
              Battle, predict, and win in the genesis layer of DeFi.
            </p>
            <div className="flex items-center gap-3">
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-white/10" />
                 ))}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-primary">+12.4k Rivals Joined</span>
            </div>
          </div>

          {/* ARENA LINKS */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">The Arena</h4>
            <div className="flex flex-col space-y-3">
              <Link href="/battles" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Active Duels</Link>
              <Link href="/create" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Initiate Conflict</Link>
              <Link href="/leaderboard" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Hall of Fame</Link>
              <Link href="/rewards" className="text-sm text-white/60 hover:text-primary transition-colors font-bold flex items-center gap-2">
                Yield Vault <span className="bg-primary/10 text-primary text-[8px] px-1.5 py-0.5 rounded uppercase">New</span>
              </Link>
            </div>
          </div>

          {/* ECOSYSTEM */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Ecosystem</h4>
            <div className="flex flex-col space-y-3">
              <Link href="https://stacks.co" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Stacks Network</Link>
              <Link href="https://hiro.so" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Hiro Developer Tools</Link>
              <Link href="/docs" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Clarity Docs</Link>
              <Link href="/audits" className="text-sm text-white/60 hover:text-primary transition-colors font-bold">Security Audits</Link>
            </div>
          </div>

          {/* NETWORK STATUS */}
          <div className="flex flex-col space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Network Pulse</h4>
            <div className="glass-card bg-white/[0.02] p-5 border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Mainnet Proxy</span>
                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 uppercase">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                   Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Transactions</span>
                <span className="text-xs font-mono font-bold text-white/80">32ms latency</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Verified by Bitcoin L2</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
            © 2026 STACKSDUEL ARENA. BUILT FOR THE ALPHA.
          </span>
          <div className="flex gap-8">
            <button className="text-[10px] font-black text-white/20 hover:text-primary transition-colors uppercase tracking-widest">Twitter</button>
            <button className="text-[10px] font-black text-white/20 hover:text-primary transition-colors uppercase tracking-widest">Discord</button>
            <button className="text-[10px] font-black text-white/20 hover:text-primary transition-colors uppercase tracking-widest">Github</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
