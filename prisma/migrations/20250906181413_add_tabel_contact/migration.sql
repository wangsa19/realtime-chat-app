/*
  Warnings:

  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "phoneNumber" TEXT;

-- CreateTable
CREATE TABLE "public"."Contact" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "addresseeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_requesterId_addresseeId_key" ON "public"."Contact"("requesterId", "addresseeId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "public"."User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
