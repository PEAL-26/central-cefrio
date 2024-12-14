/*
  Warnings:

  - Added the required column `date` to the `invoice_payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoice_payments" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
