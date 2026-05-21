'use client';
import { ExternalLink } from './Icons';

export default function CreatorLink({ address }: { address: string }) {
  const truncated = `${address.slice(0, 5)}...${address.slice(-4)}`;
  return (
    <a 
      href={`https://explorer.hiro.so/txid/${address}?chain=mainnet`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-xs text-white/50 hover:text-primary transition-colors bg-white/5 px-2 py-1 rounded"
    >
      {truncated}
      <ExternalLink size={10} />
    </a>
  );
}