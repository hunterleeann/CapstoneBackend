-- CreateTable
CREATE TABLE "_ClassToReview" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ClassToReview_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ClassToReview_B_index" ON "_ClassToReview"("B");

-- AddForeignKey
ALTER TABLE "_ClassToReview" ADD CONSTRAINT "_ClassToReview_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("classId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToReview" ADD CONSTRAINT "_ClassToReview_B_fkey" FOREIGN KEY ("B") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
