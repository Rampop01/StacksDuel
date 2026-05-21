import { NextResponse } from 'next/server';
export async function POST() {
    // Logic to sync historical duels from chainhook
    return NextResponse.json({ success: true, message: 'Sync triggered' });
}