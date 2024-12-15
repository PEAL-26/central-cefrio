import { END_CONSUMER } from "../../src/constants/customer";
import { PrismaClient } from "@prisma/client";

const customers = [END_CONSUMER];

export async function customerSeed(prisma: PrismaClient) {
  customers.forEach(async (row) => {
    await prisma.customer.upsert({
      create: row,
      update: {},
      where: { id: row.id },
    });
  });
}
