import { PrismaClient } from "@prisma/client";
const url = process.env.DATABASE_URL || "";

const prisma = new PrismaClient({
  log: ["info"],
  datasourceUrl: url,
});

export const customers = [
  {
    id: "b43b9e9a-8f68-46fe-96f0-b1bda758c3a8",
    name: "Consumidor Final",
    taxpayer: "XXXXXXXXXXX",
    address: "DESCONHECIDO",
  },
];

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
