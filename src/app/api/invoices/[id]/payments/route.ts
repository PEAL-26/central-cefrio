import { numericString } from '@/helpers/zod';
import { randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { responseError } from '../../../../../helpers/response/route-response';
import { prisma } from '../../../../../libs/prisma';
import { invoiceCreate, prepareData } from '../../utils';

const paymentsSchema = z.object({
  payments: z.array(
    z.object({
      date: z.coerce.date({
        message: 'Campo Obrigatório',
        required_error: 'Campo Obrigatório',
      }),
      method: z
        .string({
          message: 'Campo Obrigatório',
          required_error: 'Campo Obrigatório',
        })
        .min(1, 'Campo Obrigatório'),
      amount: numericString(z.number({ message: 'Campo Obrigatório' }).gt(0, 'Campo Obrigatório')),
      observation: z.string().optional(),
    }),
  ),
});
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const invoice = await prisma.invoice.findFirst({ where: { id: params.id } });

    if (!invoice) {
      throw new Error('Documento não encontrado.');
    }

    const { payments } = paymentsSchema.parse(data);

    const receiptData = await prepareData({
      type: 'RE',
      customerId: invoice.customerId || undefined,
      date: new Date(),
      dueDate: new Date(),
      reference: invoice.number,
      currency: invoice.currency || undefined,
      exchange: invoice.exchange,
      payments,
      documents: [
        { documentId: invoice.id, paid: payments.reduce((total, item) => total + item.amount, 0) },
      ],
    });

    const receiptResponse = invoiceCreate(receiptData);

    const paymentResponse = prisma.invoicePayment.createMany({
      data: receiptData.paymentsData.map((payment) => ({
        ...payment,
        id: randomUUID(),
        invoiceId: params.id,
        observation: `${payment.observation || ''} ${receiptData.number}`.trim(),
      })),
    });

    await prisma.$transaction([receiptResponse, paymentResponse]);

    return NextResponse.json({}, { status: 200 });
  } catch (error: any) {
    return responseError(error);
  }
}
