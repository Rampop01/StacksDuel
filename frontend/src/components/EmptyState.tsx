'use client';
import { ShieldAlert } from './Icons';
export default function EmptyState({ message = "No active duels found." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center glass-card border-dashed border-white/10">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <ShieldAlert className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">The Arena is Quiet</h3>
      <p className="text-white/50">{message}</p>
    </div>
  );
}