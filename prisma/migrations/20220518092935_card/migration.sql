/*
  Warnings:

  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "title",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;
