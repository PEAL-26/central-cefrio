/*
  Warnings:

  - You are about to drop the column `mains` on the `contacts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "mains",
ADD COLUMN     "main" BOOLEAN NOT NULL DEFAULT false;
