/*
  Warnings:

  - You are about to drop the column `reason_exemption` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `tax_amount` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "reason_exemption",
DROP COLUMN "tax_amount";

-- CreateTable
CREATE TABLE "invoice_taxes" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "incidence" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "observation" TEXT,

    CONSTRAINT "invoice_taxes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_taxes_id_key" ON "invoice_taxes"("id");

-- AddForeignKey
ALTER TABLE "invoice_taxes" ADD CONSTRAINT "invoice_taxes_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
