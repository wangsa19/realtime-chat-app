-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_addresseeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contact" DROP CONSTRAINT "Contact_requesterId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contact" ADD CONSTRAINT "Contact_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
