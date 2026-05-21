'use client';
import { useState } from 'react';

export default function CreateDuelForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [title, setTitle] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ title }); }} className="space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Duel Proposition</label>
        <input 
          type="text" 
          placeholder="e.g. BTC > 100k by 2026?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-primary focus:outline-none transition-colors"
          required
        />
      </div>
      <button type="submit" className="w-full bg-primary text-background font-black uppercase tracking-widest py-3 rounded-xl hover:brightness-110 transition-all">
        Initiate Conflict
      </button>
    </form>
  );
}