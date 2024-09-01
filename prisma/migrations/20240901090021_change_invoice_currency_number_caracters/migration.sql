/*
  Warnings:

  - You are about to alter the column `currency` on the `invoices` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "currency" SET DATA TYPE VARCHAR(5);
