-- AlterTable
ALTER TABLE "banks" ALTER COLUMN "iban" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invoice_products" ADD COLUMN     "reason_exemption" TEXT;
