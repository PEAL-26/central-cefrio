import { Prisma, UserRole } from '@prisma/client';
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
  role: z.nativeEnum(UserRole).optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = '', page, size, role } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.UserWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
    role,
  };

  const [total, users] = await Promise.all([
    prisma.user.count({
      where: queryParams,
    }),
    prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        picture: true,
        role: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: users,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const userSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: 'Campo Obrigatório.' }),
  email: z.string().optional(),
  password: z.string().optional(),
  picture: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id = randomUUID(), name, email, password, picture, role } = userSchema.parse(data);

    let user = await prisma.user.findFirst({ where: { id } });

    if (user) {
      user = await prisma.user.update({
        data: {
          name,
          email,
        },
        where: { id },
      });
    } else {
      // user = await prisma.user.create({
      //   data: {
      //     id,
      //     name,
      //     email: email || '',
      //   },
      // });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
