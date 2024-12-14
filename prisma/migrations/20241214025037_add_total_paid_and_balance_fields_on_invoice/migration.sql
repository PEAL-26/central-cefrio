-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "balance" DECIMAL(65,30) DEFAULT 0.00,
ADD COLUMN     "total_paid" DECIMAL(65,30) DEFAULT 0.00;
