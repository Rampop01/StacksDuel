import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackInitials: string;
}

export function Avatar({ src, alt, size = 'md', fallbackInitials }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  return (
    <div className={`relative rounded-full overflow-hidden bg-white/10 border border-white/20 flex items-center justify-center text-white font-medium ${sizeClasses[size]}`}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" />
      ) : (
        <span>{fallbackInitials}</span>
      )}
    </div>
  );
}