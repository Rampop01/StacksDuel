'use client';
import { Activity } from './Icons';

export default function PendingOverlay({ isVisible, message = "Awaiting Confirmation..." }: { isVisible: boolean, message?: string }) {
  if (!isVisible) return null;
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center rounded-2xl">
      <Activity size={32} className="text-primary animate-pulse mb-4" />
      <span className="text-sm font-black uppercase tracking-widest text-white/70">{message}</span>
    </div>
  );
}