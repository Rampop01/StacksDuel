import { GET, POST } from './route';
import { NextRequest } from 'next/server';

describe('API Route: /api/duels/report', () => {
  it('should return 200 on GET', async () => {
    const req = new NextRequest('http://localhost:3000/api/duels/report');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.status).toBe('success');
  });

  it('should return 201 on valid POST', async () => {
    const req = new NextRequest('http://localhost:3000/api/duels/report', {
      method: 'POST',
      body: JSON.stringify({ test: true })
    });
    const res = await POST(req);
    expect(res.status).toBe(201);
  });
});
