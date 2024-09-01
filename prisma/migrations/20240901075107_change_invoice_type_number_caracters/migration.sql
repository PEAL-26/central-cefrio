/*
  Warnings:

  - You are about to alter the column `type` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `VarChar(150)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "invoice_products" ADD COLUMN     "discountAmount" DECIMAL(65,30) DEFAULT 0.00,
ADD COLUMN     "ivaAmount" DECIMAL(65,30) DEFAULT 0.00;

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "type" SET DATA TYPE VARCHAR(5);
