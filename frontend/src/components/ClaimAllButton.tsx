'use client';
export default function ClaimAllButton({ onClick }: { onClick: () => void }) {
    return <button onClick={onClick} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black rounded shadow-lg hover:scale-105 transition">Claim All Rewards</button>;
}