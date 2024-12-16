import { NextRequest } from 'next/server';

import { generatePDFPuppeteer } from '@/helpers/generate-pdf';

export async function POST(request: NextRequest) {
  const input = await request.json();
  const templateHtml = ''; //invoiceTemplate();
  const data = await generatePDFPuppeteer(templateHtml);

  console.log(data);
}
