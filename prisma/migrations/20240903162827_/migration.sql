/*
  Warnings:

  - A unique constraint covering the columns `[company]` on the table `Experience` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Experience_company_key" ON "Experience"("company");
