/*
  Warnings:

  - Made the column `type` on table `Experience` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "type" SET NOT NULL;
