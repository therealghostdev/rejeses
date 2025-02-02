/*
  Warnings:

  - A unique constraint covering the columns `[orderRef]` on the table `PromoCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PromoCode" ADD COLUMN     "orderRef" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_orderRef_key" ON "PromoCode"("orderRef");

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_orderRef_fkey" FOREIGN KEY ("orderRef") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
