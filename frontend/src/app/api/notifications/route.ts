import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        notifications: [
            { id: 1, type: 'reward', message: 'You earned 50 XP!', read: false },
            { id: 2, type: 'duel_won', message: 'Your prediction on BTC vs ETH was correct!', read: true }
        ]
    });
}