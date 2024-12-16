import { Prisma, PrismaPromise } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { END_CONSUMER } from '@/constants/customer';

import { paginationData, setPagination } from '../../../helpers/pagination';
import { responseError } from '../../../helpers/response/route-response';
import { getAllParams } from '../../../helpers/search-params';
import { prisma } from '../../../libs/prisma';

import { invoiceCreate, prepareData, verify } from './utils';

const listParamsSchema = z.object({
  type: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { type, q = '', page, size } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.InvoiceWhereInput = {
    OR: [
      {
        number: {
          contains: q,
          mode: 'insensitive',
        },
      },
      {
        customer: {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
      },
      {
        products: {
          some: {
            productName: {
              contains: q,
              mode: 'insensitive',
            },
          },
        },
      },
    ],
    type,
  };

  const [total, invoices] = await Promise.all([
    prisma.invoice.count({
      where: queryParams,
    }),
    prisma.invoice.findMany({
      select: {
        id: true,
        number: true,
        type: true,
        date: true,
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
        total: true,
        totalPaid: true,
      },
      where: queryParams,
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: invoices.map((inv) => ({
      ...inv,
      total: Number(inv?.total ?? 0) | Number(inv?.totalPaid ?? 0),
    })),
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    let invoice = await prisma.invoice.findFirst({
      where: { id: input?.id || '' },
    });

    if (invoice) {
      invoice = await update({ ...input, number: invoice.number });
    }

    if (!invoice) {
      invoice = await create(input);
    }

    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}

async function create(input: any) {
  const data = await prepareData(input, true);
  await verify(data);

  const document = invoiceCreate(data);

  let receipt: PrismaPromise<any> | null = null;
  if (data.type === 'FT' && data?.totalPaid > 0) {
    const receiptData = await prepareData(
      {
        type: 'RE',
        customerId: input.customerId,
        date: input.date,
        dueDate: input.date,
        reference: input.number,
        currency: input.currency,
        exchange: input.exchange,
        payments: input.payments,
        documents: [{ documentId: data.id, paid: data.totalPaid }],
      },
      true,
    );
    receipt = invoiceCreate(receiptData);
  }

  const docs = [document, receipt].filter((d) => d !== null);
  const [documentResponse] = await prisma.$transaction(docs as any);

  return documentResponse;
}

async function update(input: any) {
  const data = await prepareData(input);
  return prisma.invoice.update({
    data: {
      number: data.number,
      type: data.type,
      customerId: data.customerId || END_CONSUMER.id,
      date: data.date,
      dueDate: data.dueDate,
      paymentTerms: data.paymentTerms,
      reference: data.reference,
      observation: data.reference,
      currency: data.currency,
      exchange: data.exchange,
      withholdingTaxType: data.withholdingTaxType,
      withholdingTaxPercentage: data.withholdingTaxPercentage,
      generalDiscount: data.generalDiscount,
      subtotal: data.subtotal,
      total: data.total,
      totalPaid: data.totalPaid,
      balance: data.balance,
      totalIva: data.totalIva,
      totalDiscount: data.totalDiscount,
      totalWithholdingTax: data.totalWithholdingTax,
      products: {
        createMany: {
          data: data.productsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.productsData.map(({ id }) => id),
            },
          },
        },
      },
      payments: {
        createMany: {
          data: data.paymentsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.paymentsData.map(({ id }) => id),
            },
          },
        },
      },
      invoices: {
        createMany: {
          data: data.invoicesData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.invoicesData.map(({ id }) => id),
            },
          },
        },
      },
      documents: {
        createMany: {
          data: data.documentsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.documentsData.map(({ id }) => id),
            },
          },
        },
      },
      taxes: {
        createMany: {
          data: data.taxesData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.taxesData.map(({ id }) => id),
            },
          },
        },
      },
    },
    where: { id: data.id },
  });
}
