'use client';
import { motion } from 'framer-motion';
import { ShieldCheck } from './Icons';

export default function SuccessModal({ isOpen, onClose, txId }: { isOpen: boolean, onClose: () => void, txId: string }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card max-w-md w-full p-8 text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-black uppercase italic mb-2">Transaction Broadcasted</h2>
        <p className="text-white/50 text-sm mb-8">Your action has been submitted to the Stacks network.</p>
        <button onClick={onClose} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-colors">
          Dismiss
        </button>
      </motion.div>
    </div>
  );
}