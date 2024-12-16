import { randomUUID } from 'crypto';

import { END_CONSUMER } from '@/constants/customer';
import { invoiceUpdateItemTotal, invoiceUpdateResume } from '@/helpers/invoice-total-update';
import { formatNumberWithLeadingZeros } from '@/helpers/string';
import { prisma } from '@/libs/prisma';

import {
  InvoiceDocumentSchemaType,
  InvoiceItemSchemaType,
  InvoicePaymentSchemaType,
  invoiceSchema,
  InvoiceSchemaType,
} from './types';

export async function verify(data: any) {
  const totalPaid =
    data.paymentsData?.reduce((total: number, item: any) => total + item.amount, 0) || 0;
  const total = data.total || 0;

  if (data.type !== 'RE' && !data.productsData?.length) {
    if (totalPaid === 0) {
      throw new Error('Insira no mínimo um(1) item no documento');
    }
  }

  if (data.type === 'RE' && !data.documentsData?.length) {
    if (totalPaid === 0) {
      throw new Error('Insira no mínimo um(1) item no documento');
    }
  }

  if (data.type === 'RE' || data.type === 'FR') {
    if (totalPaid === 0) {
      throw new Error('Deve adicionar um pagamento.');
    }
  }

  if (data.type === 'FR') {
    if (totalPaid < total) {
      throw new Error(
        'Em documentos Pronto Pagamento o valor pago deve maior ou igual ao valor total.',
      );
    }
  }

  if (data.type === 'FT' && data.paymentTerms === 'ready') {
    if (totalPaid === 0) {
      throw new Error('Deve adicionar um pagamento.');
    }

    if (totalPaid < total) {
      throw new Error(
        'Em documentos Pronto Pagamento o valor pago deve maior ou igual ao valor total.',
      );
    }
  }

  if (data.paymentTerms === 'installment' && !data.customerId) {
    throw new Error('Em documentos com pagamento a prazo deve selecionar um cliente');
  }
}

export async function prepareData(input: InvoiceSchemaType, create = false) {
  const {
    id = randomUUID(),
    type,
    customerId,
    date,
    dueDate,
    paymentTerms,
    reference,
    observation,
    withholdingTax,
    generalDiscount,
    currency,
    exchange,
    items = [],
    payments = [],
    documents = [],
  } = invoiceSchema.parse(input);

  const number = input?.number ? input.number : await generateNumber(type);
  const { productsData, taxesData } = await getItems(items, create);
  const paymentsData = getPayments(payments);
  const { documentsData, invoicesData, totalInvoices } = await getDocuments(documents);

  const { type: withholdingTaxType, percentage: withholdingTaxPercentage } = withholdingTax || {};

  const { subtotal, total, totalIva, totalDiscount, totalWithholdingTax } = invoiceUpdateResume({
    items: productsData,
    customerId,
    withholdingTaxPercentage,
  });

  const totalPaid = paymentsData.reduce((total, item) => total + item.amount, 0);

  let balance = 0;
  if (paymentsData.length) {
    balance = totalPaid - total;
    if (type === 'RE') {
      balance = totalPaid - totalInvoices;
    }
  }

  return {
    id,
    number,
    type,
    customerId: customerId || END_CONSUMER.id,
    date,
    dueDate,
    paymentTerms,
    reference,
    observation,
    currency,
    exchange,
    withholdingTaxType,
    withholdingTaxPercentage,
    generalDiscount,
    subtotal,
    total,
    totalPaid,
    balance,
    totalIva,
    totalDiscount,
    totalWithholdingTax,
    productsData,
    paymentsData,
    invoicesData,
    documentsData,
    taxesData,
  };
}

export async function generateNumber(type: string) {
  let numberFound = true;
  let count = await prisma.invoice.count({
    where: { type },
  });
  let number = `${type} ${formatNumberWithLeadingZeros(count + 1)}`;

  while (numberFound) {
    let invoiceNumberFound = await prisma.invoice.findFirst({
      where: { number },
    });

    if (invoiceNumberFound) {
      count++;
      numberFound = true;
    }

    if (!invoiceNumberFound) {
      number = `${type} ${formatNumberWithLeadingZeros(count + 1)}`;
      numberFound = false;
    }
  }

  return number;
}

export async function getItems(items: InvoiceItemSchemaType[], create = false) {
  let productsData = [];
  let taxesData = [];
  let order = 0;
  for (const { id, productId, name, discount, iva, price, quantity, reasonExemption } of items) {
    const { discountAmount, ivaAmount, priceDiscount, priceIva, total } = invoiceUpdateItemTotal({
      discount,
      iva,
      price,
      quantity,
    });

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error(`Item (${name}) não encontrado.`);

    const newItem = {
      order: ++order,
      id: create ? randomUUID() : id ? id : randomUUID(),
      productId: product.id,
      productName: product.name,
      unitMeasure: product.unitMeasure,
      reasonExemption: product.reasonExemption,
      price,
      quantity,
      discount,
      discountAmount,
      iva,
      ivaAmount,
      total,
    };

    productsData.push(newItem);

    let tax = {
      id: randomUUID(),
      value: iva,
      amount: ivaAmount,
      incidence: priceIva * quantity,
      observation: reasonExemption ? reasonExemption : iva === 0 ? product.reasonExemption : '',
    };

    let taxFound = taxesData.find((p) => p.value === iva);

    if (taxFound) {
      for (let index = 0; index < taxesData.length; index++) {
        if (taxesData[index].value === iva) {
          taxesData[index].amount += tax.amount;
          taxesData[index].incidence += tax.incidence;
        }
      }
    }

    if (!taxFound) {
      taxesData.push(tax);
    }
  }

  return { productsData, taxesData };
}

export function getPayments(payments: InvoicePaymentSchemaType[]) {
  return payments.map((payment) => ({
    id: payment?.id || randomUUID(),
    date: payment.date,
    method: payment.method,
    amount: payment.amount,
    observation: payment?.observation,
  }));
}

export async function getDocuments(invoices: InvoiceDocumentSchemaType[]) {
  const documentsData =
    invoices.map(({ id, documentId, paid }) => ({
      id: id || randomUUID(),
      invoiceId: documentId,
      paid,
    })) || [];

  let totalInvoices = 0;
  const invoicesData = [];
  for (const inv of invoices) {
    const invoiceFound = await prisma.invoice.findFirst({
      where: { id: inv.documentId },
    });

    invoicesData.push({
      id: inv?.id || randomUUID(),
      documentId: inv.documentId,
      paid: inv?.paid,
    });

    totalInvoices += Number(invoiceFound?.total ?? 0);
  }

  return { documentsData, invoicesData, totalInvoices };
}

export function invoiceCreate(data: any) {
  return prisma.invoice.create({
    data: {
      id: data.id,
      number: data.number,
      type: data.type,
      customerId: data.customerId || END_CONSUMER.id,
      date: data.date,
      dueDate: data.dueDate,
      paymentTerms: data.paymentTerms,
      reference: data.reference,
      observation: data.reference,
      currency: data.currency,
      exchange: data.exchange,
      withholdingTaxType: data.withholdingTaxType,
      withholdingTaxPercentage: data.withholdingTaxPercentage,
      generalDiscount: data.generalDiscount,
      subtotal: data.subtotal,
      total: data.total,
      totalPaid: data.totalPaid,
      balance: data.balance,
      totalIva: data.totalIva,
      totalDiscount: data.totalDiscount,
      totalWithholdingTax: data.totalWithholdingTax,
      products: {
        createMany: {
          data: data.productsData,
          skipDuplicates: true,
        },
      },
      payments: {
        createMany: {
          data: data.paymentsData,
          skipDuplicates: true,
        },
      },
      invoices: {
        createMany: {
          data: data.invoicesData,
          skipDuplicates: true,
        },
      },
      documents: {
        createMany: {
          data: data.documentsData,
          skipDuplicates: true,
        },
      },
      taxes: {
        createMany: {
          data: data.taxesData,
          skipDuplicates: true,
        },
      },
    },
  });
}
