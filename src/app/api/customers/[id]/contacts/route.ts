import { paginationData, setPagination } from '@/helpers/pagination';
import { responseError } from '@/helpers/response/route-response';
import { getAllParams } from '@/helpers/search-params';
import { prisma } from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const listParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  type: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { q = '', page, size, type } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.ContactWhereInput = {
    OR: [
      {
        value: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
    customerId: params.id,
    type,
  };

  const [total, contacts] = await Promise.all([
    prisma.contact.count({
      where: queryParams,
    }),
    prisma.contact.findMany({
      select: {
        id: true,
        type: true,
        value: true,
        main: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: contacts,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const contactSchema = z.object({
  contacts: z.array(
    z.object({
      id: z.string().uuid().optional(),
      type: z.string({ required_error: 'Campo Obrigatório.' }),
      value: z.string({ required_error: 'Campo Obrigatório.' }),
      main: z.coerce.boolean().optional(),
    }),
  ),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const { contacts } = contactSchema.parse(data);
    const customer = await prisma.customer.findFirst({ where: { id: params.id } });

    if (!customer) {
      throw new Error('Cliente não encontrado.');
    }

    const trans = [
      prisma.customer.update({
        data: {
          contact: {
            deleteMany: {
              id: {
                notIn: contacts.map((c) => c.id).filter((id) => id !== undefined) as string[],
              },
            },
            createMany: {
              data: contacts.map((c) => ({
                id: c.id || randomUUID(),
                type: c.type,
                value: c.value,
                main: c?.main,
              })),
              skipDuplicates: true,
            },
          },
        },
        where: { id: params.id },
      }),
      ...contacts
        .filter((c) => c.id !== undefined)
        .map((contact) =>
          prisma.contact.update({
            data: {
              type: contact.type,
              value: contact.value,
              main: contact.main,
            },
            where: { id: contact.id },
          }),
        ),
    ];

    await prisma.$transaction(trans);

    return NextResponse.json(customer, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
