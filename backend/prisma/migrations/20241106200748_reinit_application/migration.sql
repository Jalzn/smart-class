/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_classroomId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacherId_fkey";

-- DropTable
DROP TABLE "Subject";

-- CreateTable
CREATE TABLE "TeacherSubject" (
    "id" SERIAL NOT NULL,
    "teacherId" TEXT NOT NULL,
    "subjectCode" TEXT NOT NULL,

    CONSTRAINT "TeacherSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassroomQuadroTeacherMateria" (
    "id" SERIAL NOT NULL,
    "classroomId" TEXT NOT NULL,
    "teacherId" TEXT,
    "subjectCode" TEXT NOT NULL,

    CONSTRAINT "ClassroomQuadroTeacherMateria_pkey" PRIMARY KEY ("id")
);
