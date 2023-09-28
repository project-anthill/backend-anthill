-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'nonBinary', 'other', 'prefererNotToSay');

-- CreateEnum
CREATE TYPE "GraduationLevel" AS ENUM ('highSchool', 'technicalCourse', 'technologist', 'license', 'bachelor', 'postGraduation', 'master', 'doctorate', 'certification');

-- CreateEnum
CREATE TYPE "planStage" AS ENUM ('concept', 'prototype', 'tutorial');

-- CreateEnum
CREATE TYPE "contributionType" AS ENUM ('idea', 'question', 'experience');

-- CreateEnum
CREATE TYPE "offenseLevel" AS ENUM ('light', 'moderate', 'severe');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedAt" TIMESTAMP(3),
    "deactivatedById" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "firstName" VARCHAR(60) NOT NULL,
    "lastname" VARCHAR(60) NOT NULL,
    "birthDate" DATE,
    "phone" BIGINT,
    "gender" "Gender" NOT NULL,
    "password" VARCHAR(120) NOT NULL,

    CONSTRAINT "userProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userSocialMedias" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "userLinkedin" VARCHAR(100),
    "userGithub" VARCHAR(100),
    "idLattes" BIGINT,

    CONSTRAINT "userSocialMedias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLog" (
    "id" UUID NOT NULL,
    "madeBy" UUID NOT NULL,
    "activity" VARCHAR(300) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userConnections" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "userConnectedId" UUID,
    "isConnected" BOOLEAN NOT NULL DEFAULT true,
    "connectionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userConnections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institution" (
    "id" UUID NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastModifiedBy" UUID,
    "imageUrl" TEXT,

    CONSTRAINT "institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userEducation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "graduation" VARCHAR(120) NOT NULL,
    "graduationLevel" "GraduationLevel" NOT NULL,
    "initialDate" DATE NOT NULL,
    "finalDate" DATE NOT NULL,

    CONSTRAINT "userEducation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userAddress" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,

    CONSTRAINT "userAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutionAddress" (
    "id" UUID NOT NULL,
    "institutionId" UUID NOT NULL,
    "country" VARCHAR(50) NOT NULL,
    "state" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,

    CONSTRAINT "institutionAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "resume" VARCHAR(300),
    "description" VARCHAR(10000),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isClosed" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "planStage" "planStage" NOT NULL DEFAULT 'concept',
    "bannerImageUrl" TEXT,
    "iconImageUrl" TEXT,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planReports" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "motive" VARCHAR(200) NOT NULL,
    "detailedMotive" VARCHAR(1000),
    "reportedAt" TIMESTAMP(3) NOT NULL,
    "revised" BOOLEAN NOT NULL DEFAULT false,
    "revisedBy" UUID,
    "revisedAt" TIMESTAMP(3),
    "offenseLevel" "offenseLevel" NOT NULL,

    CONSTRAINT "planReports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planLog" (
    "id" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "activity" VARCHAR(300) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "madeBy" UUID NOT NULL,

    CONSTRAINT "planLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userFollowPlan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFollowing" BOOLEAN NOT NULL DEFAULT true,
    "unfollowedAt" TIMESTAMP(3),

    CONSTRAINT "userFollowPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLikesPlan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL DEFAULT true,
    "dislikedAt" TIMESTAMP(3),

    CONSTRAINT "userLikesPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCommentsPlan" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedAt" TIMESTAMP(3),
    "deactivatedBy" UUID,

    CONSTRAINT "userCommentsPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLikesComment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "commentId" UUID NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL DEFAULT true,
    "dislikedAt" TIMESTAMP(3),

    CONSTRAINT "userLikesComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contribution" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "title" VARCHAR(120) NOT NULL,
    "description" VARCHAR(10000) NOT NULL,
    "contributionType" "contributionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedBy" UUID,
    "deactivatedAt" TIMESTAMP(3),

    CONSTRAINT "contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userCommentsContribution" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "contributionId" UUID NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deactivatedBy" UUID,
    "deactivatedAt" TIMESTAMP(3),

    CONSTRAINT "userCommentsContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userLikesContribution" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "contributionId" UUID NOT NULL,
    "likedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isLiked" BOOLEAN NOT NULL DEFAULT true,
    "dislikedAt" TIMESTAMP(3),

    CONSTRAINT "userLikesContribution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_userId_key" ON "userProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_username_key" ON "userProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "userProfile_email_key" ON "userProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "userSocialMedias_userId_key" ON "userSocialMedias"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "userAddress_userId_key" ON "userAddress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "institutionAddress_institutionId_key" ON "institutionAddress"("institutionId");

-- CreateIndex
CREATE UNIQUE INDEX "userFollowPlan_userId_planId_key" ON "userFollowPlan"("userId", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "userLikesPlan_userId_planId_key" ON "userLikesPlan"("userId", "planId");

-- CreateIndex
CREATE UNIQUE INDEX "userLikesComment_userId_commentId_key" ON "userLikesComment"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "userLikesContribution_userId_contributionId_key" ON "userLikesContribution"("userId", "contributionId");

-- AddForeignKey
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userSocialMedias" ADD CONSTRAINT "userSocialMedias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLog" ADD CONSTRAINT "userLog_madeBy_fkey" FOREIGN KEY ("madeBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userConnections" ADD CONSTRAINT "userConnections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userEducation" ADD CONSTRAINT "userEducation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userEducation" ADD CONSTRAINT "userEducation_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAddress" ADD CONSTRAINT "userAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institutionAddress" ADD CONSTRAINT "institutionAddress_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planReports" ADD CONSTRAINT "planReports_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planLog" ADD CONSTRAINT "planLog_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFollowPlan" ADD CONSTRAINT "userFollowPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFollowPlan" ADD CONSTRAINT "userFollowPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLikesPlan" ADD CONSTRAINT "userLikesPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLikesPlan" ADD CONSTRAINT "userLikesPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCommentsPlan" ADD CONSTRAINT "userCommentsPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCommentsPlan" ADD CONSTRAINT "userCommentsPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLikesComment" ADD CONSTRAINT "userLikesComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contribution" ADD CONSTRAINT "contribution_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCommentsContribution" ADD CONSTRAINT "userCommentsContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userCommentsContribution" ADD CONSTRAINT "userCommentsContribution_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLikesContribution" ADD CONSTRAINT "userLikesContribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userLikesContribution" ADD CONSTRAINT "userLikesContribution_contributionId_fkey" FOREIGN KEY ("contributionId") REFERENCES "contribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
