/*
  Warnings:

  - You are about to drop the `_ClassToReview` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `classId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassToReview" DROP CONSTRAINT "_ClassToReview_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToReview" DROP CONSTRAINT "_ClassToReview_B_fkey";

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "classId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassToReview";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;
