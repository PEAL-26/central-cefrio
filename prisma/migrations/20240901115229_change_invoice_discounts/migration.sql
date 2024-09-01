/*
  Warnings:

  - You are about to drop the column `customer_discount` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `financial_discount` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "customer_discount",
DROP COLUMN "financial_discount",
ADD COLUMN     "general_discount" DECIMAL(65,30) DEFAULT 0.00;
