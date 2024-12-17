import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export function GET(req: NextRequest, res: NextResponse) {
  const filename = req.url.split('/').slice(-1)[0] || '';
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  if (fs.existsSync(filePath)) {
    const headers = new Headers(req.headers);
    headers.append('Content-Type', 'application/octet-stream');
    return new Response(fs.readFileSync(filePath), { headers });
  } else {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
