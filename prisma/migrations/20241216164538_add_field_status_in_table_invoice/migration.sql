-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('N', 'A');

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "status" "InvoiceStatus" DEFAULT 'N';
