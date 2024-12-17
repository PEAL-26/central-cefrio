import { PrismaClient } from '@prisma/client';

export async function companiesSeed(prisma: PrismaClient) {
  const company = {
    id: '1b2f6a7b-1b2f-4d9b-af96-16171661c346',
    name: 'Teste',
    address: 'Teste',
    email: 'teste@teste.com',
    location: 'Angola - Luanda',
    site: 'www.teste.com',
    slogan: 'Slogan',
    taxpayer: 'xxxxxxxxxx',
    telephone: '9xx xxx xxx',
  };

  await prisma.company.upsert({
    create: company,
    update: company,
    where: { id: company.id },
  });
}
