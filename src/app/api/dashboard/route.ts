import { prisma } from "../../../libs/prisma";
import { NextRequest, NextResponse } from "next/server";

const MONTH = [
  "JAN",
  "FEV",
  "MAR",
  "ABR",
  "MAI",
  "JUN",
  "JUL",
  "AGO",
  "SET",
  "OUT",
  "NOV",
  "DEZ",
];

export async function GET(req: NextRequest, res: NextResponse) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const [customers, products, invoices, monthly] = await Promise.all([
    prisma.customer.count(),
    prisma.product.count(),
    prisma.invoice.count({ where: { type: "FT" } }),
    prisma.invoice.findMany({
      where: {
        OR: [{ type: "FT" }, { type: "FR" }, { type: "RE" }],
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: [{ type: "asc" }],
      include: {
        payments: true,
      },
    }),
  ]);

  const monthlyInvoices = [];
  const invoice: Record<string, number> = {};
  const payment: Record<string, number> = {};

  monthly.forEach((doc) => {
    const month = MONTH[new Date(doc.date).getMonth()];

    if (doc.type === "FT") {
      invoice[month] =
        (invoice[month] || 0) + (doc.total ? Number(doc.total) : 0);
    }

    if (["FR", "RE"].includes(doc.type)) {
      const totalPayments = doc.payments.reduce(
        (total, item) => total + Number(item.amount),
        0
      );
      payment[month] = (payment[month] || 0) + totalPayments;
    }
  });

  const transformData = (data: Record<string, number>) =>
    Object.entries(data).map(([x, y]) => ({ x, y }));

  const invoiceData = transformData(invoice);
  const paymentData = transformData(payment);

  if (invoiceData.length) {
    monthlyInvoices.push({
      id: "Invoices",
      data: invoiceData,
    });
  }

  if (paymentData.length) {
    monthlyInvoices.push({
      id: "Payments",
      data: paymentData,
    });
  }

  console.log(JSON.stringify(monthlyInvoices));
  return NextResponse.json(
    { customers, invoices, products, monthlyInvoices },
    { status: 200 }
  );
}
