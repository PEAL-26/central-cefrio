/*
  Warnings:

  - You are about to drop the column `payment_condition` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "payment_condition",
ADD COLUMN     "payment_terms" TEXT,
ALTER COLUMN "currency" SET DEFAULT 'AOA';
