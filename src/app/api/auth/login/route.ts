import { responseError } from '@/helpers/response/route-response';
import { prisma } from '@/libs/prisma';
import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string({ required_error: 'Campo Obrigatório.' }).email({ message: 'Email inválido.' }),
  password: z
    .string({ required_error: 'Campo Obrigatória' })
    .min(1, { message: 'Campo Obrigatória' }),
});

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, password } = loginSchema.parse(data);
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        passwordHash: true,
        role: true,
        picture: true,
      },
    });

    if (user && user.passwordHash === hashPassword(password)) {
      return NextResponse.json(exclude(user, ['passwordHash']), {
        status: 200,
      });
    }

    return NextResponse.json(
      {
        errors: [
          {
            message:
              'Acesso não autorizado, verifique suas credenciais. Se você continuar a ter problemas, entre em contacto com o suporte ou tente mais tarde.',
          },
        ],
      },
      { status: 401 },
    );
  } catch (error) {
    return responseError(error);
  }
}

function exclude(user: any, keys: string[]) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

function hashPassword(value: string) {
  return createHash('sha256').update(value).digest('base64');
}
