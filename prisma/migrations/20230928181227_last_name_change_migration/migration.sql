/*
  Warnings:

  - You are about to drop the column `lastname` on the `userProfile` table. All the data in the column will be lost.
  - Added the required column `lastName` to the `userProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userProfile" DROP COLUMN "lastname",
ADD COLUMN     "lastName" VARCHAR(60) NOT NULL;
