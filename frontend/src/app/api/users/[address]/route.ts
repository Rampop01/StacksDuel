import { NextResponse } from 'next/server';
export async function GET(req: Request, { params }: { params: { address: string } }) {
    return NextResponse.json({ address: params.address, history: [] });
}