/*
  Warnings:

  - You are about to drop the column `userId` on the `Class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_userId_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserClasses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserClasses_B_index" ON "_UserClasses"("B");

-- AddForeignKey
ALTER TABLE "_UserClasses" ADD CONSTRAINT "_UserClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserClasses" ADD CONSTRAINT "_UserClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
