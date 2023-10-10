/*
  Warnings:

  - You are about to alter the column `phone` on the `userProfile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `VarChar(11)`.

*/
-- AlterTable
ALTER TABLE "userProfile" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(11);

-- AlterTable
ALTER TABLE "userSocialMedias" ALTER COLUMN "idLattes" SET DATA TYPE VARCHAR(20);
