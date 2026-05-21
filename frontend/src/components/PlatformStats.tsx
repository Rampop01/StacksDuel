'use client';
export default function PlatformStats({ volume, duels }: { volume: string, duels: number }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="p-6 glass-card text-center">Volume: {volume} STX</div>
            <div className="p-6 glass-card text-center">Active Duels: {duels}</div>
        </div>
    );
}