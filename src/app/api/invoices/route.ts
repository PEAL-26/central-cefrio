import { z } from "zod";
import { randomUUID } from "crypto";
import { prisma } from "../../../libs/prisma";
import { Prisma } from "@prisma/client";
import { getAllParams } from "../../../helpers/search-params";
import { NextRequest, NextResponse } from "next/server";
import { responseError } from "../../../helpers/response/route-response";
import { paginationData, setPagination } from "../../../helpers/pagination";
import { numericString } from "@/helpers/zod";
import {
  InvoiceDocumentSchemaType,
  InvoiceItemSchemaType,
  InvoicePaymentSchemaType,
  invoiceSchema,
} from "./types";
import { formatNumberWithLeadingZeros } from "@/helpers/string";
import {
  invoiceUpdateItemTotal,
  invoiceUpdateResume,
} from "@/helpers/invoice-total-update";
import { END_CONSUMER } from "@/constants/cutomer";

const listParamsSchema = z.object({
  type: z.string().optional(),
  q: z.string().optional(),
  page: z.coerce.number().optional(),
  size: z.coerce.number().optional(),
});

export async function GET(req: NextRequest, res: NextResponse) {
  const {
    type,
    q = "",
    page,
    size,
  } = listParamsSchema.parse(getAllParams(req.url));
  const { limit: take, offset: skip } = setPagination({ size, page });

  const queryParams: Prisma.InvoiceWhereInput = {
    OR: [
      {
        number: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        customer: {
          name: {
            contains: q,
            mode: "insensitive",
          },
        },
      },
      {
        products: {
          some: {
            productName: {
              contains: q,
              mode: "insensitive",
            },
          },
        },
      },
    ],
    type,
  };

  const [total, invoices] = await Promise.all([
    prisma.invoice.count({
      where: queryParams,
    }),
    prisma.invoice.findMany({
      select: {
        id: true,
        number: true,
        type: true,
        date: true,
        customer: {
          select: {
            id: true,
            name: true,
          },
        },
        total: true,
      },
      where: queryParams,
      orderBy: [{ createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: invoices,
    total,
    limit: take,
    page,
  });

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const input = await request.json();
    let invoice = await prisma.invoice.findFirst({
      where: { id: input?.id || "" },
    });

    if (invoice) {
      invoice = await update({ ...input, number: invoice.number });
    }

    if (!invoice) {
      invoice = await create(input);
    }

    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return responseError(error);
  }
}

async function create(input: any) {
  const data = await prepareData(input);

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

async function update(input: any) {
  const data = await prepareData(input);
  return prisma.invoice.update({
    data: {
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
      totalIva: data.totalIva,
      totalDiscount: data.totalDiscount,
      totalWithholdingTax: data.totalWithholdingTax,
      products: {
        createMany: {
          data: data.productsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.productsData.map(({ id }) => id),
            },
          },
        },
      },
      payments: {
        createMany: {
          data: data.paymentsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.paymentsData.map(({ id }) => id),
            },
          },
        },
      },
      invoices: {
        createMany: {
          data: data.invoicesData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.invoicesData.map(({ id }) => id),
            },
          },
        },
      },
      documents: {
        createMany: {
          data: data.documentsData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.documentsData.map(({ id }) => id),
            },
          },
        },
      },
      taxes: {
        createMany: {
          data: data.taxesData,
          skipDuplicates: true,
        },
        deleteMany: {
          NOT: {
            id: {
              in: data.taxesData.map(({ id }) => id),
            },
          },
        },
      },
    },
    where: { id: data.id },
  });
}

async function prepareData(input: any) {
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
    items,
    payments,
    documents,
  } = invoiceSchema.parse(input);
  const number = input?.number ? input.number : await generateNumber(type);

  const { productsData, taxesData } = await getItems(items ?? []);
  const paymentsData = getPayments(payments ?? []);
  const { documentsData, invoicesData } = getDocuments(id, documents ?? []);

  const { type: withholdingTaxType, percentage: withholdingTaxPercentage } =
    withholdingTax || {};

  const { subtotal, total, totalIva, totalDiscount, totalWithholdingTax } =
    invoiceUpdateResume({
      items: productsData,
      customerId,
      withholdingTaxPercentage,
    });

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

async function generateNumber(type: string) {
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

async function getItems(items: InvoiceItemSchemaType[]) {
  let productsData = [];
  let taxesData = [];
  let order = 0;
  for (const {
    id,
    productId,
    name,
    discount,
    iva,
    price,
    quantity,
    reasonExemption,
  } of items) {
    const { discountAmount, ivaAmount, priceDiscount, priceIva, total } =
      invoiceUpdateItemTotal({ discount, iva, price, quantity });

    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error(`Item (${name}) não encontrado.`);

    const newItem = {
      order: ++order,
      id: id ? id : randomUUID(),
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
      observation: reasonExemption
        ? reasonExemption
        : iva === 0
        ? product.reasonExemption
        : "",
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

function getPayments(payments: InvoicePaymentSchemaType[]) {
  return payments.map((payment) => ({
    id: payment?.id || randomUUID(),
    method: payment.method,
    amount: payment.amount,
  }));
}

function getDocuments(
  mainInvoiceId: string,
  invoices: InvoiceDocumentSchemaType[]
) {
  const documentsData = invoices.map(({ id, paid }) => ({
    id: id || randomUUID(),
    invoiceId: mainInvoiceId,
    paid,
  }));

  const invoicesData = invoices.map(({ id, documentId, paid }) => ({
    id: id || randomUUID(),
    documentId,
    paid,
  }));

  return { documentsData, invoicesData };
}
