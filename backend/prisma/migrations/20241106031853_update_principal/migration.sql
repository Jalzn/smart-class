/*
  Warnings:

  - A unique constraint covering the columns `[schoolid]` on the table `Principal` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Principal_schoolid_key" ON "Principal"("schoolid");
