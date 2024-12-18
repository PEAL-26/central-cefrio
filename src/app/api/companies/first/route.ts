import { generateUrlFromName } from '@/helpers/file';
import { responseError } from '@/helpers/response/route-response';
import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const company = await prisma.company.findFirst({ take: 1 });
    return NextResponse.json(
      company
        ? {
            ...company,
            logo: generateUrlFromName(company?.logo),
          }
        : null,
      { status: 200 },
    );
  } catch (error) {
    responseError(error);
  }
}
