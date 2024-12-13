import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "../../../libs/prisma";
import { Prisma } from "@prisma/client";
import { getAllParams } from "../../../helpers/search-params";
import { NextRequest, NextResponse } from "next/server";
import { responseError } from "../../../helpers/response/route-response";
import { paginationData, setPagination } from "../../../helpers/pagination";

const listParamsSchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const { q = "", page, size } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.BankWhereInput = {
    OR: [
      {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        abbreviation: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        account: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        iban: {
          contains: q,
          mode: "insensitive",
        },
      },
    ],
  };

  const [total, banks] = await Promise.all([
    prisma.bank.count({
      where: queryParams,
    }),
    prisma.bank.findMany({
      select: {
        id: true,
        name: true,
        abbreviation: true,
        account: true,
        iban: true,
      },
      where: queryParams,
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: banks,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

const productSchema = z.object({
  id: z.string().optional(),
  name: z.string({ message: "Campo Obrigatório." }),
  abbreviation: z.string({ message: "Campo Obrigatório." }),
  account: z.string({ message: "Campo Obrigatório." }),
  iban: z.string().optional(),
  show: z.boolean().default(true).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      abbreviation,
      account,
      iban,
      show,
    } = productSchema.parse(data);

    let bank = await prisma.bank.findFirst({ where: { id } });

    if (bank) {
      bank = await prisma.bank.update({
        data: {
          name,
          abbreviation,
          account,
          iban,
          show,
        },
        where: { id },
      });
    } else {
      bank = await prisma.bank.create({
        data: {
          id,
          name,
          abbreviation,
          account,
          iban,
          show,
        },
      });
    }

    return NextResponse.json(bank, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
