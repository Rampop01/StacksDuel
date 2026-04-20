'use client';

import React from 'react';
import { useStacks } from './StacksProvider';
import { Wallet, LogOut, Swords } from 'lucide-react';

export default function Navbar() {
  const { authenticate, logout, userData } = useStacks();

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50 m-4 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-primary/20 rounded-lg border border-primary/20">
          <Swords className="text-primary w-6 h-6" />
        </div>
        <span className="text-xl font-bold tracking-tight">Stacks<span className="text-primary">Duel</span></span>
      </div>

      <div className="flex items-center gap-4">
        {userData ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs text-muted">Connected</span>
              <span className="text-sm font-mono truncate w-32">
                {userData.profile.stxAddress.mainnet || userData.profile.stxAddress.testnet}
              </span>
            </div>
            <button onClick={logout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <LogOut className="w-5 h-5 text-pink-500" />
            </button>
          </div>
        ) : (
          <button onClick={authenticate} className="btn-primary">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}
