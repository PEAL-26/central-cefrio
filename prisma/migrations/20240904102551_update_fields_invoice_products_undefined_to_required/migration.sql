/*
  Warnings:

  - Made the column `price` on table `invoice_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `invoice_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `total` on table `invoice_products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoice_products" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "quantity" SET NOT NULL,
ALTER COLUMN "total" SET NOT NULL;
