'use client';
export default function UserStats({ won, lost }: { won: number, lost: number }) {
    return (
        <div className="flex gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-lg">Won: {won} STX</div>
            <div className="p-4 bg-rose-500/10 rounded-lg">Lost: {lost} STX</div>
        </div>
    );
}