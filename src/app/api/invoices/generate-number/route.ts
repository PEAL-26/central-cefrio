import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { responseError } from '@/helpers/response/route-response';
import { getAllParams } from '@/helpers/search-params';

import { generateNumber } from '../utils';

const listParamsSchema = z.object({
  type: z.string({ message: 'Campo Obrigatório' }),
});

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { type } = listParamsSchema.parse(getAllParams(req.url));
    const number = await generateNumber(type);
    return NextResponse.json({ number }, { status: 200 });
  } catch (error) {
    return responseError(error);
  }
}
