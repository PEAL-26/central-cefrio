-- CreateEnum
CREATE TYPE "WithholdingTaxType" AS ENUM ('COMPANY', 'PARTICULAR');

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "withholdingTaxType" "WithholdingTaxType";
