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

const getMonthIndex = (month: string) => {
  return MONTH.findIndex((m) => m === month);
};

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

  const transformData = (data: Record<string, number>) => {
    const rows = Object.entries(data).map(([x, y]) => ({ x, y }));
    const rowsLength = rows.length;
    let restMonth = [];

    if (rowsLength > 0 && rowsLength < 6) {
      const indexMonth = getMonthIndex(rows[0].x) - 1;
      let count = 6 - rowsLength;
      for (let i = indexMonth; i >= 0; i--) {
        if (count === 0) {
          break;
        }

        count--;
        restMonth.push({ x: MONTH[i], y: 0 });
      }
    }

    return [...restMonth.reverse(), ...rows];
  };

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

  return NextResponse.json(
    { customers, invoices, products, monthlyInvoices },
    { status: 200 }
  );
}
