import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        activities: [
            { id: '1', user: 'SP123...', action: 'voted on', target: 'BTC vs ETH', timestamp: '2m ago' },
            { id: '2', user: 'SP456...', action: 'created', target: 'PS5 vs Xbox', timestamp: '5m ago' },
        ]
    });
}