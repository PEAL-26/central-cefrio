import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

export async function usersSeed(prisma: PrismaClient) {
  const user = {
    id: '1b2f6a7b-1b2f-4d9b-af96-16171661c346',
    name: 'Admin',
    email: 'admin@admin.com',
    passwordHash: createHash('sha256').update('admin').digest('base64'),
    role: 'ADMIN' as any,
    emailVerified: new Date(),
  };

  await prisma.user.upsert({
    create: user,
    update: user,
    where: { id: user.id },
  });
}
