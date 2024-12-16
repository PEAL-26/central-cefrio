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
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = '', page, size } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.ProductWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
  };

  const [total, products] = await Promise.all([
    prisma.product.count({
      where: queryParams,
    }),
    prisma.product.findMany({
      select: {
        id: true,
        name: true,
        unitMeasure: true,
        price: true,
        iva: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: products,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const productSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: 'Campo Obrigatório.' }),
  unitMeasure: z.string().optional(),
  price: z.coerce.string().optional(),
  iva: z.coerce.string().optional(),
  reasonExemption: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      unitMeasure,
      price,
      iva,
      reasonExemption,
    } = productSchema.parse(data);

    let product = await prisma.product.findFirst({ where: { id } });

    if (product) {
      product = await prisma.product.update({
        data: {
          name,
          unitMeasure,
          price,
          iva,
          reasonExemption: reasonExemption
            ? reasonExemption
            : 'Transmissão de bens e serviços não sujeita',
        },
        where: { id },
      });
    } else {
      product = await prisma.product.create({
        data: {
          id,
          name,
          unitMeasure,
          price,
          iva,
          reasonExemption,
        },
      });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
