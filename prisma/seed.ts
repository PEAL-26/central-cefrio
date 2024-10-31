import { END_CONSUMER } from "../src/constants/cutomer";
import { PrismaClient } from "@prisma/client";

const url = process.env.DATABASE_URL || "";

const prisma = new PrismaClient({
  log: ["info"],
  datasourceUrl: url,
});

export const customers = [END_CONSUMER];

export async function customerSeed(prisma: PrismaClient) {
  customers.forEach(async (row) => {
    await prisma.customer.upsert({
      create: row,
      update: {},
      where: { id: row.id },
    });
  });
}

async function runSeeds() {
  await customerSeed(prisma);
}

runSeeds()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
