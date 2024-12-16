import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { generateUrlFromName } from '@/helpers/file';
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

  const queryParams: Prisma.CompanyWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
  };

  const [total, companies] = await Promise.all([
    prisma.company.count({
      where: queryParams,
    }),
    prisma.company.findMany({
      select: {
        id: true,
        name: true,
        telephone: true,
        email: true,
        site: true,
        address: true,
        taxpayer: true,
        location: true,
        logo: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: companies.map((company) => ({
      ...company,
      logo: generateUrlFromName(company?.logo),
    })),
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const companySchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string({
      required_error: 'Campo obrigatório.',
    })
    .min(2, {
      message: 'O nome deve ter pelo menos 2 caracteres',
    })
    .max(255, {
      message: 'O nome não deve ter mais de 255 caracteres',
    }),
  telephone: z.string().optional(),
  email: z.string().optional(),
  site: z.string().optional(),
  address: z.string().optional(),
  taxpayer: z.string().optional(),
  location: z.string().optional(),
  logo: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      telephone,
      email,
      site,
      address,
      taxpayer,
      location,
      logo,
    } = companySchema.parse(data);

    const company = await prisma.company.findFirst({ where: { id } });

    if (company) {
      await prisma.company.update({
        data: {
          name,
          telephone,
          email,
          site,
          address,
          taxpayer,
          location,
          logo,
        },
        where: { id },
      });
    } else {
      await prisma.company.create({
        data: {
          id,
          name,
          telephone,
          email,
          site,
          address,
          taxpayer,
          location,
          logo,
        },
      });
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
