import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "../../../libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { responseError } from "../../../helpers/response/route-response";

const customerSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string({ required_error: "Campo Obrigatório." }),
  address: z.string().optional(),
  location: z.string().optional(),
  email: z.string().optional(),
  taxpayer: z.string().optional(),
  telephone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      id = randomUUID(),
      name,
      address,
      location,
      email,
      taxpayer,
      telephone,
    } = customerSchema.parse(data);

    let customer = await prisma.customer.findFirst({ where: { id } });

    if (customer) {
      customer = await prisma.customer.update({
        data: {
          name,
          address,
          location,
          email,
          taxpayer,
          telephone,
        },
        where: { id },
      });
    } else {
      customer = await prisma.customer.create({
        data: {
          id,
          name,
          address,
          location,
          email,
          taxpayer,
          telephone,
        },
      });
    }

    return NextResponse.json(customer, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
