/*
  Warnings:

  - You are about to drop the column `email` on the `Principal` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Principal` table. All the data in the column will be lost.
  - You are about to drop the column `schoolId` on the `Principal` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `Principal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Principal` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Principal_email_key";

-- AlterTable
ALTER TABLE "Principal" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "schoolId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
