/*
  Warnings:

  - You are about to drop the `UserClass` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserClass" DROP CONSTRAINT "UserClass_classId_fkey";

-- DropForeignKey
ALTER TABLE "UserClass" DROP CONSTRAINT "UserClass_userId_fkey";

-- DropTable
DROP TABLE "UserClass";
