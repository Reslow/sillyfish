/*
  Warnings:

  - You are about to drop the column `name` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `title` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" DROP COLUMN "name",
ADD COLUMN     "title" TEXT NOT NULL;
