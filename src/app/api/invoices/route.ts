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
  InvoiceSchemaType,
} from "./types";
import { formatNumberWithLeadingZeros } from "@/helpers/string";
import {
  invoiceUpdateItemTotal,
  invoiceUpdateResume,
} from "@/helpers/invoice-total-update";
import { END_CONSUMER } from "@/constants/customer";

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
        totalPaid: true,
      },
      where: queryParams,
      orderBy: [{ createdAt: "desc" }],
      skip,
      take,
    }),
  ]);

  const response = paginationData({
    rows: invoices.map((inv) => ({
      ...inv,
      total: Number(inv?.total ?? 0) | Number(inv?.totalPaid ?? 0),
    })),
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
    return responseError(error);
  }
}

function invoiceCreate(data: any) {
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

async function create(input: any) {
  const data = await prepareData(input);
  verify(data);

  const document = invoiceCreate(data);

  let receipt = null;
  if (data.type === "FT" && data?.totalPaid > 0) {
    const receiptData = await prepareData({
      type: "RE",
      customerId: input.customerId,
      date: input.date,
      dueDate: input.date,
      reference: input.number,
      currency: input.currency,
      exchange: input.exchange,
      payments: input.payments,
      documents: [{ documentId: data.id, paid: data.totalPaid }],
    });
    receipt = invoiceCreate(receiptData);
  }

  const [documentResponse] = await prisma.$transaction(
    [document, receipt].filter((d) => d !== null)
  );

  return documentResponse;
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

function verify(data: any) {
  const totalPaid =
    data.paymentsData?.reduce(
      (total: number, item: any) => total + item.amount,
      0
    ) || 0;
  const total = data.total || 0;

  if (data.type !== "RE" && !data.productsData?.length) {
    if (totalPaid === 0) {
      throw new Error("Insira no mínimo um(1) item no documento");
    }
  }

  if (data.type === "RE" && !data.documentsData?.length) {
    if (totalPaid === 0) {
      throw new Error("Insira no mínimo um(1) item no documento");
    }
  }

  if (data.type === "RE" || data.type === "FR") {
    if (totalPaid === 0) {
      throw new Error("Deve adicionar um pagamento.");
    }
  }

  if (data.type === "FR") {
    if (totalPaid < total) {
      throw new Error(
        "Em documentos Pronto Pagamento o valor pago deve maior ou igual ao valor total."
      );
    }
  }

  if (data.type === "FT" && data.paymentTerms === "ready") {
    if (totalPaid === 0) {
      throw new Error("Deve adicionar um pagamento.");
    }

    if (totalPaid < total) {
      throw new Error(
        "Em documentos Pronto Pagamento o valor pago deve maior ou igual ao valor total."
      );
    }
  }

  if (data.paymentTerms === "installment" && !data.customerId) {
    throw new Error(
      "Em documentos com pagamento a prazo deve selecionar um cliente"
    );
  }
}

async function prepareData(input: InvoiceSchemaType) {
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
  const { productsData, taxesData } = await getItems(items);
  const paymentsData = getPayments(payments);
  const { documentsData, invoicesData, totalInvoices } = await getDocuments(
    documents
  );

  const { type: withholdingTaxType, percentage: withholdingTaxPercentage } =
    withholdingTax || {};

  const { subtotal, total, totalIva, totalDiscount, totalWithholdingTax } =
    invoiceUpdateResume({
      items: productsData,
      customerId,
      withholdingTaxPercentage,
    });

  const totalPaid = paymentsData.reduce(
    (total, item) => total + item.amount,
    0
  );

  let balance = 0;
  if (paymentsData.length) {
    balance = totalPaid - total;
    if (type === "RE") {
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
    date: payment.date,
    method: payment.method,
    amount: payment.amount,
    observation: payment?.observation,
  }));
}

async function getDocuments(invoices: InvoiceDocumentSchemaType[]) {
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
