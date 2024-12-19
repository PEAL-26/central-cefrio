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

  const queryParams: Prisma.EmailAccountWhereInput = {
    OR: [
      {
        email: {
          contains: q,
          mode: 'insensitive',
        },
      },
    ],
  };

  const [total, emailAccounts] = await Promise.all([
    prisma.emailAccount.count({
      where: queryParams,
    }),
    prisma.emailAccount.findMany({
      select: {
        id: true,
        email: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: emailAccounts,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const emailAccountSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string({ required_error: 'Campo Obrigatório.' }),
  password: z.string({ required_error: 'Campo Obrigatório.' }),
  userIds: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id = randomUUID(), email, password, userIds } = emailAccountSchema.parse(data);

    let emailAccount = await prisma.emailAccount.findFirst({
      include: { users: true },
      where: { id },
    });

    let trans = [];
    if (emailAccount) {
      trans.push(
        prisma.emailAccount.update({
          data: {
            email,
            password,
          },
          where: { id },
        }),
        ...emailAccount.users
          .filter((user) => !userIds?.includes(user.id))
          .map((user) =>
            prisma.user.update({
              data: {
                emailAccounts: {
                  disconnect: {
                    id,
                  },
                },
              },
              where: {
                id: user.id,
              },
            }),
          ),
        ...(userIds?.map((userId) =>
          prisma.user.update({
            data: {
              emailAccounts: {
                connect: {
                  id,
                },
              },
            },
            where: { id: userId },
          }),
        ) || []),
      );
    } else {
      trans.push(
        prisma.emailAccount.create({
          data: {
            id,
            email,
            password,
          },
        }),
        ...(userIds?.map((userId) =>
          prisma.user.update({
            data: {
              emailAccounts: {
                connect: {
                  id,
                },
              },
            },
            where: { id: userId },
          }),
        ) || []),
      );
    }

    const [result] = await prisma.$transaction(trans);

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
