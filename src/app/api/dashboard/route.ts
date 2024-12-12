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
  const [customers, products, invoices, monthly] = await Promise.all([
    prisma.customer.count(),
    prisma.product.count(),
    prisma.invoice.count({ where: { type: "FT" } }),
    prisma.invoice.findMany({
      where: { AND: [{ type: "FT" }, { type: "FR" }, { type: "RE" }] },
      orderBy: [{ type: "asc" }],
      include: {
        payments: true,
      },
    }),
  ]);

  let lastMonth = "";
  let value = 0;
  let invoice = [];
  let payments = [];
  const monthlyInvoices = [];

  for (const doc of monthly) {
    const month = new Date(doc.date).getMonth();

    if (lastMonth === "") {
      lastMonth = MONTH[month];
    }

    if (lastMonth !== MONTH[month]) {
      if (doc.type === "FT") {
        invoice.push({ x: lastMonth, y: value });
      }

      if (doc.type === "FR" || doc.type === "RE") {
        payments.push({ x: lastMonth, y: value });
      }

      value = 0;
      lastMonth = MONTH[month];
    }

    if (doc.type === "FT") {
      value += doc.total ? Number(doc.total) : 0;
    }

    if (doc.type === "FR" || doc.type === "RE") {
      value += doc.payments.reduce(
        (total, item) => Number(total) + Number(item.amount),
        0
      );
    }
  }

  if (invoice.length) {
    monthlyInvoices.push({
      id: "Invoices",
      data: invoice,
    });
  }

  if (payments.length) {
    monthlyInvoices.push({
      id: "Payments",
      data: payments,
    });
  }
  return NextResponse.json(
    { customers, invoices, products, monthlyInvoices },
    { status: 200 }
  );
}
