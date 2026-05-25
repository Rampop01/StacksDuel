import React from 'react';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded-lg ${className}`}></div>
  );
}

export function MatchupSkeleton() {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  );
}