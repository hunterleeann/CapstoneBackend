/*
  Warnings:

  - Added the required column `description` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
