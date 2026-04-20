'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Next.js Client Crash:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black z-50 text-white">
      <div className="glass-card max-w-2xl w-full p-8 border-red-500/50 flex flex-col items-center text-center space-y-6">
        <h2 className="text-3xl font-black text-red-500">CLIENT RUNTIME CRASH</h2>
        <p className="text-white/70">The application encountered a fatal error during rendering.</p>
        
        <div className="w-full bg-red-500/10 p-6 rounded-2xl text-left border border-red-500/20 overflow-auto">
          <p className="font-mono text-red-400 text-sm break-all font-bold">
            {error.message || 'Unknown Error'}
          </p>
          {error.stack && (
             <pre className="mt-4 text-[10px] text-white/40 font-mono whitespace-pre-wrap break-all">
                {error.stack}
             </pre>
          )}
        </div>

        <button
          className="btn-primary mt-4 py-3 px-8 text-sm"
          onClick={() => window.location.reload()}
        >
          FORCE RELOAD PAGE
        </button>
      </div>
    </div>
  );
}
