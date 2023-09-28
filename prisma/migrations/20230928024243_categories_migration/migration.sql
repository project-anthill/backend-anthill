/*
  Warnings:

  - You are about to drop the column `isApproved` on the `contribution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "contribution" DROP COLUMN "isApproved",
ALTER COLUMN "contributionType" SET DEFAULT 'idea';

-- CreateTable
CREATE TABLE "planCategory" (
    "id" UUID NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" UUID NOT NULL,

    CONSTRAINT "planCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planHasCategories" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "planHasCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "planHasCategories" ADD CONSTRAINT "planHasCategories_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planHasCategories" ADD CONSTRAINT "planHasCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "planCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
