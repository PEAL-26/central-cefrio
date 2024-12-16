import { generateUrlFromName } from '@/helpers/file';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { responseError } from '../../../../helpers/response/route-response';
import { prisma } from '../../../../libs/prisma';

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = paramsSchema.parse(params);

    const company = await prisma.company.findUnique({
      where: { id },
    });

    return NextResponse.json(
      { ...company, logo: generateUrlFromName(company?.logo) },
      {
        status: 200,
      },
    );
  } catch (error) {
    return responseError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params, ...rest }: { params: { id: string } },
) {
  try {
    const { id } = paramsSchema.parse(params);

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return responseError(error);
  }
}
