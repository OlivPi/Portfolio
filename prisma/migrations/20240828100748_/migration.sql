/*
  Warnings:

  - You are about to drop the column `name` on the `Interest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Interest_name_key";

-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_type_key" ON "Interest"("type");
