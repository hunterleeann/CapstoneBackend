-- CreateTable
CREATE TABLE "UserClass" (
    "userId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "UserClass_pkey" PRIMARY KEY ("userId","classId")
);

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClass" ADD CONSTRAINT "UserClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;
