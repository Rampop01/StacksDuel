import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({ totalVolume: '10000', totalDuels: 420 });
}