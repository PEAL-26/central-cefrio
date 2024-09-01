/*
  Warnings:

  - You are about to drop the column `date` on the `invoice_products` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `invoice_products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice_payments" DROP CONSTRAINT "invoice_payments_invoice_id_fkey";

-- AlterTable
ALTER TABLE "invoice_products" DROP COLUMN "date",
DROP COLUMN "paid";

-- CreateTable
CREATE TABLE "invoice_documents" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "paid" DECIMAL(65,30) NOT NULL DEFAULT 0.00,

    CONSTRAINT "invoice_documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoice_documents_id_key" ON "invoice_documents"("id");

-- AddForeignKey
ALTER TABLE "invoice_payments" ADD CONSTRAINT "invoice_payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_documents" ADD CONSTRAINT "invoice_documents_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_documents" ADD CONSTRAINT "invoice_documents_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
