import { prisma } from "../../../libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const [customers, products, invoices, monthly] = await Promise.all([
    prisma.customer.count(),
    prisma.product.count(),
    prisma.invoice.count({ where: { type: "FT" } }),
    prisma.invoice.count({ where: { type: "FT" } }),
  ]);

  //   type monthlyInvoices = {
  //     x: string; // Month
  //     y: number; // Price
  //   };

  const monthlyInvoices = [
    {
      id: "Invoices", // Tipo de documento
      data: [
        { x: "Jan", y: 43 },
        { x: "Feb", y: 137 },
        { x: "Mar", y: 61 },
        { x: "Apr", y: 145 },
        { x: "May", y: 26 },
        { x: "Jun", y: 154 },
      ],
    },
    {
      id: "Payments", // Tipo de documento
      data: [
        { x: "Jan", y: 43 },
        { x: "Feb", y: 4 },
        { x: "Mar", y: 56 },
        { x: "Apr", y: 999 },
        { x: "May", y: 3 },
        { x: "Jun", y: 9 },
      ],
    },
  ];

  return NextResponse.json(
    { customers, invoices, products, monthlyInvoices },
    { status: 200 }
  );
}
