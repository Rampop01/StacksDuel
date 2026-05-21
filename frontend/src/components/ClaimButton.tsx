'use client';
export default function ClaimButton({ onClick }: { onClick: () => void }) {
    return <button onClick={onClick} className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded transition">Claim Rewards</button>;
}