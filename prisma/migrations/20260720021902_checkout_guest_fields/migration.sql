/*
  Warnings:

  - A unique constraint covering the columns `[clerkUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CheckoutSession" ADD COLUMN     "itemsSnapshot" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerPhone" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
