/*
  Warnings:

  - Added the required column `hour` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "hour" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "date" SET DATA TYPE TEXT;
