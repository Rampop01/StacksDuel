import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        categories: ['All', 'Crypto', 'Tech', 'Culture', 'Gaming', 'AI']
    });
}