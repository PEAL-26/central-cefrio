import { END_CONSUMER } from "../../src/constants/customer";
import { PrismaClient } from "@prisma/client";
import { customerSeed } from "./customer";
import { usersSeed } from "./users";

const url = process.env.DATABASE_URL || "";

const prisma = new PrismaClient({
  log: ["info"],
  datasourceUrl: url,
});

async function runSeeds() {
  await Promise.all([customerSeed(prisma), usersSeed(prisma)]);
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
