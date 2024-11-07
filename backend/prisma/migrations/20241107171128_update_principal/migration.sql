/*
  Warnings:

  - The primary key for the `Principal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Principal" DROP CONSTRAINT "Principal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Principal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Principal_id_seq";
