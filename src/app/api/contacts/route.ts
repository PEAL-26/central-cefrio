import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { paginationData, setPagination } from '../../../helpers/pagination';
import { responseError } from '../../../helpers/response/route-response';
import { getAllParams } from '../../../helpers/search-params';
import { prisma } from '../../../libs/prisma';

const listParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
  customerId: z.string().optional(),
  type: z.string().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = '', page, size, customerId, type } = listParamsSchema.parse(getAllParams(req.url));
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
    customerId,
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
  id: z.string().uuid().optional(),
  type: z.string({ required_error: 'Campo Obrigatório.' }),
  value: z.string({ required_error: 'Campo Obrigatório.' }),
  main: z.coerce.boolean().optional(),
  customerId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id = randomUUID(), type, value, main, customerId } = contactSchema.parse(data);

    let contact = await prisma.contact.findFirst({ where: { id } });

    if (contact) {
      contact = await prisma.contact.update({
        data: {
          type,
          value,
          main,
          customerId,
        },
        where: { id },
      });
    } else {
      contact = await prisma.contact.create({
        data: {
          id,
          type,
          value,
          main,
          customerId,
        },
      });
    }

    return NextResponse.json(contact, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
