'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/battles', label: 'Battles' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="md:hidden text-white p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          <div className="relative w-64 bg-gray-900 h-full border-l border-white/10 p-6 flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-white tracking-tight">Stacks<span className="text-brand-500">Duel</span></span>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            <nav className="flex flex-col space-y-4">
              {links.map(l => (
                <Link 
                  key={l.href} 
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors ${pathname === l.href ? 'text-brand-500' : 'text-white/70 hover:text-white'}`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}