import { paginationData, setPagination } from '@/helpers/pagination';
import { getAllParams } from '@/helpers/search-params';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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
        documents: {
          include: {
            invoice: {
              select: {
                status: true,
              },
              include: {
                payments: {
                  select: {
                    amount: true,
                  },
                },
              },
            },
          },
        },
      },
      where: queryParams,
      orderBy: [{ createdAt: 'desc' }],
      skip,
      take,
    }),
  ]);

  const rows = invoices
    .map((inv) => {
      const payments = (
        inv?.documents?.flatMap((d) => [
          ...(d?.invoice?.payments?.map((p) => ({ ...p, status: d.invoice.status })) || []),
        ]) || []
      ).filter((p) => p.status !== 'A');
      const total = Number(inv?.total ?? 0);
      const totalPaid = payments.reduce((total, item) => Number(total) + Number(item.amount), 0);
      const balance = totalPaid - total;

      return {
        ...inv,
        total,
        totalPaid,
        balance,
      };
    })
    .filter((i) => i.balance < 0);

  const response = paginationData({
    rows,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}
