import React from 'react';
import { Shield } from 'lucide-react';

interface SelfClawBadgeProps {
  level?: string;
  size?: 'sm' | 'md';
}

const SelfClawBadge: React.FC<SelfClawBadgeProps> = ({ level = 'Verified', size = 'md' }) => {
  return (
    <div className={`inline-flex items-center gap-1 bg-[#00a2ff]/10 border border-[#00a2ff]/30 text-[#00a2ff] rounded font-black tracking-wider leading-none drop-shadow-[0_0_10px_rgba(0,162,255,0.5)] ${size === 'sm' ? 'px-1.5 py-0.5 text-[0.5rem]' : 'px-2 py-1 text-[0.65rem]'}`}>
      <Shield size={size === 'sm' ? 10 : 12} className="shrink-0 drop-shadow-[0_0_5px_rgba(0,162,255,0.8)]" />
      <span>{level.toUpperCase()}</span>
    </div>
  );
};

export default SelfClawBadge;
