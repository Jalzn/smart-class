-- CreateTable
CREATE TABLE "Principal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "schoolid" TEXT,
    "schoolId" INTEGER,

    CONSTRAINT "Principal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Principal_email_key" ON "Principal"("email");

-- AddForeignKey
ALTER TABLE "Principal" ADD CONSTRAINT "Principal_schoolid_fkey" FOREIGN KEY ("schoolid") REFERENCES "School"("id") ON DELETE SET NULL ON UPDATE CASCADE;
