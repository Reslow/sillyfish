/*
  Warnings:

  - You are about to drop the column `userId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `deckId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropIndex
DROP INDEX "Card_userId_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "userId",
ADD COLUMN     "deckId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
