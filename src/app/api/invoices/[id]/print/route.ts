import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { COOKIES } from '@/constants/cookies';
import { generatePDFPuppeteer } from '@/helpers/generate-pdf';
import { responseError } from '@/helpers/response/route-response';
import { prisma } from '@/libs/prisma';
import { invoiceTemplateData, paymentTemplateData, transportTemplateData } from './template-data';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const INVOICE = ['FT', 'FR', 'PP', 'OR', 'FO'];
const TRANSPORT = ['GR', 'GT'];
const PAYMENT = ['RE'];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = paramsSchema.parse(params);
    const { company, invoice, banks } = await getData(id);

    const payments =
      invoice?.documents?.flatMap((d) => [
        ...(d?.invoice.status === 'A' ? [] : d?.invoice?.payments || []),
      ]) || [];

    let templateHtml = '';

    if (INVOICE.includes(invoice.type)) {
      templateHtml = await invoiceTemplateData({ company, invoice, payments, banks });
    }

    if (TRANSPORT.includes(invoice.type)) {
      templateHtml = await transportTemplateData({ company, invoice });
    }

    if (PAYMENT.includes(invoice.type)) {
      templateHtml = await paymentTemplateData({ company, invoice, payments, banks });
    }

    const isUploadLocal = process.env.NEXT_PUBLIC_UPLOAD_LOCAL === 'true';
    let Authorization = undefined;
    if (isUploadLocal) {
      Authorization = `Bearer ${cookies().get(COOKIES.TOKEN)?.value || ''}`;
    }

    const data = await generatePDFPuppeteer(templateHtml, { Authorization });

    const b64 = Buffer.from(data).toString('base64');

    return NextResponse.json(
      { pdf: b64 },
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      },
    );
  } catch (error) {
    return responseError(error);
  }
}

async function getData(id: string) {
  const [company, invoice, banks] = await Promise.all([
    prisma.company.findFirst(),
    prisma.invoice.findUnique({
      where: { id },
      include: {
        customer: true,
        documents: {
          include: {
            invoice: {
              include: {
                payments: true,
              },
            },
          },
        },
        products: {
          orderBy: [{ order: 'asc' }],
        },
        payments: true,
        taxes: true,
      },
    }),
    prisma.bank.findMany({
      where: { show: true },
    }),
  ]);

  if (!company) {
    throw new Error('Empresa não encontrada.');
  }

  if (!invoice) {
    throw new Error('Documento não encontrada.');
  }

  if (invoice.products.length === 0 && invoice.documents.length === 0) {
    throw new Error('Não existe nenhum item deste documento.');
  }

  return { company, invoice, banks };
}
