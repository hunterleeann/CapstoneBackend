/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[classId]` on the table `Class` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_reviewId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "reviewId";

-- CreateIndex
CREATE UNIQUE INDEX "Class_classId_key" ON "Class"("classId");
