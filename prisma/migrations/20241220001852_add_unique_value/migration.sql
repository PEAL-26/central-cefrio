/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "contacts_value_key" ON "contacts"("value");
